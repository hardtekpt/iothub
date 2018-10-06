import React, { Component } from "react";

import {
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch
} from "@material-ui/core";
import {
  Wifi as WifiIcon,
  Bluetooth as BluetoothIcon
} from "@material-ui/icons";

export default class SwitchList extends Component {
  state = {
    checked: []
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    return (
      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText primary="Wi-Fi" />
          <ListItemSecondaryAction>
            <Switch
              onChange={this.handleToggle("wifi")}
              checked={this.state.checked.indexOf("wifi") !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BluetoothIcon />
          </ListItemIcon>
          <ListItemText primary="Bluetooth" />
          <ListItemSecondaryAction>
            <Switch
              onChange={this.handleToggle("bluetooth")}
              checked={this.state.checked.indexOf("bluetooth") !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }
}
