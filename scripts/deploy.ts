import { ethers } from 'hardhat';

async function main() {
  const native = ethers.utils.formatBytes32String('ETH');
  const Dex = await ethers.getContractFactory('Dex');
  const Token = await ethers.getContractFactory('Token');

  const dex = await Dex.deploy(native);
  const token = await Token.deploy();

  await dex.deployed();
  await token.deployed();

  const tokenSymbol = ethers.utils.formatBytes32String(await token.symbol());

  console.log('Dex deployed to:', dex.address);
  console.log('Token deployed to:', token.address);

  await dex.addToken(tokenSymbol, token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
