import React from "react";
import {Card, CardContent, makeStyles, Typography} from "@material-ui/core";
import {toFixed} from "./utils";
import {PRECISION} from "./constants";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
}));

const TokenEarnings = ({symbol, pastEarnings, currentEarnings, usdRate, children}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className={classes.root}>
          <Typography color="primary" variant="h6">
            Rewards
          </Typography>
          {currentEarnings > 0 && children}
        </div>
        <Typography variant="h6">${toFixed(currentEarnings * usdRate, PRECISION)}</Typography>
        <Typography color="textSecondary">{`${currentEarnings} ${symbol}`}</Typography>
      </CardContent>
      <CardContent>
        <Typography color="primary" variant="h6">
          Lifetime
        </Typography>
        <Typography variant="h6" color="textSecondary">
          ${toFixed(pastEarnings * usdRate, PRECISION)}
        </Typography>
        <Typography color="textSecondary">
          {pastEarnings} {symbol}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default React.memo(TokenEarnings);
