import React, { useState } from 'react';
import {
  Dialog,
  Box,
  Button,
  Grid,
  Paper,
  Avatar,
  Divider,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Save, Clear, CloudUpload } from '@material-ui/icons';
import Dropzone, { DropzoneState } from 'react-dropzone';
import useStyles from './PictureModalStyles';
import { uploadImage } from '../../helpers/';
import { useSnackBar } from '../../context';

interface Props {
  open: boolean;
  onClose: () => void;
}

const PictureModal = ({ open, onClose }: Props): JSX.Element => {
  const classes = useStyles();
  const maxFileSize = 5e8;
  const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
  const { updateSnackBarMessage } = useSnackBar();
  const [preview, setPreview] = useState<string>('');
  const [image, setImage] = useState<Blob>(new Blob());

  const handleFile = (files: File[]) => {
    const reader = new FileReader();
    const currentFile = [...files].shift();

    if (!currentFile) {
      updateSnackBarMessage('Insert a valid image file!', 'error');
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
      updateSnackBarMessage('Insert a valid image file!', 'error');
      return;
    }
    updateSnackBarMessage('Image saved!', 'success');
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} className={classes.root}>
        <DialogTitle disableTypography>
          <Typography variant="h6" className={classes.title}>
            Upload profile picture
          </Typography>
          <IconButton onClick={onClose} className={classes.closeButton}>
            <Clear />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          <Grid container direction="column" alignItems="center" spacing={4}>
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
                      <CloudUpload className={classes.uploadIcon} />
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
                startIcon={<Save />}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PictureModal;
