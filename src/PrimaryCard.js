import React from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {Grid, makeStyles} from "@material-ui/core";
import {contracts} from "./constants";
import Token from "./Token";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const {
  cEthAddress,
  cDaiAddress,
  cUsdtAddress,
  cUsdcAddress,
  cBatAddress,
  cZrxAddress,
  cWbtcAddress,
} = contracts;

const PrimaryCard = () => {
  const {drizzle} = drizzleReactHooks.useDrizzle();
  const classes = useStyles();

  const {
    contracts: {Dai, Usdt, Usdc, Bat, Zrx, Wbtc},
  } = drizzle;

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item>
          <Token erc20={{}} cAddress={cEthAddress} />
        </Grid>
        <Grid item>
          <Token erc20={Dai} cAddress={cDaiAddress} />
        </Grid>
        <Grid item>
          <Token erc20={Usdt} cAddress={cUsdtAddress} />
        </Grid>
        <Grid item>
          <Token erc20={Usdc} cAddress={cUsdcAddress} />
        </Grid>
        <Grid item>
          <Token erc20={Wbtc} cAddress={cWbtcAddress} />
        </Grid>
        <Grid item>
          <Token erc20={Bat} cAddress={cBatAddress} />
        </Grid>
        <Grid item>
          <Token erc20={Zrx} cAddress={cZrxAddress} />
        </Grid>
      </Grid>
    </div>
  );
};

export default PrimaryCard;
