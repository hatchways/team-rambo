import { makeStyles, Theme } from '@material-ui/core';

export type ICardTagColorProps = {
  tag: string;
};

const useColorTagStyles = makeStyles<Theme, ICardTagColorProps>((theme) => {
  return {
    cardTagColor: (props: ICardTagColorProps) => {
      return {
        backgroundColor: theme.palette.tags[props.tag],
        border: props.tag === 'white' ? '1px solid lightgrey' : 'none',
      };
    },
  };
});

export default useColorTagStyles;
