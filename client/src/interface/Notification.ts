export default interface INotificationItem {
  type: string;
  title: string;
  description: string;
  read: boolean;
  link: string;
  user: string;
  createdAt?: Date;
}
