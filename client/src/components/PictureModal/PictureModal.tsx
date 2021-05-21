import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import useStyles from './PictureModalStyles';
import React from 'react';
import Dropzone from 'react-dropzone';
import uploadImage from '../../helpers/APICalls/uploadImage';

interface Props {
  open: boolean;
  setOpen: () => void;
}

interface UploadProps {
  getRootProps: () => Event[];
  getInputProps: () => React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

const PictureModal = ({ open, setOpen }: Props): JSX.Element => {
  const classes = useStyles();
  const maxFileSize = 5e8;

  const handleFile = (files: File[]) => {
    const form = new FormData();
    form.append('image', files[0]);
    uploadImage(form)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <Dialog open={open} onClose={setOpen}>
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          Upload profile picture
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>Content here</Typography>
        <Dropzone maxSize={maxFileSize} multiple={false} onDrop={(acceptedFiles: File[]) => handleFile(acceptedFiles)}>
          {({ getRootProps, getInputProps }: UploadProps) => (
            <section>
              {console.log(getRootProps())}
              <div {...getRootProps()}>
                <input type="file" {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </DialogContent>
    </Dialog>
  );
};

export default PictureModal;
