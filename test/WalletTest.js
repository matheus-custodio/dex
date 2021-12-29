const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Wallet contract', () => {
  let Wallet, wallet, Token, token, owner;
  beforeEach(async () => {
    Token = await ethers.getContractFactory('Token');
    Wallet = await ethers.getContractFactory('Wallet');

    token = await Token.deploy();
    wallet = await Wallet.deploy();
    await token.deployed();
    [owner] = await ethers.getSigners();
  });

  it('Should deposit 100', async () => {
    const tokenSymbol = ethers.utils.formatBytes32String(await token.symbol());
    await wallet.addToken(tokenSymbol, token.address);
    await token.approve(wallet.address, 500);
    await wallet.deposit(100, tokenSymbol);
    const ownerBalance = await token.balanceOf(owner.address);
    const balanceOfToken = await wallet.balances(owner.address, tokenSymbol);
    expect(await token.totalSupply()-100).to.equal(ownerBalance);
    expect(balanceOfToken === 100);
  });
});