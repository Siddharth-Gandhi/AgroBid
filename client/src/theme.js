import { createTheme } from '@mui/material';
import { lightGreen, amber, brown } from '@mui/material/colors';

const theme = createTheme({
  // palette: {
  //   mode: 'light',
  //   primary: {
  //     main: lightGreen[100],
  //     light: lightGreen[100],
  //     dark: lightGreen[900],
  //   },
  //   text: {
  //     primary: lightGreen[900],
  //     secondary: lightGreen[100],
  //   },
  // },
  palette: {
    type: 'light',
    primary: {
      main: lightGreen[300],
      light: lightGreen[100],
      dark: lightGreen[900],
    },
    secondary: {
      main: amber[600],
      light: amber[100],
      dark: amber[900],
    },
    text: {
      primary: '#1B5E20',
      secondary: brown[900],
    },
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 500,
      sm: 700,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
