import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { addDevice, getSettings } from "../../actions/settingsActions";

import {
  LinearProgress,
  Chip,
  Avatar,
  Button,
  Zoom,
  Typography,
  Grid,
  Snackbar
} from "@material-ui/core";
import { Add as AddIcon, Refresh as RefreshIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import Navbar from "../layout/Navbar";
import DeviceTable from "./DeviceTable";
import AddDeviceDialog from "./AddDeviceDialog";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  button: {
    margin: theme.spacing.unit,
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 1
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  refresh: {
    margin: theme.spacing.unit,
    justifyContent: "flex-end"
  }
});

class Devices extends Component {
  constructor() {
    super();
    this.state = {
      addDeviceOpen: false,
      errors: {},
      snackbarOpen: false,
      msg: ""
    };
  }

  componentDidMount = () => {
    this.props.getSettings();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });

      if (nextProps.errors.success) {
        this.handleAddDeviceClose();
        this.setState({ snackbarOpen: true, msg: nextProps.errors.success });
      }
    }
  }

  handleChipClick = () => {
    this.props.getSettings();
  };

  handleAddDevice = newDevice => {
    this.props.addDevice(newDevice);
  };

  handleAddDeviceOpen = () => {
    this.setState({ addDeviceOpen: true });
  };

  handleAddDeviceClose = () => {
    this.setState({ addDeviceOpen: false, errors: {} });
  };

  // Snackbar handler
  handleSnackBarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    const { settings } = this.props.settings;
    const { classes } = this.props;
    const { addDeviceOpen, errors, snackbarOpen, msg } = this.state;

    let content;

    if (settings === undefined) {
      content = <LinearProgress style={{ margin: "auto" }} />;
    } else {
      content = (
        <Fragment>
          <Typography variant="display2" gutterBottom>
            Devices
          </Typography>
          <Grid container alignContent="space-between" justify="space-between">
            <Grid item>
              <Chip
                avatar={<Avatar>{settings.devices.length}</Avatar>}
                label="Total devices"
                color="primary"
                style={{ marginBottom: "20px" }}
                onDelete={this.handleChipClick}
                deleteIcon={<RefreshIcon />}
              />
            </Grid>
            <Grid item>
              <Typography variant="subheading">Server: 192.168.1.3</Typography>
            </Grid>
          </Grid>
          <DeviceTable devices={settings.devices} />
          <Zoom in>
            <Button
              variant="extendedFab"
              aria-label="Delete"
              className={classes.button}
              color="secondary"
              onClick={this.handleAddDeviceOpen}
            >
              <AddIcon className={classes.extendedIcon} />
              Add Device
            </Button>
          </Zoom>
        </Fragment>
      );
    }
    return (
      <Navbar>
        {content}
        <AddDeviceDialog
          onSubmit={this.handleAddDevice}
          open={addDeviceOpen}
          onClose={this.handleAddDeviceClose}
          errors={errors}
        />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackbarOpen}
          onClose={this.handleSnackBarClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{msg}</span>}
          autoHideDuration={2000}
        />
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
  errors: state.errors
});

export default compose(
  connect(
    mapStateToProps,
    { addDevice, getSettings }
  ),
  withStyles(styles)
)(Devices);
