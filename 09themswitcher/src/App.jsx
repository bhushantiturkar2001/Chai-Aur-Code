import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "./context/Thems";
import { useEffect } from "react";
import ThemeBtn from "./components/ThemeButton";
import Card from "./components/Card";

function App() {
  
  const [themMode, setThemeMode] = useState("light")

  const lightTheme = () =>{
    setThemeMode("light")
  }

   const darkTheme = () =>{
    setThemeMode("dark")
  }

  // acutual chnage in theme
  useEffect(()=>{
    document.querySelector('html').classList.remove("light","dark")
    document.querySelector('html').classList.add(themMode)
  },[themMode])

  return (
    <ThemeProvider value={{themMode, darkTheme,lightTheme}}>
      <h1 className="p-4 bg-pink-500 text-3xl text-center font-bold">
        Thems Switcher
      </h1>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn/>
          </div>

          <div className="w-full max-w-sm mx-auto">
             <Card/>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
