import {
  Button,
  Dialog,
  Typography,
  IconButton,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@material-ui/core/';
import { Clear } from '@material-ui/icons';
import { useKanban } from '../../../context';
import useStyles from './useStyles';

interface ConfirmProps {
  id: string;
  isDeleting: boolean;
  closeConfirm: () => void;
}

const ConfirmDelete = ({ id, isDeleting, closeConfirm }: ConfirmProps): JSX.Element => {
  const { removeColumn } = useKanban();
  const classes = useStyles();

  return (
    <Dialog
      maxWidth="md"
      open={isDeleting}
      onClose={closeConfirm}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle disableTypography className={classes.dialog}>
        <Typography variant="h6" className={classes.dialogTitle}>
          {'Are you sure you want to delete this column?'}
        </Typography>
        <IconButton onClick={closeConfirm} className={classes.closeButton}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography id="alert-dialog-description">
          {`Deleting this column also deletes all of its cards. This action can't be reversed in the future.`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          size="large"
          onClick={() => {
            removeColumn(id);
          }}
          color="primary"
        >
          Delete
        </Button>
        <Button onClick={closeConfirm} color="secondary" autoFocus size="large">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDelete;
