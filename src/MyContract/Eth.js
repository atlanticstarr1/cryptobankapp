import React, { useEffect, useState } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";

const Eth = () => {
  const [balanceUnderlying, setUnderlyingBal] = useState(0);
  const [balanceCtoken, setCtokenBal] = useState(0);
  const { drizzle } = drizzleReactHooks.useDrizzle();

  const {
    contracts: { cEth, MyContract },
  } = drizzle;

  const { state } = drizzleReactHooks.useDrizzleState((state) => ({
    state,
  }));

  useEffect(() => {
    const getDetails = async () => {
      console.log("MYCONTRACT DAI");
      const { address } = MyContract.options;
      let result = await cEth.methods.balanceOfUnderlying(address).call();
      setUnderlyingBal(result);

      result = await cEth.methods.balanceOf(address).call();
      setCtokenBal(result);
    };
    getDetails();
  }, [state]);

  return (
    <div style={{ marginRight: "50px" }}>
      <h5>ETH</h5>
      <p>ETH supplied to Compound: {balanceUnderlying / 1e18}</p>
      <p>cETH Token Balance: {balanceCtoken / 1e8}</p>
    </div>
  );
};

export default Eth;
