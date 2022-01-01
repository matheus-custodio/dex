import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { BytesLike } from 'ethers';
import { assert } from 'console';
import { Dex, Token } from '../typechain-types';
// import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const { expect } = chai;
chai.use(chaiAsPromised);
let dexContract;
let dexToken;
let dex: Dex;
let token: Token;
// let owner: SignerWithAddress;
// let addr1: SignerWithAddress;
let tokenSymbol: BytesLike;

describe('Dex Test', () => {
  beforeEach(async () => {
    dexToken = await ethers.getContractFactory('Token');
    dexContract = await ethers.getContractFactory('Dex');
    token = await dexToken.deploy();
    dex = await dexContract.deploy();
    // [owner, addr1] = await ethers.getSigners();
    tokenSymbol = ethers.utils.formatBytes32String(await token.symbol());
    await dex.addToken(tokenSymbol, token.address);
  });
  describe('Limit order creation test', () => {
    it('Should create buy order correctly', async () => {
      await expect(dex.createLimitOrder(0, tokenSymbol, 1, 2)).to.be.reverted;
      await dex.deposit({ value: 100 });
      await expect(dex.createLimitOrder(0, tokenSymbol, 1, 2));
    });
    it('Should create sell order correctly', async () => {
      await expect(dex.createLimitOrder(1, tokenSymbol, 1, 2)).to.be.reverted;
      await token.approve(dex.address, 500);
      await dex.depositToken(100, tokenSymbol);
      await expect(dex.createLimitOrder(1, tokenSymbol, 1, 2));
    });
  });
  describe('Limit order sort test', () => {
    it('Buy orderBook should be sorted', async () => {
      await dex.deposit({ value: 1000 });
      await dex.createLimitOrder(0, tokenSymbol, 1, 300);
      await dex.createLimitOrder(0, tokenSymbol, 2, 100);
      await dex.createLimitOrder(0, tokenSymbol, 3, 200);

      const orderBook = await dex.GetOrderBook(tokenSymbol, 0);
      assert(orderBook.length > 0);
      for (let i = 0; i < orderBook.length - 1; i += 1) {
        assert(
          orderBook[i].price >= orderBook[i + 1].price,
          'Buy orderBook not sorted right',
        );
      }
    });
    it('Sell orderBook should be sorted', async () => {
      await token.approve(dex.address, 500);
      await dex.depositToken(500, tokenSymbol);
      await dex.createLimitOrder(1, tokenSymbol, 100, 300);
      await dex.createLimitOrder(1, tokenSymbol, 100, 100);
      await dex.createLimitOrder(1, tokenSymbol, 100, 200);

      const orderBook = await dex.GetOrderBook(tokenSymbol, 1);
      assert(orderBook.length > 0);
      for (let i = 0; i < orderBook.length - 1; i += 1) {
        assert(
          orderBook[i].price <= orderBook[i + 1].price,
          'Sell orderBook not sorted right',
        );
      }
    });
  });
  describe('Market order test', () => {
    it('Should have enough tokens', async () => {
      await expect(dex.createMarketOrder(1, tokenSymbol, 1, 2)).to.be.reverted;
      await token.approve(dex.address, 500);
      await dex.depositToken(100, tokenSymbol);
      await expect(dex.createMarketOrder(1, tokenSymbol, 1, 2));
    });
    it('Should create sell order correctly', async () => {
      await expect(dex.createLimitOrder(1, tokenSymbol, 1, 2)).to.be.reverted;
      await token.approve(dex.address, 500);
      await dex.depositToken(100, tokenSymbol);
      await expect(dex.createLimitOrder(1, tokenSymbol, 1, 2));
    });
  });
});
