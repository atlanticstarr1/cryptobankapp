import React, {useState} from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {toWei, useFormStyles} from "./utils";
import {CircularProgress, InputAdornment, Fab, IconButton, TextField} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const TokenSupply = ({erc20, erc20Token, cAddress, account, balance}) => {
  const {drizzle} = drizzleReactHooks.useDrizzle();
  const [supply, setSupply] = useState("");
  const [loading, setLoading] = useState(false);

  const {address, decimals, symbol} = erc20Token;
  const classes = useFormStyles();
  const {
    contracts: {MyContract},
  } = drizzle;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const amount = toWei(supply, decimals);
      if (symbol === "ETH") {
        const gas = await MyContract.methods
          .mintEth(cAddress)
          .estimateGas({from: account, value: amount});
        await MyContract.methods.mintEth(cAddress).send({from: account, value: amount, gas});
      } else {
        await erc20.methods.approve(MyContract.address, amount).send({from: account});
        //const gas = await MyContract.methods.mint(amount, address, cAddress).estimateGas();
        await MyContract.methods.mint(amount, erc20.address, cAddress).send({from: account});
      }
    } catch (e) {
      console.log("ENCOUNTERED ERROR", e);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    setSupply(e.target.value);
  };

  const setMax = () => {
    setSupply(balance);
  };

  const shouldDisable = balance === 0 || loading;

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <TextField
        id="deposit"
        label="Deposit"
        type="number"
        fullWidth
        disabled={shouldDisable}
        value={supply}
        required
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
        <Fab color="primary" type="submit" size="small" disabled={shouldDisable}>
          <AddIcon />
        </Fab>
        {loading && <CircularProgress size={50} className={classes.fabProgress} />}
      </div>
    </form>
  );
};

export default TokenSupply;
