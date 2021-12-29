const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Wallet contract", () => {
  let Wallet, wallet, Token, token, owner, addr1, addr2;
  beforeEach(async () => {
    Token = await ethers.getContractFactory("Token");
    Wallet = await ethers.getContractFactory("Wallet");

    token = await Token.deploy();
    wallet = await Wallet.deploy();

    [owner, addr1, addr2] = await ethers.getSigners();
  });
  it("Should approve 500", async () => {
    console.log('1');
    await wallet.addToken(ethers.utils.formatBytes32String("TKN"), token.Address);
    console.log('2');
    await token.approve(wallet.address, 500);
    console.log('3');
    await wallet.deposit(100, ethers.utils.formatBytes32String("TKN"));
    console.log('4');
  });
});