import { User } from '../interface/User';

const mockLoggedInUser: User = {
  email: 'mockLoggedInUser@gmail.com',
};

const mockOtherUser1: User = {
  email: 'mockTestUser1@gmail.com',
};
const mockOtherUser2: User = {
  email: 'mockTestUser2@gmail.com',
};
const mockOtherUser3: User = {
  email: 'mockTestUser3@gmail.com',
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
