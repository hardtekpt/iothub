import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { setDrawerState } from "../../actions/drawerActions";
import classNames from "classnames";
import { compose } from "recompose";
import { styles } from "./Styles";
import Sidebar from "./Drawer";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Drawer,
  Hidden,
  SwipeableDrawer
} from "@material-ui/core";
import { Menu as MenuIcon, AccountCircle } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date(),
      anchorEl: null,
      open: this.props.drawer.open,
      mobileOpen: false
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.drawer) this.setState({ open: nextProps.drawer.open });
  }

  // Profile Menu handlers
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleLogoutClick() {
    this.handleClose();
    this.props.logoutUser();
  }
  handleProfileClick() {
    this.handleClose();
    this.props.history.push("/profile");
  }

  // Drawer handlers
  handleDrawerOpen = () => {
    this.setState({ open: true });
    this.props.setDrawerState(true);
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
    this.props.setDrawerState(false);
  };
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const {
      classes,
      children,
      auth: { user }
    } = this.props;

    const { anchorEl, mobileOpen } = this.state;
    const open = Boolean(anchorEl);

    const drawer = (
      <Sidebar mobileOpen={mobileOpen} onClose={this.handleDrawerClose} />
    );

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
          color="primary"
        >
          <Toolbar
            variant="dense"
            disableGutters={!this.state.open}
            className={classes.toolbarDense}
          >
            <Hidden xsDown implementation="css">
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden smUp implementation="css">
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography
              className={classes.flex}
              variant="title"
              color="inherit"
            >
              Dashboard
            </Typography>

            <IconButton
              aria-owns={open ? "menu-appbar" : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
              className={classes.accountBtn}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem
                onClick={this.handleProfileClick}
                className={classes.capitalize}
              >
                {user.username}
              </MenuItem>
              <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Hidden smUp>
          <SwipeableDrawer
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            onOpen={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.handleDrawerToggle}
              onKeyDown={this.handleDrawerToggle}
            >
              {drawer}
            </div>
          </SwipeableDrawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              )
            }}
            open={this.state.open}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  drawer: state.drawer
});

export default compose(
  connect(
    mapStateToProps,
    { logoutUser, setDrawerState }
  ),
  withRouter,
  withStyles(styles, { withTheme: true })
)(Navbar);
