import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [buttonBg, setButtonBg] = useState("rgb(37 99 235)");

  const passwordRef = useRef(null)

  const copyPass = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setButtonBg("rgb(30 64 175)")
  }

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklemnopqrstuvwxyz";
    let pass = "";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let random = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(random);
    }
    setPassword(pass);
  }, [length, charAllowed, numAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numAllowed, passwordGenerator]);

  return (
    <>
      <div className="">
        <h1 className="text-blue-400 font-bold mb-5">Password Generator</h1>
        <div className="input-button flex justify-center gap-5 mb-5">
          <input
            type="text"
            className="px-5 py-2"
            placeholder="Password"
            readOnly
            value={password}
            ref={passwordRef}
          />
          <button style={{backgroundColor : buttonBg}} onClick={copyPass}>Copy</button>
        </div>
        <div className="password-params flex justify-center gap-5">
          <section className="flex justify-center gap-3">
            <input
              type="range"
              max={20}
              value={length}
              min={8}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              // e is the event. "e.target.value" is using to get value of the input field whenever it changes.
            />
            <label htmlFor="password-params">
              Length :{" "}
              <span className="text-blue-400 font-bold rounded-full">
                {length}
              </span>
            </label>
          </section>
          <section className="flex justify-center gap-3">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="password-params">Character</label>
          </section>
          <section className="flex justify-center gap-3">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
              /*
              (prev) => {!prev} is wrong. Test it and it will not work. Want to know why? Even I don't know :'(
              */
            />
            <label htmlFor="password-params">Number</label>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
