import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

export default function About() {
    const info = [
      `Routing maked by react-router-dom. You can click on button panel at page's header and move between sections "About", "Settings" and "Game"`, 
      `Design and style developed with MUI, React UI library based on material design principles.`,
      `I use React hooks and class components together in the app to demonstrate equal work skill's level with both.`
    ]

    return (
      <Box>
          <p>This project make for demonstration my skills. It's game for english vocabulary training. Your goal is print english words so fast as possible and get points.</p>
          <p>So, if you would like learn more about code, I repeat readme info bottom:</p>
          <Divider light sx={{my: 1}} />
          <Box
          sx={{
            display: 'flex',
            flexDirection: {xs: 'column', sm: 'row'},
            alignItems: 'stretch',
            justifyContent: 'center',
            p: 1,
            m: 1,
          }}
        >
          {info.map((i, n) => <Box key={n + i.split(' ')[0]} sx={{flexGrow: 1, m: 2, p: 1 }}>{i}</Box>)}
      </Box>
    </Box>
    );
  }