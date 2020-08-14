import React, { useState } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";

const CreateMarket = ({ account }) => {
  const [erc20, setErc20] = useState("");
  const [cErc20, setCerc20] = useState("");

  const { drizzle } = drizzleReactHooks.useDrizzle();
  const {
    contracts: { MyContract },
  } = drizzle;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await MyContract.methods.createMarket(erc20, cErc20).send({
      from: account,
    });
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="enter Erc20 address"
        value={erc20}
        required
        onChange={(e) => setErc20(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter CErc20 address"
        value={cErc20}
        required
        onChange={(e) => setCerc20(e.target.value)}
      />
      <button type="submit">Create Market</button>
    </form>
  );
};

export default CreateMarket;
