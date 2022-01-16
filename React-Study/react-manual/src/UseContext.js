import React, { useContext } from 'react';

const themes = {
  light: {
    foregreound: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foregreound: "#ffffff",
    background: "#222222"
  },
}

const ThemeContext = React.createContext(themes.light);

function ContextHookEx() {
  return (
    <ThemeContext.Provider value={themes.dark} >
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar () {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{background: theme.background, color: theme.foregreound }}>
      useContext를 이용한 버튼!
    </button>
  )
}