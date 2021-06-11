import React from 'react';
import { Input, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox } from '@material-ui/core';
import checkListStyles from './checkListStyles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const NAMES = ['Buy supplies', 'Contact teammates', 'Research', 'Book study hours'];

interface CheckListProps {
  content: string[] | string;
  setContent: (content: string[]) => void;
}

const CheckList = ({ content, setContent }: CheckListProps): JSX.Element => {
  const classes = checkListStyles();
  const [checkListItem, setcheckListItem] = React.useState<string[]>([...content]);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setcheckListItem(event.target.value as string[]);
    setContent(event.target.value as string[]);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={checkListItem}
          onChange={handleChange}
          input={<Input />}
          renderValue={(content) => (content as string[]).join(', ')}
          MenuProps={MenuProps}
        >
          {NAMES.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={checkListItem.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CheckList;
