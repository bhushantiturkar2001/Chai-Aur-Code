/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  // PASSWORD SETTINGS STATE
  const [length, setLength] = useState(8); // stores password length
  const [numberAllowed, setNumberAllowes] = useState(false); // allow numbers?
  const [charAllowed, setCharAllowes] = useState(false); // allow symbols?
  const [password, setPassword] = useState(""); // final generated password

  // REF TO ACCESS THE PASSWORD INPUT (for copy/select)
  const passwordRef = useRef(null);

  // FUNCTION TO GENERATE PASSWORD (memoized using useCallback)
  const passwordGenerator = useCallback(() => {
    let pass = ""; // final password string
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // base string → only letters

    if (numberAllowed) str += "0123456789"; // add digits if checked
    if (charAllowed) str += "!@#$%^&*()"; // add symbols if checked

    // loop 'length' times to build password
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); // random index
      pass += str.charAt(char); // add character to password
    }

    setPassword(pass); // update password in state
  }, [length, numberAllowed, charAllowed, setPassword]);

  // COPY PASSWORD TO CLIPBOARD FUNCTION
  const copyPasswordToClipBoard = useCallback(() => {
    // Select the input text (highlights it)
    passwordRef.current?.select();

    // Restrict selection to first 10 characters (optional demonstration)
    passwordRef.current?.setSelectionRange(0, 10);

    // Copy to clipboard
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // RUN PASSWORD GENERATOR EVERY TIME SETTINGS CHANGE
  useEffect(() => {
    passwordGenerator(); // auto-generate password
  }, [length, numberAllowed, charAllowed, setPassword]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-10 bg-gray-700 text-orange-400">
        <h1 className="text-white text-center font-bold my-3">
          Password Generator
        </h1>

        {/* PASSWORD DISPLAY + COPY BUTTON */}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password} // show generated password
            className="outline-none w-full py-1 px-3 font-bold"
            placeholder="Password"
            readOnly // user cannot edit password
            ref={passwordRef} // ref gives direct DOM access
          />

          <button
            className="outline-none bg-purple-300 text-pretty font-bold px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipBoard} // copy to clipboard event
          >
            Copy
          </button>
        </div>

        {/* PASSWORD OPTIONS */}
        <div className="flex gap-x-2 text-sm-2">
          {/* PASSWORD LENGTH SLIDER */}
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={10}
              value={length} // shows slider value
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value); // update length
              }}
            />
            <label className="font-bold">Length: {length}</label>
          </div>

          {/* NUMBERS CHECKBOX */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowes((prev) => !prev); // toggle boolean
              }}
            />
            <label className="font-bold">Numbers</label>
          </div>

          {/* SPECIAL CHARACTERS CHECKBOX */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowes((prev) => !prev); // toggle boolean
              }}
            />
            <label className="font-bold">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
