export interface User {
  email: string;
  picture?: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
