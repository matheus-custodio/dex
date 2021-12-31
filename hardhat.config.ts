import { HardhatUserConfig } from 'hardhat/types';
import 'tsconfig-paths/register';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import 'solidity-coverage';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: '0.8.4',
  paths: {
    artifacts: 'src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  /*
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      token: 'BNB',
      gasPriceApi: 'Binance',
    },
  }, */
};

export default config;
