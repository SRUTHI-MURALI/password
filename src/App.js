import { useState } from 'react';
import { upperCaseLetters,lowerCaseLetters,special,numbers } from './values';
import './App.css';

function App() {
  const [password,setPassword]=useState("")
  const [counter,setCounter]=useState(6)
  const [isUpperCase,setIsUpperCase]=useState(false)
  const [isLowerCase,setIsLowerCase]=useState(false)
  const [isSymbol,setIsSymbol]=useState(false)
  const [isNumber,setIsNumber]=useState(false)

  const increaseCount=(e)=>{
    e.preventDefault();
    if(counter<15){
      setCounter((prevValue)=> prevValue + 1)
    }
  }

  const decreaseCount=(e)=>{
    e.preventDefault();
    if(counter>6){
      setCounter((prevValue)=> prevValue - 1)
    }
  }
  const generatePassword=(e)=>{
    e.preventDefault();
    let currentpassword=""
    for(let i=0;i<counter;i++){
      currentpassword += getData()
    }

    setPassword(currentpassword)
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
  return (
    <div className="App">
      <div className='generator'>
        <h2 className='generator_title'>Password Generator</h2>
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
              <h4 className='generator_length_title'>Password Length</h4>
              <div className='generator_length_count'>
                <button onClick={decreaseCount}>-</button>
                <span>{counter}</span>
                <button onClick={increaseCount}>+</button>
              </div>
            </div>

            <div className="generator_form_action">
              <button onClick={generatePassword} className='btn generate-btn'>Generate Password</button>
              <button className='btn copy-btn'>Copy Password</button>
            </div>
          </div>
        </form>
      </div>
      
    </div>
  )
  
}

export default App;
