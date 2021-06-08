import { Dialog, DialogTitle } from '@material-ui/core';
import { PropsWithChildren } from 'react';

export interface DialogWrapperProps {
  heading: string;
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const DialogWrapper = ({
  heading,
  selectedValue,
  open,
  children,
  onClose,
}: PropsWithChildren<DialogWrapperProps>): JSX.Element => {
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth>
      <DialogTitle id="simple-dialog-title">{heading}</DialogTitle>
      {children}
    </Dialog>
  );
};
