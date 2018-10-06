import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { connect } from "react-redux";

import { Typography } from "@material-ui/core";

// Todo get ip from settings (redux state)
const serverip = "95.95.64.185:8080";

const styles = theme => ({
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class DeviceStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "Waiting",
      refresh: ""
    };
  }

  componentDidMount() {
    this.getStatus();
  }

  componentWillReceiveProps(nextProps) {
    this.getStatus();
  }

  getStatus = () => {
    fetch(`http://${serverip}/${this.props.device.token}/isHardwareConnected`)
      .then(response => response.text())
      .then(data => {
        if (data === "true") {
          this.setState({ data: "Connected" });
        } else if (data === "false") {
          this.setState({ data: "Not connected" });
        } else {
          this.setState({ data: "Invalid token" });
        }
      });
  };

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <Fragment>
        <Typography className={classes.secondaryHeading}>{data}</Typography>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {}
  )
)(DeviceStatus);
