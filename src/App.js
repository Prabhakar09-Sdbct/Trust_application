import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import AppAppBar from './components/AppAppBar';
import getLPTheme from './getLPTheme';

function App() {
  const [mode, setMode] = React.useState('light');
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