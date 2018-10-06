import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import { loginUser } from "../../actions/authActions";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

import StaticNav from "../layout/StaticNav";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3,
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
      marginTop: theme.spacing.unit * 10,
      marginLeft: theme.spacing.unit * 20,
      marginRight: theme.spacing.unit * 20,
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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      pin: "",
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

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      pin: this.state.pin
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
                Login
              </Typography>
              <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <TextField
                      autoFocus
                      id="pin"
                      name="pin"
                      label="Pin"
                      fullWidth
                      value={this.state.pin}
                      onChange={this.onChange}
                      error={errors.pin ? true : false}
                      helperText={errors.pin}
                      type="number"
                    />
                  </Grid>
                </Grid>
                <div className={classes.buttons}>
                  <IconButton
                    type="submit"
                    className={classes.button}
                    color="inherit"
                    aria-label="Send"
                  >
                    <SendIcon />
                  </IconButton>
                </div>
              </form>
            </Paper>
          </main>
        </Grow>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
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
    { loginUser }
  ),
  withRouter,
  withStyles(styles)
)(Login);
