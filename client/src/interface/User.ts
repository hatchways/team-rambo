export interface User {
  email: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
