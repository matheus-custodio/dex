/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-undef */
import { task } from 'hardhat/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  accounts.forEach(accounts.entries);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: '0.8.4',
  paths: {
    artifacts: 'src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};
