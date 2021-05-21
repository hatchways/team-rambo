import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import useStyles from './PictureModalStyles';
import React from 'react';
import Dropzone from 'react-dropzone';

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

  return (
    <Dialog open={open} onClose={setOpen}>
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          Upload profile picture
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>Content here</Typography>
        <Dropzone onDrop={(acceptedFiles: string) => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }: UploadProps) => (
            <section>
              {console.log(getRootProps())}
              <div {...getRootProps()}>
                <input {...getInputProps()} />
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
