import React, { Component } from "react";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Slide
} from "@material-ui/core";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddDeviceDialog extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      token: "",
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
      name: "",
      token: "",
      errors: {}
    });
    this.props.onClose();
  };

  handleAddDevice = () => {
    const data = {
      name: this.state.name,
      token: this.state.token
    };
    this.props.onSubmit(data);
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { open, fullScreen } = this.props;
    const { errors } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        fullScreen={fullScreen}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="form-dialog-title">Add Device</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out all the fields to add a new device
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Device name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name ? true : false}
            helperText={errors.name}
            type="text"
            fullWidth
          />
          <br />
          <TextField
            margin="dense"
            id="token"
            name="token"
            label="Token"
            value={this.state.token}
            onChange={this.onChange}
            error={errors.token ? true : false}
            helperText={errors.token}
            type="text"
            fullWidth
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={this.handleAddDevice} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog({ breakpoint: "xs" })(AddDeviceDialog);
