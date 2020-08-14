import React from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import Eth from "./Eth";
import Admin from "./Admin";

const MyContractDetails = () => {
  const {drizzle} = drizzleReactHooks.useDrizzle();
  const {
    contracts: {cDai, Dai, cUsdt, Usdt, cEth},
  } = drizzle;
  return (
    <div>
      {/* <Eth /> */}
      <Admin erc20={Dai} cToken={cDai} />
      <Admin erc20={null} cToken={cEth} />
    </div>
  );
};

export default MyContractDetails;
