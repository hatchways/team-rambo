export interface IUploadOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body?: FormData;
  credentials?: RequestCredentials;
}

export interface IUploadProfilePicture {
  error?: { message: string };
  url: string;
  etag: string;
}
