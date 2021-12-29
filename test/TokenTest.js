const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
  let Token, token, owner, addr1, addr2;
  beforeEach(async () => {
    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    [owner, addr1, addr2] = await ethers.getSigners();
  });
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });
});