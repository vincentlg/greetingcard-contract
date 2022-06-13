# greetingcard-contract

## compile & deploy

````
yarn hardhat compile
yarn hardhat run scripts/Greetingcard.js
````


## Play with the NFT contract


````
yarn hardhat node
````

In another terminal
````
yarn hardhat console --network localhost
````

In the terminal, run:
````
const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const token721 = await ethers.getContractAt("GreettingCard", address);

const accounts = await hre.ethers.getSigners();
owner = accounts[0].address;
toAddress = accounts[1].address;

await token721.symbol()
````

Mint NFT and view it in online tools.
````
//mint NFT tokenId 1
await token721.mintTo(toAddress)
````


