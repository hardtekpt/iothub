import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -20
  }
};

class StaticNav extends Component {
  // Dashboard text click handler
  onHomeClick() {
    this.props.history.push("/");
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar variant="dense">
            <IconButton
              component={Link}
              to="/"
              className={classes.menuButton}
              color="inherit"
              aria-label="Dashboard"
            >
              <DashboardIcon />
            </IconButton>
            <Typography
              style={{ cursor: "pointer" }}
              className={classes.flex}
              variant="title"
              color="inherit"
              onClick={this.onHomeClick.bind(this)}
            >
              Dashboard
            </Typography>

            <Button component={Link} to="/register" color="inherit">
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(StaticNav));
