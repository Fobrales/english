import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Footer = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Divider light sx={{mt: 2}} />
      <Box sx={{mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      2022 &copy; Fobrales (Mokhnatova A.)
      </Box>
    </Box>
  );
};

export default Footer;