import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans", "sans-serif", "Roboto"',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: '#759CFC', contrastText: '#FFFFFF' },
    secondary: { main: '#9BA9CC', contrastText: '#000000', light: '#F4F6FF' },
    info: { main: '#F4F6FF' },
    text: {
      primary: '#000000',
      secondary: '#9BA9CC',
    },
    tags: {
      white: '#FFFFFF',
      green: '#5ACD76',
      red: '#FF5D48',
      yellow: '#EDAB1D',
      blue: '#59B0FF',
      purple: '#D460F7',
    },
  },
  shape: {
    borderRadius: 5,
  },
});
