import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>((theme) => {
  return {
    card: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(3),
      marginBottom: theme.spacing(2),
      borderRadius: 5,
      width: '100%',
      boxShadow: '0px 0px 10px rgba(193, 196, 212, .2)',
    },
    typography: {
      fontWeight: 'bold',
    },
    cardTag: {
      width: 50,
      height: 8,
      borderRadius: 9999,
      marginBottom: 12,
    },
    cardDragging: {
      transform: 'rotate(-5deg)',
      transition: 'all 250ms ease',
      boxShadow: '0px 0px 50px rgba(193, 196, 212, 0.5)',
    },
  };
});

export default useStyles;
