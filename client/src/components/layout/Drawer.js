import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./Styles";

import {
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import {
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Airplay as AirplayIcon,
  Devices as DevicesIcon,
  AccessAlarm as AccessAlarmIcon,
  Note as NoteIcon,
  Cloud as CloudIcon,
  Settings as SettingsIcon,
  AccountBox as AccountBoxIcon,
  Dns as DnsIcon
} from "@material-ui/icons";

class Sidebar extends Component {
  render() {
    const { onClose, classes } = this.props;
    return (
      <Fragment>
        {false ? null : (
          <div className={classes.toolbar}>
            <IconButton onClick={onClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        )}
        <Divider />
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/devices">
            <ListItemIcon>
              <DevicesIcon />
            </ListItemIcon>
            <ListItemText primary="Devices" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AirplayIcon />
            </ListItemIcon>
            <ListItemText primary="Media Player" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <NoteIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CloudIcon />
            </ListItemIcon>
            <ListItemText primary="Cloud" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccessAlarmIcon />
            </ListItemIcon>
            <ListItemText primary="Alarm" />
          </ListItem>
        </List>
        <Divider />
        <List
          subheader={
            <ListSubheader className={classes.listSubheader} component="div">
              Configurations
            </ListSubheader>
          }
        >
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DnsIcon />
            </ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItem>
        </List>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Sidebar);
