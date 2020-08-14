import React, {useState} from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {CircularProgress, IconButton, InputAdornment, Fab, TextField} from "@material-ui/core";
import {Remove, Redeem} from "@material-ui/icons";
import {toWei, useFormStyles} from "./utils";

const TokenRedeem = ({erc20Token, cAddress, account, balance, earningsOnly}) => {
  const {drizzle} = drizzleReactHooks.useDrizzle();
  const [redeem, setRedeem] = useState("");
  const [loading, setLoading] = useState(false);

  const {address, decimals, symbol} = erc20Token;
  const {
    contracts: {MyContract},
  } = drizzle;
  const classes = useFormStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const amount = earningsOnly ? toWei(balance, decimals) : toWei(redeem, decimals);
      if (symbol == "ETH") {
        const gas = await MyContract.methods.redeemUnderlyingEth(amount, cAddress).estimateGas();
        await MyContract.methods.redeemUnderlyingEth(amount, cAddress).send({from: account, gas});
      } else {
        const gas = await MyContract.methods
          .redeemUnderlying(amount, address, cAddress)
          .estimateGas();
        await MyContract.methods
          .redeemUnderlying(amount, address, cAddress)
          .send({from: account, gas});
      }
    } catch (e) {
      console.log("ENCOUNTERED ERROR", e);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    setRedeem(e.target.value);
  };

  const setMax = () => {
    setRedeem(balance);
  };

  const shouldDisable = balance == 0 || loading;

  if (earningsOnly) {
    return (
      <div className={classes.rewards}>
        <IconButton
          onClick={handleSubmit}
          size="small"
          style={{padding: "0 0 2px 5px", marginBottom: "auto"}}
          disabled={shouldDisable}
        >
          <Redeem color="secondary" />
        </IconButton>
        {loading && <CircularProgress size={32} className={classes.rewardProgress} />}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <TextField
        id="withdraw"
        label="Withdraw"
        type="number"
        value={redeem}
        required
        fullWidth
        disabled={shouldDisable}
        onChange={handleInput}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        margin="dense"
        inputProps={{
          max: balance,
          step: 1e-8,
          min: 1e-8,
          style: {fontSize: 22},
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">{symbol}</InputAdornment>,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={setMax} size="small" disabled={shouldDisable}>
                all
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className={classes.wrapper}>
        <Fab color="secondary" type="submit" size="small" disabled={shouldDisable}>
          <Remove />
        </Fab>
        {loading && <CircularProgress size={50} className={classes.fabProgress} />}
      </div>
    </form>
  );
};

export default TokenRedeem;
