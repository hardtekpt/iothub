export const styles = theme => ({
  title: {
    fontSize: "19px",
    color: "rgb(117,117,117)"
  },
  weatherText: {
    fontSize: "12px",
    color: "rgb(117,117,117)"
  },
  temp: {
    fontSize: "70px",
    color: "rgb(117,117,117)",
    margin: 0,
    fontFamily: "Roboto, sans-serif",
    marginTop: "25px"
  },
  icon: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
    marginBottom: "20px",
    width: "50%",
    fontSize: "50px",
    color: theme.palette.primary.main
  },
  wind: {
    fontSize: "10px",
    color: "rgb(107,107,107)",
    margin: 0,
    marginBottom: "5px"
  },
  day: {
    marginTop: "20px"
  },
  max: {
    fontSize: "10px",
    margin: 0
  },
  min: {
    fontSize: "10px",
    margin: 0,
    color: "rgb(107,107,107)"
  },
  lightTooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
});
