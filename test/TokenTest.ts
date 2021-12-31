import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import chai from 'chai';
import { ethers } from 'hardhat';
import { Token } from '../typechain-types/index';

const { expect } = chai;

describe('Token contract', () => {
  let dexToken;
  let token: Token;
  let owner: SignerWithAddress;
  beforeEach(async () => {
    dexToken = await ethers.getContractFactory('Token');
    token = await dexToken.deploy();
    [owner] = await ethers.getSigners();
  });
  it('Deployment should assign the total supply of tokens to the owner', async () => {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });
});
