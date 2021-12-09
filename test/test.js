const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("ConcaveNFT", function () {

  const _name = "name"
  const _symbol = "symbol"
  const _initBaseURI = "ipfs://QmXytj58vtcvm9SwwBPvJykApcsr9aeChX4BcRha2wc31i/"
  const _initNotRevealedUri = "ipfs://QmYJJDthYUGV57FQ57VCeXcCBnpWoGjxtHsWcDLEY1Bp19"
  const colorsOwner = "0xfA8F061675f46CB9e71308BDf3C1C15E35011AC2"
  const colorsAddress = "0x9fdb31F8CE3cB8400C7cCb2299492F2A498330a4"

  const maxSupply = 4317;
  const maxMintAmount = 10;
  const price = ethers.utils.parseEther('0.04');

  let ConcaveNFT
  let deployer;
  let thirdParty;
  let concavenft;
  let thecolors;




  beforeEach(async function () {
      [deployer, thirdParty] = await ethers.getSigners();
    // Get the ContractFactory and Signers here.
    // console.log('before')
    ConcaveNFT = await ethers.getContractFactory("ConcaveNFT");
    concavenft = await ConcaveNFT.deploy(
        _name,
        _symbol,
        _initBaseURI,
        _initNotRevealedUri
    );

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [colorsOwner],
    });
    await network.provider.send("hardhat_setBalance", [
      colorsOwner,
      ethers.utils.parseEther('10.0').toHexString().replace("0x0", "0x"),
    ]);
    colorsOwnerSigner = await ethers.provider.getSigner(colorsOwner);

    // console.log(ConcaveNFT)
  });

  it("Locates Original TheColors NFT", async () => {
      const TheColors = await ethers.getContractFactory("TheColors");
      thecolors = await TheColors.attach(colorsAddress);
      console.log(
          `Colors Owner Balance`,
          await thecolors.balanceOf(colorsOwner)
      )
  })

  it("if totalSupply < 200 - non-colors-holders cannot mint", async () => {
      await concavenft.unpause();
      await expect(
          concavenft.mint(2)
      ).to.be.revertedWith(`Not Colors Owner`);
  })
  const listColorsHolders = [
      ["0x5feAf84dca91666f812B8405F4B275Eec4fe7AA2",28],
      ["0x268169A19bCa3435451207f70be15436ed142f42",32],
      ["0x6764090259F95640563E999e386e742C2935A633",36],
      ["0x7C6553933A471b43cE3a76A02245c5162C82522c",4]

  ]
  it("if totalSupply < 200 - colors-holders can mint", async () => {
      await concavenft.unpause();
      await concavenft.connect(colorsOwnerSigner).mint(10);
      await concavenft.connect(colorsOwnerSigner).mint(2);
      console.log(await concavenft.totalSupply())
  })
  //
  // it("200 colors holders can mint", async () => {
  //     await concavenft.unpause();
  //     for (var i = 0; i < listColorsHolders.length; i++) {
  //         let addy = listColorsHolders[i][0]
  //         await hre.network.provider.request({
  //           method: "hardhat_impersonateAccount",
  //           params: [addy],
  //         });
  //         await network.provider.send("hardhat_setBalance", [
  //           addy,
  //           ethers.utils.parseEther('10.0').toHexString().replace("0x0", "0x"),
  //         ]);
  //         let addysigner = await ethers.provider.getSigner(addy);
  //         let quota = listColorsHolders[i][1]
  //         while (quota > 0) {
  //             let amount = quota > 10 ? 10 : quota;
  //             // console.log('minting',amount,listColorsHolders[i])
  //             await concavenft.connect(addysigner).mint(amount);
  //             quota-=amount
  //         }
  //     }
  //
  //     console.log(await concavenft.totalSupply())
  // })

  it("200 colors holders can mint", async () => {
      await concavenft.unpause();

      for (var i = 0; i < listColorsHolders.length; i++) {
          let addy = listColorsHolders[i][0]
          await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [addy],
          });
          await network.provider.send("hardhat_setBalance", [
            addy,
            ethers.utils.parseEther('10.0').toHexString().replace("0x0", "0x"),
          ]);
          let addysigner = await ethers.provider.getSigner(addy);
          let quota = listColorsHolders[i][1]*2
          while (quota > 0) {
              let amount = quota > 10 ? 10 : quota;
              // console.log('minting',amount,listColorsHolders[i])
              await concavenft.connect(addysigner).mint(amount);
              quota-=amount
          }
      }


      let minted = 200;
      while (minted < maxSupply) {
          let amount = maxSupply - maxSupply > 10 ? 10 : maxSupply - maxSupply;
          console.log(amount,minted)
          await concavenft.connect(thirdParty).mint(amount,{value:ethers.utils.parseEther('0.4')});
          minted+=amount
      }

      console.log(await concavenft.totalSupply())
      console.log('-----------------------------')
  }).timeout(0);

  // it("Impersonates Account", async () => {
  //   // const admin =
  //   await hre.network.provider.request({
  //     method: "hardhat_impersonateAccount",
  //     params: [colorsOwner],
  //   });
  //   await network.provider.send("hardhat_setBalance", [
  //     colorsOwner,
  //     ethers.utils.parseEther('10.0').toHexString().replace("0x0", "0x"),
  //   ]);
  //   colorsOwnerSigner = await ethers.provider.getSigner(colorsOwner);
  //   // console.log(thecolors)
  //   // await thecolors.connect(colorsOwnerSigner).transferFrom(colorsOwner,deployer.address,0)
  //   await concavenft.unpause();
  //   await concavenft.connect(colorsOwnerSigner).mint(2)
  //   const bal = await concavenft.balanceOf(colorsOwner)
  //   console.log(bal)
  // });





  // it("ConcaveNFT should mint", async function () {
  //   await concavenft.mint(1);
  // });

  // it("ConcaveNFT should get URI", async function () {
  //   let uri = await concavenft.tokenURI(1);
  //   await expect(
  //       concavenft.mint(1)
  //   ).to.be.revertedWith(`Public sale isn't active yet!`);
  // });


});
