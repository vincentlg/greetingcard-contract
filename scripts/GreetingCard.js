const hre = require("hardhat");

async function main() {

  const GreetingLib = await ethers.getContractFactory("GreetingLib");
    const greetingLib = await GreetingLib.deploy();

    console.log("greetingLib ",greetingLib.address)

    const GreetingCard = await ethers.getContractFactory("GreetingCard", {
      libraries: {
        GreetingLib: greetingLib.address,
      }
    });

    const greetingCard = await GreetingCard.deploy("0xAC9ba72fb61aA7c31A95df0A8b6ebA6f41EF875e");
    
    await greetingCard.deployed();
    console.log("GreetingCard deployed to:", greetingCard.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });