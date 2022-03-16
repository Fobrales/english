import './App.css';
import Header from './layout/Header'
import Footer from './layout/Footer'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './layout/palette'

import Game from './Game'
import About from './About'
import Settings from './Settings'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  const [userTheme, setUserTheme] = useState('dark')

  const listPages = [
    {path: '/about', title: 'About', element: <About />}, 
    {path: '/game', title: 'Game', element: <Game />}, 
    {path: '/settings', title: 'Settings', element: <Settings />},
    {path: '/', title: 'About', element: <About />},
  ]

  const pages = (theme) => {
    let list = listPages.map((p, i) => <Route key={i} path={p.path} title={p.title} element={p.element}/>)
    return list
  }

  return (
    <ThemeProvider theme={theme(userTheme)}>
      <Router>
      <Box sx={{ bgcolor: 'background.default', color: 'text.background', height: '100vh'}}>
      <Header pages={listPages.slice(0, -1)} />
      <Container maxWidth='xl' sx={{ py: 2, px: 1, bgcolor: 'background.paper', color: 'text.background' }}>
      <Routes>
        {pages()}
      </Routes>
      <Footer />
      </Container>
      </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
