// Exchange rate from cToken to Token
import Web3 from "web3";
import {get} from "axios";
import {makeStyles} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {priceUrl} from "../constants";

const web3 = new Web3();

const getExchangeRate = (exchangeRate, tokenDecimals) => {
  if (isNaN(exchangeRate) || isNaN(tokenDecimals)) return 0;
  const cTokenDecimals = 8; // all cTokens have 8 decimal places
  const mantissa = 18 + parseInt(tokenDecimals) - cTokenDecimals;
  return exchangeRate / 10 ** mantissa;
};

const calculateApy = (supplyRate) => {
  if (isNaN(supplyRate)) return 0;
  const blocksPerDay = 4 * 60 * 24;
  const daysPerYear = 365;
  const ethMantissa = 10 ** 18;

  const supplyApy =
    (Math.pow((supplyRate / ethMantissa) * blocksPerDay + 1, daysPerYear - 1) - 1) * 100;
  return parseFloat(supplyApy).toFixed(4);
};
const toFixed = (number, digits) => {
  if (isNaN(number)) return 0;
  // evaluate numbers with exponents etc.
  const num = parseFloat(number).toFixed(digits + 1);
  const re = new RegExp("(^-?\\d+\\.\\d{" + digits + "})(\\d)");
  const m = num.toString().match(re);
  return m ? m[1] : num;
};

const toWei = (amount, decimals) => {
  if (isNaN(amount) || isNaN(decimals)) return 0;
  return decimals == 18 ? web3.utils.toWei(amount) : amount * 10 ** decimals;
};

const fromWei = (amount, decimals) => {
  if (isNaN(amount) || isNaN(decimals)) return 0;
  return decimals == 18 ? web3.utils.fromWei(amount) : amount / 10 ** decimals;
};

const getUsdRate = async (symbol) => {
  let ticker = symbol;
  if (symbol == "USDT") {
    ticker = "USDC";
  } else if (symbol == "WBTC") {
    ticker = "BTC";
  }
  return get(priceUrl + ticker)
    .then((price) => {
      return price.data.data.rates["USD"];
    })
    .catch((e) => 0);
};

const useFormStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(1),
    width: "95%",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -5,
    left: -5,
    zIndex: 1,
  },
  rewards: {
    position: "relative",
  },
  rewardProgress: {
    color: green[500],
    position: "absolute",
    top: -3,
    left: 0,
    zIndex: 1,
  },
}));

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const sentenceCase = (str = "") => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
};

export {
  getExchangeRate,
  calculateApy,
  toFixed,
  toWei,
  fromWei,
  getUsdRate,
  useFormStyles,
  isEmpty,
  sentenceCase,
};
