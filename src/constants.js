const priceUrl = `https://api.coinbase.com/v2/exchange-rates?currency=`;
const PRECISION = 8;

// Mainnet
// const contractAddresses = {
//   cEthAddress: "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5",
//   daiAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
//   cDaiAddress: "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643",
//   usdtAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
//   cUsdtAddress: "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9",
// };

// Rinkeby
// const contracts = {
//   networkAddress: 4,
//   cEthAddress: "0xd6801a1dffcd0a410336ef88def4320d6df1883e",
//   daiAddress: "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
//   cDaiAddress: "0x6d7f0754ffeb405d23c51ce938289d4835be3b14",
//   usdtAddress: "0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02",
//   cUsdtAddress: "0x2fb298bdbef468638ad6653ff8376575ea41e768",
//   cUsdcAddress: "0x5b281a6dda0b271e91ae35de655ad301c976edb1",
//   usdcAddress: "0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b",
// };

// Ropsten
const contracts = {
  networkAddress: 3,
  cEthAddress: "0xbe839b6d93e3ea47effcca1f27841c917a8794f3",
  daiAddress: "0xc2118d4d90b274016cb7a54c03ef52e6c537d957",
  cDaiAddress: "0xdb5ed4605c11822811a39f94314fdb8f0fb59a2c",
  usdtAddress: "0x516de3a7a567d81737e3a46ec4ff9cfd1fcb0136",
  cUsdtAddress: "0x135669c2dcbd63f639582b313883f101a4497f76",
  cUsdcAddress: "0x8af93cae804cc220d1a608d4fa54d1b6ca5eb361",
  usdcAddress: "0x0d9c8723b343a8368bebe0b5e89273ff8d712e3c",
  batAddress: "0x443fd8d5766169416ae42b8e050fe9422f628419",
  cBatAddress: "0x9e95c0b2412ce50c37a121622308e7a6177f819d",
  zrxAddress: "0xE4C6182EA459E63B8F1be7c428381994CcC2D49c",
  cZrxAddress: "0x00e02a5200ce3d5b5743f5369deb897946c88121",
  wBtcAddress: "0xBde8bB00A7eF67007A96945B3a3621177B615C44",
  cWbtcAddress: "0x58145bc5407d63daf226e4870beeb744c588f149",
};

export {contracts, priceUrl, PRECISION};
