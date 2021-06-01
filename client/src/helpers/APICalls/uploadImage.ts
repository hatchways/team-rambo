import { IUploadProfilePicture } from '../../interface/File';
import { IUploadOptions } from '../../interface/File';

const uploadImage = async (form: FormData): Promise<IUploadProfilePicture> => {
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

export default uploadImage;
