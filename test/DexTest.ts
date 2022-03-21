/* eslint-disable operator-linebreak */
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { assert } from 'console';
import { BytesLike } from 'ethers';
import { ethers } from 'hardhat';
import { Dex, Token } from '../typechain-types';

const { expect } = chai;
chai.use(chaiAsPromised);
let dexContract;
let dexToken;
let dex: Dex;
let token: Token;
let tokenSymbol: BytesLike;
let accounts: SignerWithAddress[];
let native: BytesLike;

describe('Dex Test', () => {
  beforeEach(async () => {
    dexToken = await ethers.getContractFactory('Token');
    dexContract = await ethers.getContractFactory('Dex');
    native = ethers.utils.formatBytes32String('TBNB');
    token = await dexToken.deploy();
    dex = await dexContract.deploy();
    accounts = await ethers.getSigners();
    tokenSymbol = ethers.utils.formatBytes32String(await token.symbol());
    await token.transfer(accounts[1].address, 5000);
    await dex.addToken(tokenSymbol, token.address);
    await dex.connect(accounts[1]).deposit({ value: 100 });
    await token.connect(accounts[1]).approve(dex.address, 500);
    await token.approve(dex.address, 500);
  });
  describe('Limit order test', () => {
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
  });
  describe('Market order test', () => {
    beforeEach(async () => {
      await token.transfer(accounts[2].address, 50);
      await token.transfer(accounts[3].address, 50);

      await token.connect(accounts[2]).approve(dex.address, 50);
      await token.connect(accounts[3]).approve(dex.address, 50);

      await dex.connect(accounts[1]).depositToken(50, tokenSymbol);
      await dex.connect(accounts[2]).depositToken(50, tokenSymbol);
      await dex.connect(accounts[3]).depositToken(50, tokenSymbol);
    });
    it('Should have enough for buy order', async () => {
      await dex.connect(accounts[1]).depositToken(100, tokenSymbol);
      await dex.connect(accounts[1]).createLimitOrder(1, tokenSymbol, 2, 2);
      const balance = await dex.balances(accounts[0].address, native);

      assert(balance.toNumber() === 0, 'Initial balance not 0');
      await expect(dex.createMarketOrder(0, tokenSymbol, 2)).to.be.reverted;
      await dex.deposit({ value: 100 });
      await expect(dex.createMarketOrder(0, tokenSymbol, 2));
    });

    it('Should have enough tokens for sell order', async () => {
      const balance = await dex.balances(accounts[0].address, tokenSymbol);

      assert(balance.toNumber() === 0, 'Initial balance not 0');
      await expect(dex.createMarketOrder(1, tokenSymbol, 1)).to.be.reverted;
      await dex.depositToken(100, tokenSymbol);
      await expect(dex.createMarketOrder(1, tokenSymbol, 1));
    });
    it('Should sell correctly', async () => {
      await dex.depositToken(2, tokenSymbol);
      const balanceBefore = await dex.balances(
        accounts[1].address,
        tokenSymbol,
      );
      await dex.connect(accounts[1]).createLimitOrder(0, tokenSymbol, 2, 2);

      await expect(dex.createMarketOrder(1, tokenSymbol, 2));
      assert(
        (await dex.balances(accounts[1].address, tokenSymbol)).toNumber() ===
          balanceBefore.toNumber() + 2,
        'Buyer balance is wrong',
      );
      assert(
        (await dex.balances(accounts[0].address, tokenSymbol)).toNumber() === 0,
        'Seller balance is wrong',
      );
    });
    it('Sell orderBook should not be empty', async () => {
      let orderBook = await dex.GetOrderBook(tokenSymbol, 1);
      assert(orderBook.length === 0, 'Order book should be empty');
      await token.transfer(accounts[1].address, 50);
      await token.connect(accounts[1]).approve(dex.address, 50);
      await dex.connect(accounts[1]).depositToken(50, tokenSymbol);
      await dex.connect(accounts[1]).createLimitOrder(1, tokenSymbol, 5, 1);
      await dex.connect(accounts[2]).createLimitOrder(1, tokenSymbol, 5, 2);
      await dex.connect(accounts[3]).createLimitOrder(1, tokenSymbol, 5, 3);

      await dex.deposit({ value: 15 });
      await dex.createMarketOrder(0, tokenSymbol, 10);

      orderBook = await dex.GetOrderBook(tokenSymbol, 1);
      assert(orderBook.length === 1, 'Sell side should have 1 order');
      assert(orderBook[0].filled.toNumber() === 0);
    });
    it('Sell orderBook should be empty, and balance right', async () => {
      let orderBook = await dex.GetOrderBook(tokenSymbol, 1);
      assert(orderBook.length === 0, 'Order book should be empty');
      await dex.deposit({ value: 100000 });
      await dex.connect(accounts[1]).createLimitOrder(1, tokenSymbol, 5, 1);
      await dex.connect(accounts[2]).createLimitOrder(1, tokenSymbol, 5, 2);

      const balanceBefore = await dex.balances(accounts[0].address, native);
      await dex.createMarketOrder(0, tokenSymbol, 10);
      const balanceAfter = await dex.balances(accounts[0].address, native);

      orderBook = await dex.GetOrderBook(tokenSymbol, 1);
      expect(balanceBefore.toNumber() - 15).to.equal(balanceAfter.toNumber());
      assert(orderBook.length === 0, 'Sell side should have 1 order');
    });
    it('Buy orderBook should be empty, and balance right', async () => {
      const orderBook = await dex.GetOrderBook(tokenSymbol, 1);
      assert(orderBook.length === 0, 'Order book should be empty');

      await dex.deposit({ value: 100000 });
      await dex.connect(accounts[1]).createLimitOrder(1, tokenSymbol, 1, 300);
      await dex.connect(accounts[2]).createLimitOrder(1, tokenSymbol, 1, 400);

      const account1BalanceBefore = await dex.balances(
        accounts[1].address,
        tokenSymbol,
      );
      const account2BalanceBefore = await dex.balances(
        accounts[2].address,
        tokenSymbol,
      );

      await dex.createMarketOrder(0, tokenSymbol, 2);

      const account1BalanceAfter = await dex.balances(
        accounts[1].address,
        tokenSymbol,
      );
      const account2BalanceAfter = await dex.balances(
        accounts[2].address,
        tokenSymbol,
      );

      expect(account1BalanceBefore.toNumber() - 1).to.equal(
        account1BalanceAfter.toNumber(),
      );
      expect(account2BalanceBefore.toNumber() - 1).to.equal(
        account2BalanceAfter.toNumber(),
      );
    });
    it('Filled orders should be removed', async () => {
      let orderBook = await dex.GetOrderBook(tokenSymbol, 1);
      assert(orderBook.length === 0, 'Order book should be empty');

      await dex.connect(accounts[1]).createLimitOrder(1, tokenSymbol, 1, 1);
      await dex.deposit({ value: 1 });
      await dex.createMarketOrder(0, tokenSymbol, 1);

      orderBook = await dex.GetOrderBook(tokenSymbol, 1);
      assert(orderBook.length === 0, 'Order book should be empty');
    });
    it('Not filled orders should not be removed', async () => {
      let orderBook = await dex.GetOrderBook(tokenSymbol, 1);
      assert(orderBook.length === 0, 'Order book should be empty');

      await dex.connect(accounts[1]).createLimitOrder(1, tokenSymbol, 5, 1);
      await dex.deposit({ value: 2 });
      await dex.createMarketOrder(0, tokenSymbol, 2);

      orderBook = await dex.GetOrderBook(tokenSymbol, 1);
      assert(
        orderBook[0].filled.toNumber() === 2,
        'Order book should not be filled',
      );
      assert(
        orderBook[0].amount.toNumber() === 5,
        "Amount shouldn't be changed",
      );
    });
  });
});
