export interface IUser {
  name?: string;
  email: string;
  picture: { url: string };
}

export interface ISearchUsersApiData {
  users?: IUser[];
  error?: { message: string };
}
