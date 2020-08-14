import React from "react";
import {Avatar, Badge, CardHeader, Card, makeStyles, Typography} from "@material-ui/core";
import {toFixed, sentenceCase} from "./utils";
import {Icon} from "rimble-ui";
import wbtc from "./assets/wbtc.svg";
import usdc from "./assets/usdc.svg";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  avatar: {
    height: "80px",
    width: "80px",
    textAlign: "center",
    color: "#f50057",
    backgroundColor: "transparent",
    //border: "1px solid crimson",
  },
}));

const TokenWallet = ({apy, usdRate, balance, erc20Token}) => {
  const classes = useStyles();
  const {symbol, name} = erc20Token;
  const usdPrice = toFixed(balance * usdRate, 6);
  let iconName = sentenceCase(symbol);

  const tokenIcon = () => {
    switch (iconName) {
      case "Wbtc":
        return <img src={wbtc} width={60} />;
      case "Usdc":
        return <img src={usdc} width={60} />;
      default:
        return <Icon name={iconName} size="60" />;
    }
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Badge
            showZero
            color="secondary"
            badgeContent={<Typography variant="h6">{apy}%</Typography>}
          >
            <Avatar className={classes.avatar}>{tokenIcon()}</Avatar>
          </Badge>
        }
        title={
          <div style={{marginLeft: "50px"}}>
            <Typography variant="h6" component="h2">
              {name}
            </Typography>
            <Typography variant="h5">${usdPrice}</Typography>
          </div>
        }
        subheader={
          <Typography color="textSecondary" style={{marginLeft: "50px"}}>
            {balance} {symbol}
          </Typography>
        }
      />
    </Card>
  );
};

export default React.memo(TokenWallet);
