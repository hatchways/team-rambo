import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import useStyles from './PictureModalStyles';
import React from 'react';
import Dropzone, { DropzoneState } from 'react-dropzone';
import uploadImage from '../../helpers/APICalls/uploadImage';
import { useState } from 'react';

interface Props {
  open: boolean;
  setOpen: () => void;
}

interface IAlert {
  open: boolean;
  severity?: Color;
  message?: string;
}

const PictureModal = ({ open, setOpen }: Props): JSX.Element => {
  const classes = useStyles();
  const maxFileSize = 5e8;
  const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
  const [alert, setOpenAlert] = useState<IAlert>({ open: false });
  const [preview, setPreview] = useState<string>('');
  const [image, setImage] = useState<Blob>(new Blob());

  const handleFile = (files: File[]) => {
    const reader = new FileReader();
    const currentFile = [...files].shift();

    if (!currentFile) {
      setOpenAlert({ open: true, message: 'Insert a valid image file!', severity: 'error' });
      return;
    }

    reader.onload = () => {
      const result = reader.result;
      if (result) {
        setPreview(result.toString());
        setImage(currentFile);
      }
    };
    reader.readAsDataURL(currentFile);
  };

  const handleUpload = async (file: Blob) => {
    const form = new FormData();
    form.append('image', file);

    const { error } = await uploadImage(form);
    if (error) {
      setOpenAlert({ open: true, message: 'Insert a valid image file!', severity: 'error' });
      return;
    }
    setOpenAlert({ open: true, message: 'Image saved!', severity: 'success' });
    setOpen();
  };

  const handleAlertClose = (
    event: React.SyntheticEvent<Event> | React.SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert({ open: false });
  };

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <>
      <Dialog open={open} onClose={setOpen}>
        <DialogTitle disableTypography className={classes.root}>
          <Typography variant="h6" className={classes.title}>
            Upload profile picture
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
            <Grid item>
              <Box className={classes.avatarBox}>
                <Typography variant="h6">Preview</Typography>
                <Avatar alt="preview" src={preview} className={classes.avatar} />
              </Box>
            </Grid>
            <Grid item>
              <Dropzone
                maxSize={maxFileSize}
                multiple={false}
                accept={acceptedFileTypes}
                onDrop={(acceptedFiles: File[]) => handleFile(acceptedFiles)}
              >
                {({ getRootProps, getInputProps }: DropzoneState) => (
                  <Paper {...getRootProps()} className={classes.dropZonePaper}>
                    <Box>
                      <CloudUploadIcon className={classes.uploadIcon} />
                      <input type="file" {...getInputProps()} />
                    </Box>
                    <Typography variant="subtitle2" className={classes.text}>
                      Drag and drop a file here, or click to select files
                    </Typography>
                  </Paper>
                )}
              </Dropzone>
            </Grid>
            <Grid item>
              <Button
                onClick={() => handleUpload(image)}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} elevation={7} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PictureModal;
