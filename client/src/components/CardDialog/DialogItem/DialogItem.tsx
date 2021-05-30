import { cloneElement } from 'react';
import { Button, IconButton, Grid, TextField, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import dialogItemStyles from './dialogItemStyles';
import DatePicker from '../../DatePicker/DatePicker';
import { useDialog } from '../../../context/';
import { IDialogItem } from '../../../interface';

const DialogItem = ({
  title = 'blank',
  content = 'description',
  icon = 'clear',
  id = 'testId',
}: IDialogItem): JSX.Element => {
  const classes = dialogItemStyles();
  const { removeItem } = useDialog();

  const handleSave = () => {
    console.log(`Saving DialogItem with id: ${id}`);
  };

  const handleClose = () => {
    removeItem(id);
  };

  const chooseIcon = (icon: string): JSX.Element => {
    switch (icon) {
      case 'clear':
        return <ClearIcon />;
      case 'contacts':
        return <ImportContactsOutlinedIcon />;
      case 'assignment':
        return <AssignmentOutlinedIcon />;
      case 'schedule':
        return <ScheduleIcon />;
      case 'bubble':
        return <ChatBubbleOutlineIcon />;
      default:
        return <ClearIcon />;
    }
  };

  const chooseItemType = (item: string) => {
    switch (item) {
      case 'description':
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Add description"
            variant="outlined"
            className={classes.textField}
          />
        );
      case 'deadline':
        return <DatePicker />;
      case 'comment':
        return (
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Add description"
            variant="outlined"
            className={classes.textField}
          />
        );
      case 'tag':
        break;
      case 'checklist':
        break;
      case 'attachment':
        break;
      case 'cover':
        break;
      default:
        return <ClearIcon />;
    }
  };

  return (
    <Grid item xs={12} className={classes.mainSection}>
      {cloneElement(chooseIcon(icon), { className: classes.icons, color: 'primary' })}
      <Typography variant="h6" className={classes.dialogHeading}>
        {title}
      </Typography>
      {chooseItemType(content)}
      <Button
        onClick={() => {
          handleSave();
        }}
        className={classes.dialogButton}
        color="primary"
        variant="contained"
        size="large"
        disableElevation
      >
        Save
      </Button>
      <IconButton onClick={handleClose}>
        <ClearIcon color="primary" />
      </IconButton>
    </Grid>
  );
};

export default DialogItem;
