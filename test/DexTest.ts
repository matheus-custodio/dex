import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { BytesLike } from 'ethers';
import { assert } from 'console';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Dex, Token } from '../typechain-types';

const { expect } = chai;
chai.use(chaiAsPromised);
let dexContract;
let dexToken;
let dex: Dex;
let token: Token;
let owner: SignerWithAddress;
let addr1: SignerWithAddress;
let tokenSymbol: BytesLike;

describe('Dex Test', () => {
  beforeEach(async () => {
    dexToken = await ethers.getContractFactory('Token');
    dexContract = await ethers.getContractFactory('Dex');
    token = await dexToken.deploy();
    dex = await dexContract.deploy();
    [owner, addr1] = await ethers.getSigners();
    tokenSymbol = ethers.utils.formatBytes32String(await token.symbol());
    await token.transfer(addr1.address, 5000);
    await dex.addToken(tokenSymbol, token.address);
    await dex.connect(addr1).deposit({ value: 100 });
    await token.connect(addr1).approve(dex.address, 500);
    await token.approve(dex.address, 500);
  });
  describe('Limit order creation test', () => {
    it('Should create buy order correctly', async () => {
      await expect(dex.createLimitOrder(0, tokenSymbol, 1, 2)).to.be.reverted;
      await dex.deposit({ value: 100 });
      await expect(dex.createLimitOrder(0, tokenSymbol, 1, 2));
    });
    it('Should create sell order correctly', async () => {
      await expect(dex.createLimitOrder(1, tokenSymbol, 1, 2)).to.be.reverted;
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
    it('Should have enough for buy order', async () => {
      await dex.connect(addr1).depositToken(100, tokenSymbol);
      await dex.connect(addr1).createLimitOrder(1, tokenSymbol, 2, 2);
      const balance = await dex.balances(
        owner.address,
        ethers.utils.formatBytes32String('BNB'),
      );

      assert(balance.toNumber() === 0, 'Initial balance not 0');
      await expect(dex.createMarketOrder(0, tokenSymbol, 2)).to.be.reverted;
      await dex.deposit({ value: 100 });
      await expect(dex.createMarketOrder(0, tokenSymbol, 2));
    });
    it('Should have enough tokens for sell order', async () => {
      const balance = await dex.balances(owner.address, tokenSymbol);

      assert(balance.toNumber() === 0, 'Initial balance not 0');
      await expect(dex.createMarketOrder(1, tokenSymbol, 1)).to.be.reverted;
      await dex.depositToken(100, tokenSymbol);
      await expect(dex.createMarketOrder(1, tokenSymbol, 1));
    });
    it('Should sell correctly', async () => {
      await dex.depositToken(2, tokenSymbol);
      await dex.connect(addr1).createLimitOrder(0, tokenSymbol, 2, 2);

      await expect(dex.createMarketOrder(1, tokenSymbol, 2));
      assert(
        (await dex.balances(addr1.address, tokenSymbol)).toNumber() === 2,
        'Buyer balance is wrong',
      );
      assert(
        (await dex.balances(owner.address, tokenSymbol)).toNumber() === 0,
        'Seller balance is wrong',
      );
    });
  }); /*
  describe("Can't buy from itself", () => {
    it('Should have enough tokens for sell order', async () => {
      await expect(dex.createMarketOrder(1, tokenSymbol, 1)).to.be.reverted;
      await dex.depositToken(100, tokenSymbol);
      await expect(dex.createMarketOrder(1, tokenSymbol, 1));
    });
    it('Should create enough for buy order', async () => {
      await expect(dex.createLimitOrder(0, tokenSymbol, 1)).to.be.reverted;
      await dex.deposit({ value: 100 });
      await expect(dex.createLimitOrder(0, tokenSymbol, 1));
    });
  }); */
});
