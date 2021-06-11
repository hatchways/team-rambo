import { useState, useEffect } from 'react';
import { Popover, IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationItem from '../NotificationItem/NotificationItem';
import { StyledBadge } from './notificationCenterStyles';
import { INotificationItem } from '../../../../interface/';
import { useAuth } from '../../../../context';
import { notifications } from '../sampleNotificationData';
import { useCallback } from 'react';

const NotificationCenter = (): JSX.Element => {
  const { loggedInUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [unread, setUnread] = useState(
    notifications.filter((item: INotificationItem) => item.user === loggedInUser?.email).length,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const countNotifications = useCallback(() => {
    return notifications.filter((item: INotificationItem) => item.read === false && item.user === loggedInUser?.email)
      .length;
  }, [loggedInUser]);

  const open = Boolean(anchorEl);

  useEffect(() => {
    setUnread(countNotifications);
  }, [countNotifications]);

  return (
    <div>
      <IconButton onClick={handleClick}>
        <StyledBadge badgeContent={unread > 0 && unread} invisible={unread < 1 ? true : false} color="secondary">
          <NotificationsIcon color="primary" style={{ fontSize: 30 }} />
        </StyledBadge>
      </IconButton>
      <Popover
        open={countNotifications() !== 0 ? open : false}
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
        {notifications
          .filter((item: INotificationItem) => item.user === loggedInUser?.email)
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
