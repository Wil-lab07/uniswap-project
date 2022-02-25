require("@nomiclabs/hardhat-waffle");
require('dotenv/config')

module.exports = {
  defaultNetwork: "ropsten",
  solidity: "0.8.0",
  networks: {
    hardhat: {},
    ropsten: {
      url: process.env.DEV_API_URL,
      accounts: [`${process.env.PRIVATE_KEY}`]
    }
  },
}
