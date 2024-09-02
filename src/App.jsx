import { useCallback, useEffect, useState ,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// useRef is used to store the reference of the element.
function App() {
  const [length, setLength] = useState(8);
  const[numAllowed , setNumAllowed] = useState(false);
  const[specialAllowed , setSpecialAllowed] = useState(false);
  const [password, setPassword] = useState('');


  //useCallback is a react hook that will prevent the function from being recreated on every render
  // it lets you cache definition b/w rerenders.

  const passwordRef = useRef(null);
  const passwordGenerator =useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed){
      str += "0123456789";
    }
    if(specialAllowed){       str += "!@#$%^&*()_+";
    }
    
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  

  }, [length, numAllowed, specialAllowed,setPassword]);

  const copyPasstoClipboard = useCallback(() => {
    passwordRef.current?.select();
    //to select specific range ; passwordRef.current?.setSelectionRange(0, 4);
        window.navigator.clipboard.writeText(passwordRef.current.value);
  },[password])
// the useCallbback cannt be compare witth use effect as in useeffect 
// the second argument is the dependency array but in usecallback the second argument
//  is the function that is being cached i.e when there is changes in the values in the arugument it 
// will be optimised and values wwill be cached and the function will not be recreated again and again.
  // passwordGenerator();
useEffect(
  () => 
  { passwordGenerator(); }, [passwordGenerator,length,numAllowed,specialAllowed]

);



  return (
    <>
    <div className='flex justify-center'>
    <div className='text-white bg-slate-900 mt-8 w-10/12 rounded-lg  '>
    <div className='flex justify-center mt-5 pt-5'> 
    <h1 className='center text-2xl bold '>Password Generator</h1>
    </div>
      <div className='text-white flex justify-center pt-0 mt-10'>
        <input 
        type="text"
        value={password}
        readOnly
        className="text-black bg-white  p-2 my-4 text-center m-5 mr-4 overflow-x-hidden overflow-hidden rounded-lg w-10/12 mt-7 center"
      ref={passwordRef}

        
        />
    <button className='outline-none bg-blue-600 max-w-max rounded-lg self-center p-4'
    onClick={copyPasstoClipboard}
    >Copy</button>

      </div>
      <div className='flex text-sm gap-x-2 p-5 center items-center justify-center'>
        <div className='flex items-center gap-x-1 p-5'>
          {/* <label htmlFor=""></label> */}
          <input type="range"
          min={8}
          max={100}
          value={length}
          className='w-40 cursor-pointer'
         onChange={(e) => setLength(e.target.value)}
          />
          <label className='text-white' >Length : {length}</label>
        </div>
        <div className='p-5'>
          <input type="checkbox" id="num" onChange={(e) => setNumAllowed((prev)=>!prev)} />
          <label htmlFor="num"> Include Numbers</label>
        </div>
        <div className='p-5' >
          <input type="checkbox" id="special" onChange={(e) => setSpecialAllowed(e.target.checked)} />
          <label htmlFor="special"> Include Special Characters</label>
        </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default App;
