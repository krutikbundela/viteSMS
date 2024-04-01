import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmationModal = ({ open, handleClose, handleConfirm, message }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleConfirm} color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
