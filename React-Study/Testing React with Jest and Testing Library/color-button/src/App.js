import { useEffect, useRef, useState } from "react";

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');  // 대문자를 찾으면 앞에 공백을 붙인다
}

function App() {
  const [ buttonColor, setButtoColor ] = useState('MediumVioletRed');
  const newButtonColor = buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';
  
  const [ disabled, setDisabled ] = useState(false);

  const handleClick = () => {
    setButtoColor(newButtonColor);
  }


  return (
    <div>
      <button 
        style={{backgroundColor: disabled ? 'gray' : buttonColor}} 
        onClick={handleClick}
        disabled={disabled} 
      >Change to {replaceCamelWithSpaces(newButtonColor)}</button>
      <input 
        type="checkbox" 
        id="enabled-button-checkbox"
        defaultChecked={disabled}
        aria-checked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}/>
        <label htmlFor="enabled-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
