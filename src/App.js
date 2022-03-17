import './App.css';
import HeadImage from './layout/HeadImage'
import Header from './layout/Header'
import Footer from './layout/Footer'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './layout/palette'

import Game from './Game'
import About from './About'
import Settings from './Settings'
import NotFound from './NotFound'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";


function App() {
  const [userTheme, setUserTheme] = useState('dark')
  const [loc, setLoc] = useState('English Game')

  const listPages = [
    {path: '/about', title: 'About', element: <About />}, 
    {path: '/game', title: 'Game', element: <Game />}, 
    {path: '/settings', title: 'Settings', element: <Settings />},
    {path: '/', title: 'About', element: <About />},
    {path: '*', title: 'Page not found', element: <NotFound />}
  ]

  const pages = (theme) => {
    let list = listPages.map((p, i) => <Route key={i} path={p.path} title={p.title} setTitle={setLoc} element={p.element}/>)
    return list
  }

  useEffect(() => {
    const page = listPages.find((page) => page.path === loc)
    document.title = (page ? page.title : 'Loading...') + ' / Fobrales'
  });

  return (
      <Router>
        <ThemeProvider theme={theme(userTheme)}>
          <Box sx={{ bgcolor: 'background.default', color: 'text.background', height: '100vh'}}>
            <Header pages={listPages.slice(0, -2)} setTitle={setLoc} />
            <HeadImage/>
            <Container maxWidth='xl' sx={{ py: 2, px: 1, mt: 1, bgcolor: 'background.paper', color: 'text.background', borderRadius: 2 }}>
            <Routes>
              {pages()}
            </Routes>
            </Container>
            <Footer />
          </Box>
        </ThemeProvider>
      </Router>
  );
}

export default App;
