require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/fe615a739b56483f84597cd983434259",
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY]
          : [
              "",
            ],
      chainId: 1,
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/fe615a739b56483f84597cd983434259",
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY]
          : [
              "",
            ],
      chainId: 4,
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "3YFRE3PXWHGPY8VSQDNCQVB4HM3V9VUHHM",
  },
};
