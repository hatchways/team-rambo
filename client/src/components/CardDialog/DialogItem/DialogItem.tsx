import { cloneElement, useState } from 'react';
import { Button, IconButton, Grid, Box, TextField, Typography } from '@material-ui/core';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import CheckList from '../CheckList/CheckList';
import dialogItemStyles from './dialogItemStyles';
import { useDialog, useKanban } from '../../../context/';
import { IDialogItem } from '../../../interface';
import { DatePicker } from '..';

const DialogItem = ({
  title = 'blank',
  content = 'description',
  icon = 'clear',
  id = 'testId',
  activeCard,
}: IDialogItem): JSX.Element => {
  const classes = dialogItemStyles();
  const { removeItem } = useDialog();
  const [updateContent, setUpdateContent] = useState('');
  const { updateActiveCard } = useKanban();

  const handleSave = () => {
    updateActiveCard(JSON.parse(`{"${content}": "${updateContent}"}`));
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
      case 'attachment':
        return <AttachFileOutlinedIcon />;
      case 'checklist':
        return <CheckBoxOutlinedIcon />;
      default:
        return <ClearIcon />;
    }
  };

  const chooseItemType = (item: string) => {
    switch (item) {
      case 'description':
        return (
          <>
            <div>{activeCard ? activeCard.description : 'placeholder'}</div>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder={'Description'}
              variant="outlined"
              className={classes.textField}
              onChange={(e) => setUpdateContent(e.target.value)}
            />
          </>
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
            onChange={(e) => setUpdateContent(e.target.value)}
          />
        );
      case 'tag':
        break;
      case 'checklist':
        return <CheckList />;
      case 'attachment':
        return (
          <Box>
            <input multiple type="file" className={classes.dialogButton} />
          </Box>
        );
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
