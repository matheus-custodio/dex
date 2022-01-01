import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { BytesLike } from 'ethers';
import { Dex, Token } from '../typechain-types';
// import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const { expect } = chai;
chai.use(chaiAsPromised);
describe('Dex Test', () => {
  let dexContract;
  let dexToken;
  let dex: Dex;
  let token: Token;
  // let owner: SignerWithAddress;
  // let addr1: SignerWithAddress;
  let tokenSymbol: BytesLike;
  beforeEach(async () => {
    dexToken = await ethers.getContractFactory('Token');
    dexContract = await ethers.getContractFactory('Dex');
    token = await dexToken.deploy();
    dex = await dexContract.deploy();
    // [owner, addr1] = await ethers.getSigners();
    tokenSymbol = ethers.utils.formatBytes32String(await token.symbol());
    await dex.addToken(tokenSymbol, token.address);
  });
  it('Should create order', async () => {
    await expect(dex.createLimitOrder(tokenSymbol, 100, 200)).to.be.reverted;
    await token.approve(dex.address, 500);
    await dex.deposit(100, tokenSymbol);
    await expect(dex.createLimitOrder(tokenSymbol, 100, 200));
  });
});
