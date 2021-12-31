import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, BytesLike } from 'ethers';
import { Token, Wallet } from '../typechain-types/index';

const { expect } = chai;
chai.use(chaiAsPromised);
describe('Wallet contract', () => {
  let contractWallet;
  let wallet : Wallet;
  let dexToken;
  let token: Token;
  let owner : SignerWithAddress;
  let addr : SignerWithAddress;
  let tokenSymbol: BytesLike;
  beforeEach(async () => {
    dexToken = await ethers.getContractFactory('Token');
    contractWallet = await ethers.getContractFactory('Wallet');
    token = await dexToken.deploy();
    wallet = await contractWallet.deploy();
    [owner, addr] = await ethers.getSigners();
    tokenSymbol = ethers.utils.formatBytes32String(await token.symbol());
    await wallet.addToken(tokenSymbol, token.address);
  });
  it('Should not withdraw', async () => {
    await expect(wallet.withdraw(100, tokenSymbol)).to.be.reverted;
  });
  it('Should not be owner', async () => {
    await expect(wallet.connect(addr).addToken(tokenSymbol, token.address)).to.be.reverted;
  });
  context('deposits and withdraws', () => {
    let ownerBalance: BigNumber;
    let balanceOfToken: BigNumber;
    beforeEach(async () => {
      await token.approve(wallet.address, 500);
      await wallet.deposit(100, tokenSymbol);
      ownerBalance = await token.balanceOf(owner.address);
      balanceOfToken = await wallet.balances(owner.address, tokenSymbol);
    });
    it('Should deposit', async () => {
      expect((await token.totalSupply()).toNumber() - 100).to.equal(ownerBalance);
      expect(balanceOfToken.toNumber() === 100);
    });
    it('Should withdraw', async () => {
      await wallet.withdraw(100, tokenSymbol);
      ownerBalance = await token.balanceOf(owner.address);
      balanceOfToken = await wallet.balances(owner.address, tokenSymbol);
      expect((await token.totalSupply())).to.equal(ownerBalance);
      expect(balanceOfToken.toNumber() === 0);
    });
  });
});
