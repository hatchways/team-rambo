import { IUser } from '../interface/';

const mockLoggedInUser: IUser = {
  email: 'mockLoggedInUser@gmail.com',
};

const mockOtherUser1: IUser = {
  email: 'mockTestUser1@gmail.com',
};
const mockOtherUser2: IUser = {
  email: 'mockTestUser2@gmail.com',
};
const mockOtherUser3: IUser = {
  email: 'mockTestUser3@gmail.com',
};

const mockOtherUsers: IUser[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
