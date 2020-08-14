import React from "react";
import {Card, CardHeader, CardActions, makeStyles, Typography} from "@material-ui/core";
import Money from "@material-ui/icons/AttachMoney";
import {toFixed} from "./utils";
import {PRECISION} from "./constants";

const useStyles = makeStyles(() => ({
  controls: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
  },
}));

const TokenDeposit = ({symbol, totalBalance, usdRate, children}) => {
  const classes = useStyles();
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Money style={{color: "green", fontSize: "60px"}} />}
        title={
          <div>
            <Typography variant="h6">Invested</Typography>
            <Typography variant="h5">{toFixed(totalBalance * usdRate, PRECISION)}</Typography>
          </div>
        }
        subheader={
          <Typography color="textSecondary">
            {totalBalance} {symbol}
          </Typography>
        }
      />
      <CardActions className={classes.controls} disableSpacing>
        {children}
      </CardActions>
    </Card>
  );
};

export default React.memo(TokenDeposit);
