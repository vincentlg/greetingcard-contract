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

    const sign = async (s) => s.sendTransaction({ to: greetingCard.address, value: 1 })
    await sign(signer);
    await sign(signer2);
    await sign(signer3);
    await sign(signer4);
    await sign(signer5);
    await sign(signer6);
    await sign(signer7);
    await sign(signer8);
    await sign(signer9);

    expect(await greetingCard.balanceOf(owner.address)).to.equal(0);
    expect(await greetingCard.balanceOf(receiver.address)).to.equal(1);

    console.log(await greetingCard.tokenURI(1));

    await greetingCard.connect(receiver).withdraw();
  });
});
