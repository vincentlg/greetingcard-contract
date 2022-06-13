const hre = require("hardhat");

async function main() {

  const GreetingCard = await hre.ethers.getContractFactory("GreetingCard");
  console.log('Deploying GreetingCard ERC721 token...');
  const token = await GreetingCard.deploy('GreetingCard','GreetingCard');

  await token.deployed();
  console.log("GreetingCard deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });