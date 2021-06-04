export interface IUser {
  email: string;
  picture: { url: string; etag: string };
}

export interface ISearchUsersApiData {
  users?: IUser[];
  error?: { message: string };
}
