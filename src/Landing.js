import React, {useState, useEffect, useRef} from "react";
import {Box, makeStyles, Paper, Typography} from "@material-ui/core";
import MetaMaskOnboarding from "@metamask/onboarding";
import ConnectionBanner from "@rimble/connection-banner";
import {MetaMaskButton} from "rimble-ui";
import DrizzleLoader from "./DrizzleLoader";
import {contracts} from "./constants";
import Header from "./Header";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: 8,
  },
  onboard: {display: "flex", justifyContent: "center", marginTop: "2rem"},
  intro: {
    textAlign: "center",
    padding: 8,
  },
}));

const ONBOARD_TEXT = "Click here to install MetaMask!";
const CONNECT_TEXT = "Connect";
const CONNECTED_TEXT = "Connected";

const Landing = () => {
  const classes = useStyles();
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    const handleNewAccounts = (newAccounts) => {
      if (newAccounts.length == 0) setAccounts(newAccounts);
    };

    const handleChainChanged = (_chainId) => {
      window.location.reload();
    };

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setButtonText(CONNECT_TEXT);
      setDisabled(false);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      window.ethereum.on("chainChanged", handleChainChanged);
      return () => {
        window.ethereum.off("accountsChanged", handleNewAccounts);
        window.ethereum.off("chainChanged", handleChainChanged);
      };
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({method: "eth_requestAccounts"})
        .then((newAccounts) => setAccounts(newAccounts))
        .catch(() => {
          console.log("user rejected access");
        });
    } else {
      onboarding.current.startOnboarding();
    }
  };

  const showContent = () => {
    if (accounts.length > 0) {
      const netId = parseInt(window.ethereum.networkVersion);
      const requiredNetwork = contracts.networkAddress;
      return (
        <Box className={classes.root}>
          {netId != requiredNetwork ? (
            <ConnectionBanner currentNetwork={netId} requiredNetwork={requiredNetwork} />
          ) : (
            <DrizzleLoader />
          )}
        </Box>
      );
    }
    return (
      <Box className={classes.onboard}>
        <Paper className={classes.intro}>
          <Typography variant="h5" component="h3">
            Welcome to Crypto Bank
          </Typography>
          <Typography component="p">
            Earn interest on your deposits every 15 seconds. FREE deposits and withdrawals.
            <br /> Connect your wallet to get started.
          </Typography>
          <MetaMaskButton disabled={isDisabled} onClick={onClick} mt={4}>
            {buttonText}
          </MetaMaskButton>
        </Paper>
      </Box>
    );
  };

  return (
    <Box>
      <Header />
      {showContent()}
    </Box>
  );
};

export default Landing;
