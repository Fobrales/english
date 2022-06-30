import Box from '@mui/material/Box';
import { useState, useEffect, useContext } from 'react';
import User from './scripts/User'
import Switch from '@mui/material/Switch'
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider'
import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { setBy } from './scripts/SettingsStore';



export default function Settings() {
    const user = useContext(User)
    const [darkMode, setDarkMode] = React.useState(user.theme === 'dark');
    const difficult = useSelector((state) => state.difficult.value)
    const dispatch = useDispatch()

    const changeTheme = (e) => {
      setDarkMode(!darkMode)
      const theme = darkMode ? 'light' : 'dark'
      localStorage.setItem('theme', theme)
      user.setTheme(theme)
    }

    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Settings:</h3>
        </Grid>
        <Grid item xs={3} sm={2} lg={1} sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
          <Switch checked={darkMode} onChange={changeTheme}/>
        </Grid>
        <Grid item xs={9} sm={10} lg={11} sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
          <Box>Dark mode of pages</Box>
        </Grid>
        <Grid item xs={3} sm={2} lg={1} sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
        <Slider
          aria-label="Temperature"
          value={difficult}
          valueLabelDisplay="auto"
          onChange={(e, val) => dispatch(setBy(val))}
          step={1}
          marks
          min={1}
          max={5}
        />
        </Grid>
        <Grid item xs={9} sm={10} lg={11} sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
          <Box>Difficult</Box>
        </Grid>
      </Grid>
    );
  }