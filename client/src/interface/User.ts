export interface IUser {
  email: string;
}

export interface ISearchUsersApiData {
  users?: IUser[];
  error?: { message: string };
}
