import './App.css';

// components
import Header from './layout/Header'
import Footer from './layout/Footer'
import Game from './Game'
import About from './About'
import Settings from './Settings'
import NotFound from './NotFound'

// design
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './layout/palette'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'

//context API store
import User from './scripts/User'

import { useState, useEffect, useMemo } from 'react'

// router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";

//redux API store
import { Provider } from 'react-redux'
import store from './scripts/SettingsStore'


function App() {
  const location = useLocation()
  const [userTheme, setUserTheme] = useState(localStorage.getItem('theme') || 'light')

  
  const listPages = useMemo(() => [
    {path: '/about', title: 'About', element: <About />}, 
    {path: '/game', title: 'Game', element: <Game />}, 
    {path: '/settings', title: 'Settings', element: <Settings />},
    {path: '/', title: 'About', element: <About />},
    {path: '*', title: 'Page not found', element: <NotFound />}
  ])

  const pages = (theme) => {
    let list = listPages.map((p, i) => <Route key={i} path={p.path} element={p.element}/>)
    return list
  }

  useEffect(() => {
    const page = listPages.find((page) => page.path === location.pathname)
    const name = page ? page.title : 'Loading...'
    console.log('App render...')
    document.title = name + ' / Fobrales'
  });

  return (
      <ThemeProvider theme={theme(userTheme)}>
        <User.Provider value={{theme: userTheme, setTheme: setUserTheme}}>
          <Box sx={{ bgcolor: 'background.default', color: 'text.background', height: '100vh'}}>
            <Header pages={listPages.slice(0, -2)} />
            <Container maxWidth='xl' sx={{ mt: -1, py: 2, px: 1, bgcolor: 'background.paper', color: 'text.background', borderRadius: 2 }}>
            <Provider store={store}>
            <Routes>
              {pages()}
            </Routes>
            </Provider>
            </Container>
            <Footer />
          </Box>
        </User.Provider>
      </ThemeProvider>
  );
}

export default App;
