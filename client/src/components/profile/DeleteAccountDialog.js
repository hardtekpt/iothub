import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

class DeleteAccountDialog extends Component {
  handleClose = () => {
    this.props.onClose();
  };

  handleDelete = () => {
    this.props.onDelete();
  };

  render() {
    const { open } = this.props;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="confirm-delete"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="confirm-delete">{"Delete confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account. This action will
            delete all your info and cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={this.handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeleteAccountDialog;
