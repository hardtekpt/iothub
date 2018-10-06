import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./Styles";
import { Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { getForecast } from "../../actions/weatherActions";
import { compose } from "recompose";

import Navbar from "../layout/Navbar";
import SwitchList from "./widgets/SwitchList";
import Weather from "./widgets/Weather";
import Masonry from "react-masonry-css";

import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakpointColumnsObj: {
        default: 4,
        1919: 4,
        1279: 3,
        959: 2,
        605: 1
      },
      drawerState: this.props.drawer.open
    };
  }

  componentWillReceiveProps(nextProps) {
    let state = nextProps.drawer.open;
    this.setState({
      breakpointColumnsObj: {
        default: 4,
        [1919 + (state ? 168 : 0)]: 4,
        [1279 + (state ? 168 : 0)]: 3,
        [959 + (state ? 168 : 0)]: 2,
        [605 + (state ? 168 : 0)]: 1
      }
    });
    setTimeout(() => {
      this.setState({
        breakpointColumnsObj: {
          default: 4,
          [1919 + (state ? 168 : 0)]: 4,
          [1279 + (state ? 168 : 0)]: 3,
          [959 + (state ? 168 : 0)]: 2,
          [605 + (state ? 168 : 0)]: 1
        }
      });
    }, 10);
  }

  componentWillMount = () => {
    this.props.getForecast();
  };

  render() {
    const {
      classes,
      auth: { socket }
    } = this.props;
    const { breakpointColumnsObj } = this.state;

    socket.on("connect", function() {
      console.log("connected to server (ws)");
      socket.emit("message", "teste");
    });

    return (
      <Navbar>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          <Paper className={classes.paper}>
            <SwitchList socket={socket} />
          </Paper>
          <Paper className={classes.paper}>
            <Weather />
          </Paper>
        </Masonry>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  drawer: state.drawer
});

export default compose(
  connect(
    mapStateToProps,
    { getForecast }
  ),
  withStyles(styles)
)(Dashboard);
