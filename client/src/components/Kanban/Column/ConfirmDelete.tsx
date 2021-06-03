import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import { useKanban } from '../../../context';

interface ConfirmProps {
  id: string;
  isDeleting: boolean;
  closeConfirm: () => void;
}

const ConfirmDelete = ({ id, isDeleting, closeConfirm }: ConfirmProps): JSX.Element => {
  const { removeColumn } = useKanban();

  return (
    <Dialog
      maxWidth="md"
      open={isDeleting}
      onClose={closeConfirm}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this column?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deleting this column also deletes all of its cards; this action can&#39;t be reversed in the future.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            removeColumn(id);
          }}
          color="primary"
        >
          Delete
        </Button>
        <Button onClick={closeConfirm} color="secondary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDelete;
