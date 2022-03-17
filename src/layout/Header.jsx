import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";

const Logo = () => {
  return (
    <svg height="35px" style={{display: 'block'}} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M13 1H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/>
      <circle cx="4" cy="4" r="1.5"/>
      <circle cx="12" cy="4" r="1.5"/>
      <circle cx="12" cy="12" r="1.5"/>
      <circle cx="4" cy="12" r="1.5"/>
      <circle cx="8" cy="8" r="1.5"/>
    </svg>
  )
}

const Header = (props) => {
  const [value, setValue] = React.useState(0);
  const [opened, setOpened] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const clickMenu = (e) => {
    console.log(e.currentTarget)
    setMenu(e.currentTarget)
    setOpened(!opened)
  }

  React.useEffect(() => {
    props.setTitle(location.pathname)
  });

  return (
    <AppBar position="sticky" sx={{mt: -1, bgcolor: 'background.default'}}>
      <Container maxWidth="xl" sx={{flexDirection: 'row', justifyContent: {xs: 'space-between', sm: 'flex-start'}, flexWrap: 'wrap',  display: 'flex'}}>
        <Box sx={{mx: 2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Logo />
        </Box>
        <Box sx={{display: {xs: 'none', sm: 'block'} }}>
          <Tabs textColor="primary" indicatorColor="primary" value={value} onChange={handleChange}>
            {props.pages.map((p) => <Tab key={p.path} label={p.title} component={Link} to={p.path}/>)}
          </Tabs>
        </Box>
        <Box sx={{display: { xs: 'flex', sm: 'none' }, justifyContent: 'center', alignItems: 'center'}}>
          <IconButton onClick={clickMenu}>
            <MoreVertIcon />
          </IconButton>
          <Menu
              id="menu-appbar"
              anchorEl={menu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(opened)}
              onClose={clickMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {props.pages.map((p) => <MenuItem key={p.path} label={p.title} component={Link} to={p.path} onClick={clickMenu}>
                  {p.title}
                </MenuItem>)}
          </Menu>
        </Box>
      </Container>
    </AppBar>
  );
};
export default Header;
