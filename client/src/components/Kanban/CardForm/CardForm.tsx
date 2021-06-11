import { useState, useEffect, useCallback } from 'react';
import { Box, Button } from '@material-ui/core';
import { InnerForm } from './InnerForm/InnerForm';
import useStyles from './useStyles';

type CardFormProps = {
  columnId: string;
};

const CardForm = ({ columnId }: CardFormProps): JSX.Element => {
  const classes = useStyles();
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

  const openForm = (): void => setFormIsOpen(true);
  const closeForm = (): void => setFormIsOpen(false);

  const handleClose = useCallback((event: globalThis.KeyboardEvent) => {
    if (event.key === 'Escape') closeForm();
  }, []);

  // Can we handle the eventListeners in a more React manner here
  useEffect(() => {
    document.addEventListener('keydown', handleClose, false);
    return () => {
      document.removeEventListener('keydown', handleClose, false);
    };
  }, [handleClose]);

  return (
    <Box>
      {formIsOpen && <InnerForm columnId={columnId} formAction={setFormIsOpen} />}
      {!formIsOpen && (
        <Button
          onClick={openForm}
          size="large"
          color="secondary"
          disableElevation
          className={`${!formIsOpen ? classes.button : ''}`}
        >
          Add a card...
        </Button>
      )}
    </Box>
  );
};

export default CardForm;
