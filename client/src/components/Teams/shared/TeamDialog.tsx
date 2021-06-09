import { Dialog } from '@material-ui/core';
import { PropsWithChildren } from 'react';

export interface DialogWrapperProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const DialogWrapper = ({
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
      {children}
    </Dialog>
  );
};
