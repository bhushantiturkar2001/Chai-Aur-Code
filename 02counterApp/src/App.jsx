import { useState } from 'react';
import './App.css'


function App() {



  //let counter = 0 ;

  let [counter, chaiCounter] = useState(0);
  const [message, setMessage] = useState("");

  const addValue = ()=> {
    if(counter >= 10){
      console.log("Chai not more than 10")
      setMessage("Chai not more than 10")
      return;
    }
    chaiCounter(counter + 1)
    setMessage("") // clear message
  } 

  const removeValue = () => {
    if(counter <= 0){
      console.log("Chai never becomes zero")
      setMessage("Chai never becomes zero");
      return;
    }
    chaiCounter(counter - 1)
    setMessage("")
  }

  return (
    <>
     <h1>Chai aur react</h1>
     <h2>New chai order: {counter}</h2>

     {message && <p style={{ color: "red" }}>{message}</p>}

     <button onClick={addValue} >Add value</button> <br/>
     <button onClick={removeValue}>Remove value</button>
    </>
  )
}

export default App
