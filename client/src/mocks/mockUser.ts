import { IUser } from '../interface/';

const mockLoggedInUser: IUser = {
  email: 'mockLoggedInUser@gmail.com',
  picture: {
    url: 'https://robohash.org/mockLoggedInUser@gmail.com.png',
  },
};

const mockOtherUser1: IUser = {
  email: 'mockTestUser1@gmail.com',
  picture: {
    url: 'https://robohash.org/mockTestUser1@gmail.com.png',
  },
};
const mockOtherUser2: IUser = {
  email: 'mockTestUser2@gmail.com',
  picture: {
    url: 'https://robohash.org/mockTestUser2@gmail.com.png',
  },
};
const mockOtherUser3: IUser = {
  email: 'mockTestUser3@gmail.com',
  picture: {
    url: 'https://robohash.org/mockTestUser3@gmail.com.png',
  },
};

const mockOtherUsers: IUser[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
