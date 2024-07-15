import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './Utils/ThemeContext';
import { GlobalStyles, lightTheme, darkTheme } from './Utils/GlobalStyles';
import HomeSA from './Pages/HomeSA';
import Navbar from './Components/Navbar';
const AppContent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles theme={theme === 'light' ? lightTheme : darkTheme} />
      <Navbar/>
      <div>
       
        <button onClick={toggleTheme}>Toggle Theme</button>
        <Routes>
          <Route path="/" element={<HomeSA />} />
        
        </Routes>
      </div>
    </StyledThemeProvider>
  );
};

const App = () => (
  <ThemeProvider>
    <Router>
      <AppContent />
    </Router>
  </ThemeProvider>
);

export default App;
