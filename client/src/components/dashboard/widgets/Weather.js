import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./Styles";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Typography, Grid, Tooltip, LinearProgress } from "@material-ui/core";
import isEmpty from "../../../utils/is-empty";
import WeatherIcon from "react-icons-weather";

class Weather extends Component {
  render() {
    const { classes } = this.props;
    const { weather, loading } = this.props.weather;
    let content;

    if (isEmpty(weather) || loading) {
      content = (
        <Fragment>
          <Typography variant="display1" className={classes.title} gutterBottom>
            Benfica, Lisboa
          </Typography>
          <LinearProgress color="secondary" />
        </Fragment>
      );
    } else {
      content = (
        <Fragment>
          <Typography variant="display1" className={classes.title} gutterBottom>
            Benfica, Lisboa
          </Typography>
          <Typography variant="caption" className={classes.weatherText}>
            {weather.condition.text}
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <WeatherIcon
                name="yahoo"
                iconId={weather.condition.code}
                className={classes.icon}
              />
              <Typography
                variant="caption"
                className={classes.wind}
                gutterBottom
              >
                {`Vento: ${weather.wind.speed}km/h com direção ${
                  weather.wind.direction
                }`}
              </Typography>
              <Typography
                variant="caption"
                className={classes.wind}
                gutterBottom
              >
                {`Humidade: ${weather.atmosphere.humidity}% e visibilidade: ${
                  weather.atmosphere.visibility
                }m`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="display4"
                align="center"
                className={classes.temp}
              >{`${weather.condition.temp}º`}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            {weather.forecast.map(weather => (
              <Grid item xs={3} key={weather.day}>
                <Tooltip
                  title={weather.text}
                  classes={{ tooltip: classes.lightTooltip }}
                  placement="top"
                >
                  <Typography
                    align="center"
                    variant="subheading"
                    className={classes.day}
                    gutterBottom
                    color="secondary"
                  >
                    {weather.day}
                  </Typography>
                </Tooltip>
                <Typography
                  align="center"
                  variant="subheading"
                  className={classes.max}
                >
                  {weather.high}
                </Typography>
                <Typography
                  align="center"
                  variant="subheading"
                  className={classes.min}
                >
                  {weather.low}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Fragment>
      );
    }

    return <div>{content}</div>;
  }
}

Weather.propTypes = {
  weather: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  weather: state.weather
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Weather);
