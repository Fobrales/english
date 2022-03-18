import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import BoltIcon from '@mui/icons-material/Bolt';

export default function About() {
    const info = [
      `Routing maked by react-router-dom. You can click on button panel at page's header and move between sections "About", "Settings" and "Game"`, 
      `Design and style developed with MUI, React UI library based on material design principles.`,
      `I use React hooks and class components together in the app to demonstrate equal work skill's level with both.`,
      `App is adaptive and useable for mobile and laptop. Menu hide on 600px screen width, then menu icon with drop list appear. Web page layout developed with using flexbox and grid.`,
      `For translation words I use API of service Yandex.Dictionary. HTTP-request to JSON interface of service executed using axios library.`
    ]

    return (
      <Box>
          <p>This project make for demonstration my skills. It's game for english vocabulary training. Your goal is print russian translate of english words so fast as possible and get points.</p>
          <p>So, if you would like learn more about code, I repeat readme info bottom:</p>
          <Box
          sx={{
            display: 'flex',
            flexDirection: {xs: 'column', sm: 'row'},
            alignItems: 'stretch',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {info.map((info, n) => <Box key={n + info.split(' ')[0]} sx={{
            width: {xs: 'auto', sm: '30%'}, 
            backgroundColor: 
            'primary.main', 
            color: 'text.primary', 
            flexGrow: 1, 
            m: 2, 
            p: 1,
            borderRadius: 2,
            lineHeight: 2,
             }}>
               <BoltIcon sx={{verticalAlign: 'middle'}}/> {info}
            </Box>)}
      </Box>
    </Box>
    );
  }