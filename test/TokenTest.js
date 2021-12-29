const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
  let Token, token, owner;
  beforeEach(async () => {
    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    [owner] = await ethers.getSigners();
  });
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });
});