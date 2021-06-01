import { useState } from 'react';
import { Popover, IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { User } from '../../../../interface/User';
import NotificationItem from '../NotificationItem/NotificationItem';
import { testNotifications } from '../sampleNotificationData';
import INotificationItem from '../../../../interface/Notification';
import { StyledBadge } from './notificationCenterStyles';

type NotificationProps = {
  loggedInUser: User;
};

const NotificationCenter = ({ loggedInUser }: NotificationProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [unread, setUnread] = useState(testNotifications.filter((item) => item.read === true).length);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setUnread(testNotifications.filter((item) => item.read === true).length);
  };

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton onClick={handleClick}>
        <StyledBadge badgeContent={unread} color="secondary">
          <NotificationsIcon color="primary" style={{ fontSize: 45 }} />
        </StyledBadge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {testNotifications
          .filter((item: INotificationItem) => item.user === loggedInUser.email)
          .map((item: INotificationItem) => {
            return (
              <NotificationItem
                key={item.title}
                type={item.type}
                title={item.title}
                description={item.description}
                read={item.read}
                link={item.link}
                user={item.user}
              />
            );
          })}
      </Popover>
    </div>
  );
};

export default NotificationCenter;
