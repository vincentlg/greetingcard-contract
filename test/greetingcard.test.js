const { expect } = require("chai");
const { deployments, ethers } = require("hardhat");

describe('GreetingCard', () => {
  it('should.', async () => {
    const [owner, receiver, signer] = await ethers.getSigners();
    const GreetingLib = await ethers.getContractFactory("GreetingLib");
    const greetingLib = await GreetingLib.deploy();

    const GreetingCard = await ethers.getContractFactory("GreetingCard", {
      libraries: {
        GreetingLib: greetingLib.address,
      }
    });


    const greetingCard = await GreetingCard.deploy(receiver.address);
    await greetingCard.connect(signer).sign();

    expect(await greetingCard.balanceOf(owner.address)).to.equal(0);
    expect(await greetingCard.balanceOf(receiver.address)).to.equal(1);

    console.log(await greetingCard.tokenURI(1));
  });
});
