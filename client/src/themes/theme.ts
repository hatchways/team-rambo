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
    secondary: { main: '#F4F6FF', contrastText: '#000000' },
    info: { main: '#666666' },
  },
  shape: {
    borderRadius: 5,
  },
});
