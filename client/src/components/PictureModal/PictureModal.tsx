import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import useStyles from './PictureModalStyles';
import React from 'react';
import Dropzone from 'react-dropzone';
import uploadImage from '../../helpers/APICalls/uploadImage';
import { useState } from 'react';

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
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleFile = (files: File[]) => {
    const form = new FormData();
    form.append('image', files[0]);
    uploadImage(form)
      .then((data) => {
        if (!data.error) setOpen();
        else setOpenAlert(true);
      })
      .catch(() => setOpenAlert(true));
  };

  const handleAlertClose = (
    event: React.SyntheticEvent<Event> | React.SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <Dialog open={open} onClose={setOpen}>
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant="h6" className={classes.text}>
          Upload profile picture
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Dropzone maxSize={maxFileSize} multiple={false} onDrop={(acceptedFiles: File[]) => handleFile(acceptedFiles)}>
          {({ getRootProps, getInputProps }: UploadProps) => (
            <>
              <Paper {...getRootProps()} className={classes.dropZonePaper}>
                <Box>
                  <CloudUploadIcon className={classes.uploadIcon} />
                  <input type="file" {...getInputProps()} />
                </Box>
                <Typography variant="h6" className={classes.text}>
                  Drag and drop some files here, or click to select files
                </Typography>
              </Paper>
            </>
          )}
        </Dropzone>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} elevation={7} variant="filled" severity="error">
            Insert a valid image file!
          </Alert>
        </Snackbar>
      </DialogContent>
    </Dialog>
  );
};

export default PictureModal;
