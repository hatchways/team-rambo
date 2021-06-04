import { IImageUploadData, IUploadOptions } from '../../interface/';

const uploadImage = async (form: FormData): Promise<IImageUploadData> => {
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
