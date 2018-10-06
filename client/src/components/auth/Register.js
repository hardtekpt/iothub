import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";

import StaticNav from "../layout/StaticNav";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      pin: "",
      pin2: "",
      username: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      pin: this.state.pin,
      pin2: this.state.pin2,
      username: this.state.username
    };

    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <StaticNav />
        <Grow in>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography variant="display1" align="center">
                Register
              </Typography>
              <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <TextField
                      id="name"
                      name="name"
                      margin="normal"
                      label="Full name"
                      fullWidth
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name ? true : false}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      fullWidth
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email ? true : false}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="username"
                      name="username"
                      label="Username"
                      type="text"
                      fullWidth
                      value={this.state.username}
                      onChange={this.onChange}
                      error={errors.username ? true : false}
                      helperText={errors.username}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="pin"
                      name="pin"
                      label="Pin"
                      type="number"
                      margin="normal"
                      fullWidth
                      value={this.state.pin}
                      onChange={this.onChange}
                      error={errors.pin ? true : false}
                      helperText={errors.pin}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="pin2"
                      name="pin2"
                      label="Confirm pin"
                      type="number"
                      margin="normal"
                      fullWidth
                      value={this.state.pin2}
                      onChange={this.onChange}
                      error={errors.pin2 ? true : false}
                      helperText={errors.pin2}
                    />
                  </Grid>
                </Grid>
                <div className={classes.buttons}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Paper>
          </main>
        </Grow>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(withStyles(styles)(Register)));
