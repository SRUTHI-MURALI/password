import { useState } from 'react';
import {ImArrowDown} from 'react-icons/im'
import { upperCaseLetters,lowerCaseLetters,special,numbers } from './values';
import './App.css';
import Modal from './Modal'

function App() {
  const [password,setPassword]=useState("")
  const [counter,setCounter]=useState(6)
  const [isUpperCase,setIsUpperCase]=useState(false)
  const [isLowerCase,setIsLowerCase]=useState(false)
  const [isSymbol,setIsSymbol]=useState(false)
  const [isNumber,setIsNumber]=useState(false)
  const [prevPasswords,setPrevPasswords]=useState([])
  const [modal,setModal]=useState({
    title:"",
    show:false,
    message:""
  })
  const generatePassword=(e)=>{
    e.preventDefault();
    let currentpassword=""
    for(let i=0;i<counter;i++){
      currentpassword += getData()
    }

    setPassword(currentpassword)
    setPrevPasswords((previous) => [currentpassword, ...previous.slice(0, 4)]);
  }

  const getData=()=>{
    const chars=[]
    if(isUpperCase){
      chars.push(
        upperCaseLetters[Math.floor(Math.random()*upperCaseLetters.length)]
      )
    }
    if(isLowerCase){
      chars.push(
        lowerCaseLetters[Math.floor(Math.random()*lowerCaseLetters.length)]
      )
    }
    if(isSymbol){
      chars.push(
        special[Math.floor(Math.random()*special.length)]
      )
    }
    if(isNumber){
      chars.push(
        numbers[Math.floor(Math.random()*numbers.length)]
      )
    }
    if(chars.length===0){
      return 
    }
    return chars[Math.floor(Math.random()*chars.length)]
    
  }

  const createCopy = (password) => {
    const textAreaEl = document.createElement("textarea");
    textAreaEl.value = password; 
    document.body.appendChild(textAreaEl);
    textAreaEl.select();
    document.execCommand("copy");
    textAreaEl.remove();
  }

  const copyPasswordHandler = (e) =>{
    e.preventDefault();
    if (password.trim().length === 0) {
      setModal({
        title: "Error",
        message: "There is nothing to copy",
        show: true,
      });
    } else {
      setModal({
        title: "Success",
        message: "Password successfully copied to clipboard",
        show: true,
      });
    }
    createCopy()
  }

  const closeModalHandler=()=>{
    setModal({...modal, show:false})
  }
  return (
    <div className="App">
      
      {modal.show && <Modal onClose={closeModalHandler} title={modal.title} message={modal.message}/>}
      <div className='generator'>
        <h2 className='generator_title'>Password Generator</h2>
        {password && <h1 className='generator_title'><ImArrowDown/></h1>}
        <h4 className="password">{password}</h4>
        <form className='generator_form'>
          <div className='generator_formcontrols'>
            <div className='generator_formcontrol'>
              <label htmlFor='uppercase'>Upper Case</label>
              <input 
              value={isUpperCase} 
              onChange={(e)=> setIsUpperCase(e.target.value)}
               type='checkbox' 
               id='uppercase'
                name='uppercase'/>
            </div>
            <div className='generator_formcontrol'>
              <label htmlFor='lowercase'>Lower Case</label>
              <input
               value={isLowerCase} 
               onChange={(e)=> setIsLowerCase(e.target.value)}
               type='checkbox'
                id='lowercase'
               name='lowercase'/>
            </div>
            <div className='generator_formcontrol'>
              <label htmlFor='symbols'>Symbols</label>
              <input 
               value={isSymbol} 
               onChange={(e)=> setIsSymbol(e.target.value)}
              type='checkbox'
               id='symbols' 
               name='symbols'/>
            </div>
            <div className='generator_formcontrol'>
              <label htmlFor='numbers'> Numbers</label>
              <input 
               value={isNumber} 
               onChange={(e)=> setIsNumber(e.target.value)}
                type='checkbox' 
                id='numbers'
               name='numbers'/>
            </div>
            <div className='generator_length'>
              <h4 className='generator_length_title'>Password Length :<span>{counter}</span></h4>
              <div className='generator_length_count'>
                <input  type="range"
                  min="6"
                  max="20"
                  value={counter}
                  onChange={(e)=> setCounter(e.target.value)} />
              </div>
            </div>

            <div className="generator_form_action">
              <button onClick={generatePassword} className='btn generate-btn'>Generate Password</button>
              <button onClick={copyPasswordHandler} className='btn copy-btn'>Copy Password</button>
            </div>
            
          </div>
          
        </form>
      </div>
      <div>
      {prevPasswords.length>1 && 
      <ul className='passwordList'>
        <h2>Previous passwords</h2>
        
        {prevPasswords.map((password,index) => (
            <h3 >{index+1} . {password}</h3>
          ))}
      
      </ul>
      }
      </div>
    </div>
  )
  
}

export default App;
