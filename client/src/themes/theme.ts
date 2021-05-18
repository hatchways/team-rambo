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
    secondary: { main: '#666666', contrastText: '000000' },
    info: { main: '#F4F6FF' },
  },
  shape: {
    borderRadius: 5,
  },
});
