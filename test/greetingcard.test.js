const { expect } = require("chai");
const { deployments, ethers } = require("hardhat");

describe('GreetingCard', () => {
  it('should.', async () => {
    const [owner, receiver, signer, signer2, signer3, signer4, signer5, signer6, signer7, signer8, signer9, signer10] = await ethers.getSigners();
    const GreetingLib = await ethers.getContractFactory("GreetingLib");
    const greetingLib = await GreetingLib.deploy();

    const GreetingCard = await ethers.getContractFactory("GreetingCard", {
      libraries: {
        GreetingLib: greetingLib.address,
      }
    });


    const greetingCard = await GreetingCard.deploy(receiver.address);
    await greetingCard.connect(signer).sign();

    await greetingCard.connect(signer2).sign();
    await greetingCard.connect(signer3).sign();
    await greetingCard.connect(signer4).sign();
    await greetingCard.connect(signer5).sign();
    await greetingCard.connect(signer6).sign();
    await greetingCard.connect(signer7).sign();
    await greetingCard.connect(signer8).sign();
    await greetingCard.connect(signer9).sign();
    await greetingCard.connect(signer10).sign();

    expect(await greetingCard.balanceOf(owner.address)).to.equal(0);
    expect(await greetingCard.balanceOf(receiver.address)).to.equal(1);

    console.log(await greetingCard.tokenURI(1));
  });
});
