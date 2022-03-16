import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#1976d2',
            dark: '#004ba0',
            light: '#63a4ff',
            text: '#ffffff',
          },
          secondary: {
            main: '#d50000',
            dark: '#9b0000',
            light: '#ff5131',
            text: '#ffffff',
          },
          background: {
            default: '#bdbdbd',
            paper: '#efefef',
            light: '#efefef',
            dark: '#8d8d8d',
          },
          text: {
            primary: '#ffffff',
            secondary: '#ffffff',
            background: '#000',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#1976d2',
            dark: '#004ba0',
            light: '#63a4ff',
            text: '#ffffff',
          },
          secondary: {
            main: '#d50000',
            dark: '#9b0000',
            light: '#ff5131',
            text: '#ffffff',
          },
          background: {
            default: '#1d1d1d',
            paper: '#404040',
            light: '#444444',
            dark: '#000000'
          },
          text: {
            primary: '#fff',
            secondary: '#fff',
            background: '#fff',
          },
        }),
  },
});

export function theme (mode) {
  return createTheme(getDesignTokens(mode))
}


/* export const theme = createTheme({
  palette: {
    primary: {
      main: '#1565C0',
      dark: '#003c8f',
      light: '#5e92f3',
      text: '#ffffff',
    },
    secondary: {
      main: '#BF3528',
      dark: '#870000',
      light: '#f86752',
      text: '#ffffff',
    },
    light: {
        main: '#d6d6d6',
        dark: '#a5a5a5',
        light: '#ffffff',
        text: '#000000'
    },
    dark: {
        main: '#2d2d2d',
        light: '#565656',
        dark: '#020202',
        text: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff'
    }
  },
}); */