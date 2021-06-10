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
import { useKanban } from '../../../context/';
import { ICard, IDialogItem } from '../../../interface';
import { DatePicker } from '..';

const DialogItem = ({ item, activeCard }: { item: IDialogItem; activeCard: ICard }): JSX.Element => {
  const classes = dialogItemStyles();
  const [content, setContent] = useState(activeCard[`${item.content}`] || '');
  const { updateActiveCard } = useKanban();

  const handleSave = () => updateActiveCard({ [`${item.content}`]: content });

  // const { removeItem } = useDialog();
  // const handleClose = () => removeItem(item.id);

  const handleClear = () => setContent('');

  const chooseIcon = (icon: string | undefined): JSX.Element => {
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
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder={'Add a Description'}
            value={content}
            variant="outlined"
            className={classes.textField}
            onChange={(e) => setContent(e.target.value)}
          />
        );
      case 'date':
        return <DatePicker content={content} setContent={setContent} />;
      case 'comment':
        return (
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Add a Comment"
            value={content}
            variant="outlined"
            className={classes.textField}
            onChange={(e) => setContent(e.target.value)}
          />
        );
      case 'checklist':
        return <CheckList content={content} setContent={setContent} />;
      case 'attachment':
        return (
          <Box>
            <input multiple type="file" className={classes.dialogButton} />
          </Box>
        );
      default:
        return <ClearIcon />;
    }
  };

  return (
    <Grid item xs={12} className={classes.mainSection}>
      {cloneElement(chooseIcon(item.icon), { className: classes.icons, color: 'primary' })}
      <Typography variant="h6" className={classes.dialogHeading}>
        {item.title}
      </Typography>
      {chooseItemType(item.content)}
      <Button
        onClick={() => handleSave()}
        className={classes.dialogButton}
        color="primary"
        variant="contained"
        size="large"
        disableElevation
      >
        Save
      </Button>
      <IconButton onClick={() => handleClear()}>
        <ClearIcon color="primary" />
      </IconButton>
    </Grid>
  );
};

export default DialogItem;
