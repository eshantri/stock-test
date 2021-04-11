import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 200,
    margin: 10,
    borderRadius: "5%",
    backgroundColor: "rgb(233, 230, 230)",
  },
  content: {
    display: "flex",
  },
  media: {
    height: 60,
    width: 50,
  },
  padding: {
    padding: 20,
  },
});
export default function Cards(props) {
  const classes = useStyles();
  let data = props.data;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent className={classes.content}>
          {" "}
          <Typography
            className={classes.padding}
            variant="h6"
            color="textSecondary"
            component="h6"
          >
            {data.symbol}
          </Typography>
          <img
            alt="icon"
            className={classes.media}
            src={`${process.env.PUBLIC_URL}/static/imgs/${data.symbol}.png`}
          />
        </CardContent>
        <Typography
          className={classes.padding}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {data.close} USD
        </Typography>
      </CardActionArea>
    </Card>
  );
}
