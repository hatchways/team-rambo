import { INotificationItem } from '../../../interface/';

export const notifications: INotificationItem[] = [
  {
    type: 'reminder',
    title: 'Go Shopping',
    description: 'Need to pick up books and such from campus store.',
    read: false,
    link: 'www.google.com',
    user: 'demo@user.ca',
  },
  {
    type: 'appointment',
    title: 'Podiatrist Visit',
    description: 'Reconstructive foot surgery.',
    read: true,
    link: 'www.google.com',
    user: 'demo@user.ca',
  },
  {
    type: 'reminder',
    title: 'Get present for David',
    description: "Get something nice for David's recovery",
    read: false,
    link: 'www.google.com',
    user: 'jon.mcintire.myers@gmail.com',
  },
  {
    type: 'calendar',
    title: 'Podiatrist Visit #2',
    description: 'Reconstructive foot surgery.',
    read: true,
    link: 'www.google.com',
    user: 'jon.mcintire.myers@gmail.com',
  },
];
