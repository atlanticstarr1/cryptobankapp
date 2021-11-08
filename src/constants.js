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
// const contracts = {
//   networkAddress: 3,
//   cEthAddress: "0xbe839b6d93e3ea47effcca1f27841c917a8794f3",
//   daiAddress: "0xc2118d4d90b274016cb7a54c03ef52e6c537d957",
//   cDaiAddress: "0xdb5ed4605c11822811a39f94314fdb8f0fb59a2c",
//   usdtAddress: "0x516de3a7a567d81737e3a46ec4ff9cfd1fcb0136",
//   cUsdtAddress: "0x135669c2dcbd63f639582b313883f101a4497f76",
//   cUsdcAddress: "0x8af93cae804cc220d1a608d4fa54d1b6ca5eb361",
//   usdcAddress: "0x0d9c8723b343a8368bebe0b5e89273ff8d712e3c",
//   batAddress: "0x443fd8d5766169416ae42b8e050fe9422f628419",
//   cBatAddress: "0x9e95c0b2412ce50c37a121622308e7a6177f819d",
//   zrxAddress: "0xE4C6182EA459E63B8F1be7c428381994CcC2D49c",
//   cZrxAddress: "0x00e02a5200ce3d5b5743f5369deb897946c88121",
//   wBtcAddress: "0xBde8bB00A7eF67007A96945B3a3621177B615C44",
//   cWbtcAddress: "0x58145bc5407d63daf226e4870beeb744c588f149",
// };

// Iota
const contracts = {
  networkAddress: 1074,
  cEthAddress: "0xCAa044679c075AA25242FfcCf4d237Cc1e0CAb9C",
  daiAddress: "0x1C98fA2483E037687fe4DdF65d0e8A11aB60Dbe2",
  cDaiAddress: "0xB48142B2F10913A8Eefe360eC469d3c3011D510C",
  usdtAddress: "0x6bAC9f2870F79a7D4Dc0d2973947f3762f80b73e",
  cUsdtAddress: "0xa399bc25bB452624c9248a95B6e29A8cB9D19795",
  cUsdcAddress: "0x7208b8ee8db310dde366cf2668EDCD2754172066",
  usdcAddress: "0xCdaD6F32c4c623a7e16519435d3F8962E6519426",
  batAddress: "0x4E1d337e0A3c31633FBcc1EDb76856014978C5f3",
  cBatAddress: "0x028BdF4267a64D87D872919Ef52fD0c3F01F9e79",
  zrxAddress: "0xAf68c12c3B7ccA7991F7f88CD47c0C16Ea2Ef289",
  cZrxAddress: "0xC58b40793465Ee20463D6B85DFe8a6A634B44470",
  wBtcAddress: "0xF8b358FE81d5b32E5eF12D96003958c81b22e9F9",
  cWbtcAddress: "0xa39f7C3440aE778A2e41631280f5Ae4894A4d6A4",
};

export {contracts, priceUrl, PRECISION};
