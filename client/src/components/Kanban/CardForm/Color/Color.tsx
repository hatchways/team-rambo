import { Grid } from '@material-ui/core';
import useStyles from './useStyles';
import clsx from 'clsx';
import useColorTagStyles from '../../shared/colorStyles';

type ColorProps = {
  name: string;
  activeSelected: boolean;
  setSelected: (name: string) => void;
  key?: string | number;
};

export const Color = ({ name = 'white', activeSelected, setSelected }: ColorProps): JSX.Element => {
  const classes = useStyles();
  const colorClasses = useColorTagStyles({ tag: name });
  return (
    <Grid
      onClick={() => setSelected(name)}
      className={clsx(classes.color, colorClasses.cardTagColor, activeSelected && classes.colorSelected)}
      item
    ></Grid>
  );
};
