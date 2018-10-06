import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./Styles";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from "@material-ui/core";

class DeleteAccountDialog extends Component {
  constructor() {
    super();
    this.state = {
      currPin: "",
      newPin: "",
      newPin2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleClose = () => {
    this.setState({
      currPin: "",
      newPin: "",
      newPin2: "",
      errors: {}
    });
    this.props.onClose();
  };

  handleChangePin = () => {
    const data = {
      currPin: this.state.currPin,
      newPin: this.state.newPin,
      newPin2: this.state.newPin2
    };
    this.props.onSubmit(data);
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes, open } = this.props;
    const { errors } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change Pin</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogText}>
            Please fill out all the fields to change your login pin.
          </DialogContentText>
          <TextField
            margin="dense"
            id="currPin"
            name="currPin"
            label="Current Pin"
            value={this.state.currPin}
            onChange={this.onChange}
            error={errors.currPin ? true : false}
            helperText={errors.currPin}
            type="number"
            className={classes.formControl}
          />
          <br />
          <TextField
            margin="dense"
            id="newPin"
            name="newPin"
            label="New pin"
            value={this.state.newPin}
            onChange={this.onChange}
            error={errors.newPin ? true : false}
            helperText={errors.newPin}
            type="number"
            className={classes.formControl}
          />
          <br />
          <TextField
            margin="dense"
            id="newPin2"
            name="newPin2"
            label="Confirm new pin"
            value={this.state.newPin2}
            onChange={this.onChange}
            error={errors.newPin2 ? true : false}
            helperText={errors.newPin2}
            type="number"
            className={classes.formControl}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={this.handleChangePin} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(DeleteAccountDialog);
