import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import AppAppBar from './components/AppAppBar';
import getLPTheme from './getLPTheme';

function App() {
  const storedMode = localStorage.getItem('mode');
  const initialMode = storedMode ? JSON.parse(storedMode) : 'light';
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(mode));
  }, [mode]);

  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <Router>
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Routes>
          <Route path="/" element={<LandingPage mode={mode}/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;