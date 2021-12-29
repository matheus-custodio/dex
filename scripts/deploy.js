const hre = require("hardhat");

async function main() {

  const Wallet = await hre.ethers.getContractFactory("Wallet");
  const wallet = await Wallet.deploy("Hello, Hardhat!");

  await wallet.deployed();

  console.log("Greeter deployed to:", wallet.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
