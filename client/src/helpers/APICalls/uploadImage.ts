import { ImageUploadData } from '../../interface/File';
import { IUploadOptions } from '../../interface/File';

export const uploadImage = async (form: FormData): Promise<ImageUploadData> => {
  const fetchOptions: IUploadOptions = {
    method: 'POST',
    body: form,
  };

  return fetch(`/files/upload`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
