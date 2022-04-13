import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import AboutPage from './components/AboutPage';
import BlogPage from './components/BlogPage';
import WorkPage from './components/WorkPage';
import MySkillsPage from './components/MySkillsPage';
import GlobalStyle from './globalStyles';
import { lightTheme } from './components/Theme';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={lightTheme}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/skills" element={<MySkillsPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
