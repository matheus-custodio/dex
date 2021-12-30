import { ethers } from 'hardhat';

async function main() {
  const Wallet = await ethers.getContractFactory('Wallet');
  const Token = await ethers.getContractFactory('Token');

  const wallet = await Wallet.deploy();
  const token = await Token.deploy();

  await wallet.deployed();
  await token.deployed();

  console.log('Wallet deployed to:', wallet.address);
  console.log('Token deployed to:', token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
