import { Box, Button } from '@material-ui/core';
import { InnerForm } from './InnerForm/InnerForm';
import { useState, useEffect } from 'react';
import useStyles from './useStyles';

type CardFormProps = {
  columnId: string;
};

const CardForm = ({ columnId }: CardFormProps): JSX.Element => {
  const classes = useStyles();
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

  const openForm = (): void => setFormIsOpen(true);
  const closeForm = (): void => setFormIsOpen(false);

  const handleClose = (event: globalThis.KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeForm();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleClose, false);
    return () => {
      document.removeEventListener('keydown', handleClose, false);
    };
  }, []);

  return (
    <Box>
      {formIsOpen ? <InnerForm columnId={columnId} formAction={setFormIsOpen} /> : null}
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
