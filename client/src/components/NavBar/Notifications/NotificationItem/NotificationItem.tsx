import { cloneElement, useState } from 'react';
import notificationItemStyles from './notificationItemStyles';
import { Divider, Typography, Box, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { notifications } from '../sampleNotificationData';
import { INotificationItem } from '../../../../interface/';

type NotificationItemProps = INotificationItem;

const NotificationItem = ({ type, title, description, read, link }: NotificationItemProps): JSX.Element => {
  const classes = notificationItemStyles();
  const [readState, setReadState] = useState(read);

  const chooseIcon = (icon: string): JSX.Element => {
    switch (icon) {
      case 'reminder':
        return <CheckBoxOutlinedIcon />;
      case 'appointment':
        return <ScheduleIcon />;
      case 'calendar':
        return <AssignmentOutlinedIcon />;
      default:
        return <ClearIcon />;
    }
  };

  const handleClick = () => {
    setReadState(!readState);
    notifications
      .filter((item: INotificationItem) => item.title === title)
      .map((item: INotificationItem) => (item.read = !read));
  };

  return (
    <div className={!readState ? classes.main : `${classes.main} ${classes.read}`} onClick={handleClick}>
      <Box>
        {cloneElement(chooseIcon(type), { className: classes.icons })}
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        <Button disabled={!readState} className={`${classes.dismiss} ${classes.ignoreRead}`}>
          Dismiss
        </Button>
      </Box>
      <Divider className={classes.divider} />
      <Typography className={classes.indent} variant="body1">
        {description}
      </Typography>
      <Typography className={classes.indent} variant="body1">
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      </Typography>
    </div>
  );
};

export default NotificationItem;
