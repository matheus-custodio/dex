import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import { HardhatUserConfig } from 'hardhat/types';
import 'solidity-coverage';
import 'tsconfig-paths/register';

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
};

export default config;
