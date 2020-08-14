import React, {useEffect, useState} from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {makeStyles} from "@material-ui/core/styles";
import {Card, Collapse, IconButton, Typography} from "@material-ui/core";
import {ExpandMore, ExpandLess} from "@material-ui/icons";
import {calculateApy, toFixed, fromWei, getUsdRate, isEmpty} from "./utils";
import TokenWallet from "./TokenWallet";
import TokenEarnings from "./TokenEarnings";
import TokenDeposit from "./TokenDeposit";
import TokenSupply from "./TokenSupply";
import TokenRedeem from "./TokenRedeem";
import {PRECISION} from "./constants";

const useStyles = makeStyles(() => ({
  root: {
    width: 383,
    //minWidth: 330,
    maxWidth: 400,
  },
  actions: {
    padding: "0 0 0 1rem",
    display: "flex",
    alignItems: "center",
  },
}));

const Token = ({erc20, cAddress}) => {
  const classes = useStyles();
  const {drizzle} = drizzleReactHooks.useDrizzle();
  const {account, currentBlock} = drizzleReactHooks.useDrizzleState((state) => ({
    account: state.accounts[0],
    currentBlock: state.currentBlock,
  }));
  const [expanded, setExpanded] = useState(false);

  const {
    contracts: {MyContract},
    web3,
  } = drizzle;

  const [erc20Token, setErc20Token] = useState({
    name: "",
    symbol: "",
    decimals: 18,
    address: erc20.address,
  });

  useEffect(() => {
    console.log("USE EFFECT 1");
    const getErc20Token = async () => {
      if (!isEmpty(erc20)) {
        const name = await erc20.methods.name().call();
        const symbol = await erc20.methods.symbol().call();
        const decimals = await erc20.methods.decimals().call();
        setErc20Token({...erc20Token, name, symbol, decimals});
      } else {
        setErc20Token({...erc20Token, name: "Ether", symbol: "ETH"});
      }
    };
    getErc20Token();
  }, []);

  const [asset, setAsset] = useState({
    apy: 0,
    pastEarnings: 0,
    currentEarnings: 0,
    totalBalance: 0,
    walletBalance: 0,
    usdRate: 0,
  });

  useEffect(() => {
    console.log("USE EFFECT 2");
    const getTokenDetails = async () => {
      const {decimals, symbol} = erc20Token;
      let balances, pastEarnings, apy, walletBalance;
      if (symbol != "ETH") {
        balances = await MyContract.methods.balances(cAddress).call();
        pastEarnings = await MyContract.methods.pastEarnings(cAddress).call();
        apy = await MyContract.methods.supplyRatePerBlock(cAddress).call();
        walletBalance = await erc20.methods.balanceOf(account).call();
      } else {
        balances = await MyContract.methods.balancesEth(cAddress).call();
        pastEarnings = await MyContract.methods.pastEarnings(cAddress).call();
        apy = await MyContract.methods.supplyRatePerBlockEth(cAddress).call();
        walletBalance = await web3.eth.getBalance(account);
      }
      const usdRate = await getUsdRate(symbol);
      let {totalBalance, currentEarnings} = balances;
      totalBalance = toFixed(fromWei(totalBalance, decimals), PRECISION);
      currentEarnings = toFixed(fromWei(currentEarnings, decimals), PRECISION);
      pastEarnings = toFixed(fromWei(pastEarnings, decimals), PRECISION);
      walletBalance = toFixed(fromWei(walletBalance, decimals), PRECISION);
      apy = calculateApy(apy);

      setAsset({
        ...asset,
        apy,
        pastEarnings,
        currentEarnings,
        totalBalance,
        walletBalance,
        usdRate,
      });
    };
    if (erc20Token.name) getTokenDetails();
  }, [currentBlock, erc20Token, account]);

  return (
    <Card className={classes.root}>
      <TokenWallet
        apy={asset.apy}
        usdRate={asset.usdRate}
        balance={asset.walletBalance}
        erc20Token={erc20Token}
      />
      <div className={classes.actions}>
        <Typography variant="subtitle1">Earnings/Deposits</Typography>
        <IconButton onClick={() => setExpanded(!expanded)}>
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <>
          <TokenDeposit
            symbol={erc20Token.symbol}
            totalBalance={asset.totalBalance}
            usdRate={asset.usdRate}
          >
            <TokenSupply
              erc20={erc20}
              erc20Token={erc20Token}
              cAddress={cAddress}
              account={account}
              balance={asset.walletBalance}
            />
            <TokenRedeem
              erc20Token={erc20Token}
              cAddress={cAddress}
              account={account}
              balance={asset.totalBalance}
              earningsOnly={false}
            />
          </TokenDeposit>
          <TokenEarnings
            symbol={erc20Token.symbol}
            pastEarnings={asset.pastEarnings}
            currentEarnings={asset.currentEarnings}
            usdRate={asset.usdRate}
          >
            <TokenRedeem
              erc20Token={erc20Token}
              cAddress={cAddress}
              account={account}
              balance={asset.currentEarnings}
              earningsOnly={true}
            />
          </TokenEarnings>
        </>
      </Collapse>
    </Card>
  );
};

export default React.memo(Token);
