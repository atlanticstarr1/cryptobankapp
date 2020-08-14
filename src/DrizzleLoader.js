import React from "react";
import {Drizzle} from "@drizzle/store";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import drizzleOptions from "./drizzleOptions";
import PrimaryCard from "./PrimaryCard";
import {CircularProgress} from "@material-ui/core";

function DrizzleLoader() {
  const drizzle = new Drizzle(drizzleOptions);
  const {DrizzleProvider, Initializer} = drizzleReactHooks;
  return (
    <DrizzleProvider drizzle={drizzle}>
      <Initializer
        loadingWeb3={<CircularProgress size={60} />}
        loadingContractsAndAccounts={<CircularProgress size={60} />}
      >
        <PrimaryCard />
      </Initializer>
    </DrizzleProvider>
  );
}

export default DrizzleLoader;
