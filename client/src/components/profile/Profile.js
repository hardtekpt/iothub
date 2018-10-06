import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";

import { deleteAccount, changePin } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import { styles } from "./Styles";

import {
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Snackbar,
  Fade
} from "@material-ui/core";
import {
  Email as EmailIcon,
  Person as PersonIcon,
  DeleteForever as DeleteIcon,
  Edit as EditIcon
} from "@material-ui/icons";
import DeleteAccountDialog from "./DeleteAccountDialog";
import ChangePinDialog from "./ChangePinDialog";

const typographyProps = {
  color: "inherit"
};

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      deleteOpen: false,
      changePinOpen: false,
      errors: {},
      snackbarOpen: false,
      loading: true
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.errors.success) {
      this.handleChangePinClose();
      this.setState({ snackbarOpen: true });
    }
  }

  // Delete account handlers
  handleDeleteOpen = () => {
    this.setState({ deleteOpen: true });
  };

  handleDeleteClose = () => {
    this.setState({ deleteOpen: false });
  };

  handleDelete = () => {
    this.handleDeleteClose();
    this.props.deleteAccount();
  };

  // Change pin handlers
  handleChangePinOpen = () => {
    this.setState({ changePinOpen: true });
  };

  handleChangePinClose = () => {
    this.setState({ changePinOpen: false, errors: {} });
  };

  handleChangePin = data => {
    this.props.changePin(data);
  };

  // Snackbar handler
  handleSnackBarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    const {
      auth: { user },
      classes
    } = this.props;

    const {
      errors,
      snackbarOpen,
      deleteOpen,
      changePinOpen,
      loading
    } = this.state;

    return (
      <Navbar>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="display2">
              My Profile
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Fade in={!loading}>
              <Paper className={classes.paper}>
                <Typography variant="headline" color="inherit" gutterBottom>
                  {user.name}
                </Typography>
                <Divider className={classes.text} />
                <List>
                  <ListItem>
                    <ListItemIcon className={classes.text}>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={typographyProps}
                      primary={user.username}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon className={classes.text}>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={typographyProps}
                      primary={user.email}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Fade>
          </Grid>
          <Grid item xs={12} sm={4} md={6} />
          <Grid item xs={12} sm={8} md={6}>
            <Fade in={!loading}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.handleDeleteOpen}
              >
                Delete Account
                <DeleteIcon className={classes.rightIcon} />
              </Button>
            </Fade>
            <Fade in={!loading}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttons}
                onClick={this.handleChangePinOpen}
              >
                Change Pin
                <EditIcon className={classes.rightIcon} />
              </Button>
            </Fade>
          </Grid>
        </Grid>

        <DeleteAccountDialog
          open={deleteOpen}
          onClose={this.handleDeleteClose}
          onDelete={this.handleDelete}
        />

        <ChangePinDialog
          open={changePinOpen}
          onClose={this.handleChangePinClose}
          onSubmit={this.handleChangePin}
          errors={errors}
        />

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackbarOpen}
          onClose={this.handleSnackBarClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              {errors.success || "Pin updated with success"}
            </span>
          }
          autoHideDuration={2000}
        />
      </Navbar>
    );
  }
}

Profile.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  changePin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default compose(
  connect(
    mapStateToProps,
    { deleteAccount, changePin }
  ),
  withStyles(styles)
)(Profile);
