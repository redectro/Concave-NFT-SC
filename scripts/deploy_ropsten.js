
const _name = 'ConcaveName';
const _symbol = 'ConcaveSymbol';
const _initBaseURI = 'ipfs://BaseURI/';
const _initNotRevealedUri = 'ipfs://unrevealedURI/';


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());


  const NFT = await ethers.getContractFactory('SampleNFT');
  const token = await NFT.deploy();
  console.log("Token address:", token.address);
  // const ConcaveNFT = await ethers.getContractFactory("ConcaveNFT");
  // const token = await ConcaveNFT.deploy(
  //     _name,
  //     _symbol,
  //     _initBaseURI,
  //     _initNotRevealedUri
  // );

  // console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
