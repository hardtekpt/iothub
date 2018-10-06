import React, { Component, Fragment } from "react";

class DeviceDetails extends Component {
  render() {
    const { token } = this.props.device;
    return <Fragment>{token}</Fragment>;
  }
}

export default DeviceDetails;

// token        blynk v
// board        firmware v
// status       hardwere v
