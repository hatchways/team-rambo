export interface IUser {
  email: string;
  picture?: string;
}

export interface ISearchUsersApiData {
  users?: IUser[];
  error?: { message: string };
}
