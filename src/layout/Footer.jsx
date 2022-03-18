import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const Footer = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth='xl' sx={{ py: 2, px: 1, mt: 1, bgcolor: 'background.paper', color: 'text.background', borderRadius: 2 }}>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        2022 &copy; Fobrales (Mokhnatova A.)
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        Реализовано с помощью сервиса «<Link color="inherit" href="https://tech.yandex.ru/dictionary">Яндекс.Словарь</Link>»
      </Box>
    </Container>
  );
};

export default Footer;