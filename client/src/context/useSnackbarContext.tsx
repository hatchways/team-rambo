import { useState, useContext, createContext, FunctionComponent, SyntheticEvent, useCallback } from 'react';
import { IconButton, Snackbar, SnackbarCloseReason } from '@material-ui/core';
import MuiAlert, { Color, AlertProps } from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

interface ISnackBarContext {
  updateSnackBarMessage: (message: string, severity?: Color) => void;
}

export const SnackBarContext = createContext<ISnackBarContext>({
  updateSnackBarMessage: () => null,
});

export const SnackBarProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<Color>('success');
  const [open, setOpen] = useState<boolean>(false);

  const updateSnackBarMessage = useCallback((message: string, severity?: Color) => {
    setMessage(message);
    severity ? setSeverity(severity) : setSeverity('success');
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const snackbarHandleClose = useCallback((event: SyntheticEvent, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  }, []);

  const alertHandleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <SnackBarContext.Provider value={{ updateSnackBarMessage }}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={snackbarHandleClose}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={alertHandleClose} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};

export function useSnackBar(): ISnackBarContext {
  return useContext(SnackBarContext);
}
