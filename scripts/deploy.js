const hre = require("hardhat");

async function main() {

  const Wallet = await hre.ethers.getContractFactory("Wallet");
  const wallet = await Wallet.deploy("Deploying Wallet!");
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy("Deploying Token!");


  await wallet.deployed();
  await token.deployed();

  console.log("Wallet deployed to:", wallet.address);
  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
