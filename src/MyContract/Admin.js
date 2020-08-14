import React, {useEffect, useState} from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {fromWei} from "../utils";
import CreateMarket from "./CreateMarket";

const Admin = ({erc20, cToken}) => {
  const [balanceUnderlying, setUnderlyingBal] = useState(0);
  const {drizzle, useCacheCall} = drizzleReactHooks.useDrizzle();
  const {
    contracts: {MyContract},
  } = drizzle;

  const {state, account} = drizzleReactHooks.useDrizzleState((state) => ({
    account: state.accounts[0],
    state,
  }));

  //const decimals = useCacheCall(erc20.contractName, "decimals");
  //const name = useCacheCall(erc20.contractName, "name");
  const symbol = useCacheCall(cToken.contractName, "symbol");
  const cTokenDeposited = useCacheCall(
    cToken.contractName,
    "balanceOf",
    MyContract.address
  );

  useEffect(() => {
    const getDetails = async () => {
      let result = await cToken.methods
        .balanceOfUnderlying(MyContract.address)
        .call();
      // result = fromWei(result, decimals);
      setUnderlyingBal(result);
    };
    getDetails();
  }, [state.currentBlock]);

  return (
    <div style={{marginRight: "40px"}}>
      {/* <div>CREATE MARKET</div>
      <CreateMarket account={account} /> */}
      <h3>{symbol}</h3>
      <p>{`supplied to compound: ${balanceUnderlying}`}</p>
      <p>Token Balance: {cTokenDeposited}</p>
    </div>
  );
};

export default React.memo(Admin);
