import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "recompose";
import { removeDevice } from "../../actions/settingsActions";

import DeviceDetails from "./DeviceDetails";
import DeviceStatus from "./DeviceStatus";

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  Typography,
  Divider,
  Button
} from "@material-ui/core";
import {
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "70%"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class DeviceTable extends Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleRemoveDevice = id => {
    this.props.removeDevice(id);
  };

  render() {
    const { classes, devices } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        {devices.map(device => (
          <ExpansionPanel
            expanded={expanded === device._id}
            onChange={this.handleChange(device._id)}
            key={device._id}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{device.name}</Typography>
              <DeviceStatus device={device} />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <DeviceDetails device={device} />
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button size="small" onClick={this.handleChange(device._id)}>
                Close
              </Button>
              <Button
                key={device._id}
                className={classes.button}
                aria-label="Delete"
                onClick={this.handleRemoveDevice.bind(this, device._id)}
                color="secondary"
              >
                Delete
                <DeleteIcon className={classes.rightIcon} />
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default compose(
  connect(
    null,
    { removeDevice }
  ),
  withStyles(styles)
)(DeviceTable);
