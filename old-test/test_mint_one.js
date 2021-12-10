const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

const listColorsHolders = [
    ["0x5feAf84dca91666f812B8405F4B275Eec4fe7AA2",28],
    ["0x268169A19bCa3435451207f70be15436ed142f42",32],
    ["0x6764090259F95640563E999e386e742C2935A633",36],
    ["0x7C6553933A471b43cE3a76A02245c5162C82522c",4],

    ["0xEeAf86E05A95261290a871Dd8cdB9470D5D3c9B7", 10],
    ["0xB9ccfC18B941A2CC51A956aa6C83360eb9d58DE7", 47],
    ["0x149884b699FE3E1b042f85fA3B54843EB689b2d4", 43],

    // ["0x6dEa5dCFa64DC0bb4E5AC53A375A4377CF4eD0Ee",6]

]

const colorsOwner = "0xfA8F061675f46CB9e71308BDf3C1C15E35011AC2"
const colorsAddress = "0x9fdb31F8CE3cB8400C7cCb2299492F2A498330a4"
let colorsOwnerSigner;

const THE_COLORS = '0x9fdb31F8CE3cB8400C7cCb2299492F2A498330a4';
const TREASURY = '0x48aE900E9Df45441B2001dB4dA92CE0E7C08c6d2';
const MAX_SUPPLY = 4317;
const TOTAL_COLORS_QUOTA = 200;


const _name = 'ConcaveName';
const _symbol = 'ConcaveSymbol';
const _initBaseURI = 'ipfs://BaseURI/';
const _initNotRevealedUri = 'ipfs://unrevealedURI/';
const maxMintAmount = 10;
const price_in_ether = 0.04;
const price = ethers.utils.parseEther(price_in_ether.toString());
const revealed = false;
const paused = true;

let ConcaveNFT;
let concavenft;
let deployer;
let thirdParty;
const deploy = async () => {
    [deployer,thirdParty] =  await ethers.getSigners();
    ConcaveNFT = await ethers.getContractFactory("ConcaveNFT");
    concavenft = await ConcaveNFT.deploy(
        _name,
        _symbol,
        _initBaseURI,
        _initNotRevealedUri
    );
    console.log('>_')
}

const mintThirdParty = async (_mintAmount) => {
    let quota = _mintAmount;
    while (quota > 0) {
        let toMint = quota > 10 ? 10 : quota
        await concavenft.connect(thirdParty).mint(toMint,{value:ethers.utils.parseEther((price_in_ether*toMint).toString())})
        quota-=toMint;
    }
}

const getColorsMinter = async () => {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [colorsOwner],
    });
    await network.provider.send("hardhat_setBalance", [
      colorsOwner,
      ethers.utils.parseEther('10.0').toHexString().replace("0x0", "0x"),
    ]);
    colorsOwnerSigner = await ethers.provider.getSigner(colorsOwner);
}

const getNewColorsMinter = async (address) => {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [address],
    });
    await network.provider.send("hardhat_setBalance", [
      address,
      ethers.utils.parseEther('10.0').toHexString().replace("0x0", "0x"),
    ]);
    let signer = await ethers.provider.getSigner(address);
    return signer
}

const fundBalances = async () => {
    for (var i = 0; i < listColorsHolders.length; i++) {

        await network.provider.send("hardhat_setBalance", [
          listColorsHolders[i][0],
          ethers.utils.parseEther('100.0').toHexString().replace("0x0", "0x"),
        ]);
    }
    await network.provider.send("hardhat_setBalance", [
      deployer.address,
      ethers.utils.parseEther('100.0').toHexString().replace("0x0", "0x"),
    ]);
    await network.provider.send("hardhat_setBalance", [
      thirdParty.address,
      ethers.utils.parseEther('100.0').toHexString().replace("0x0", "0x"),
    ]);
}

const mintAllColorsHolders = async () => {
    for (var i = 0; i < listColorsHolders.length; i++) {
        const [address, amount] = listColorsHolders[i];
        const signer = await getNewColorsMinter(address)
        let quota = amount;
        while (quota > 0) {
            let toMint = quota > 10 ? 10 : quota
            await concavenft.connect(signer).mint(toMint)
            quota-=toMint;
        }
    }
}

const mint = async (colorsOwnerSigner,_mintAmount) => {
    await concavenft.connect(colorsOwnerSigner).mint(_mintAmount);
}

//
// describe("ConcaveNFT: Reads public constants", () => {
//     before(deploy)
//     it(`THE_COLORS is "${THE_COLORS}"`, async () => {
//         expect(await concavenft.THE_COLORS()).to.equal(THE_COLORS)
//     })
//     it(`TREASURY is "${TREASURY}"`, async () => {
//         expect(await concavenft.TREASURY()).to.equal(TREASURY)
//     })
//     it(`MAX_SUPPLY is "${MAX_SUPPLY}"`, async () => {
//         expect(await concavenft.MAX_SUPPLY()).to.equal(MAX_SUPPLY)
//     })
//     it(`TOTAL_COLORS_QUOTA is "${TOTAL_COLORS_QUOTA}"`, async () => {
//         expect(await concavenft.TOTAL_COLORS_QUOTA()).to.equal(TOTAL_COLORS_QUOTA)
//     })
// });
//
// describe("ConcaveNFT: Reads public variables", () => {
//     before(deploy)
//     it(`name is "${_name}"`, async () => {
//         expect(await concavenft.name()).to.equal(_name)
//     })
//     it(`symbol is "${_symbol}"`, async () => {
//         expect(await concavenft.symbol()).to.equal(_symbol)
//     })
//     it(`baseURI is "${_initBaseURI}"`, async () => {
//         expect(await concavenft.baseURI()).to.equal(_initBaseURI)
//     })
//     it(`notRevealedUri is "${_initNotRevealedUri}"`, async () => {
//         expect(await concavenft.notRevealedUri()).to.equal(_initNotRevealedUri)
//     })
//     it(`maxMintAmount is "${maxMintAmount}"`, async () => {
//         expect(await concavenft.maxMintAmount()).to.equal(maxMintAmount)
//     })
//     it(`price is "${ethers.utils.formatEther(price)}"`, async () => {
//         expect(await concavenft.price()).to.equal(price)
//     })
//     it(`revealed is "${revealed}"`, async () => {
//         expect(await concavenft.revealed()).to.equal(revealed)
//     })
//     it(`paused is "${paused}"`, async () => {
//         expect(await concavenft.paused()).to.equal(paused)
//     })
//     it(`owner is "${paused}"`, async () => {
//         expect(await concavenft.owner()).to.equal(deployer.address)
//     })
//     it(`isPublicMintActive is "${false}"`, async () => {
//         expect(await concavenft.isPublicMintActive()).to.equal(false)
//     })
// });
//
// describe("ConcaveNFT: Owner functions", () => {
//     beforeEach(deploy)
//     describe("unpause()", () => {
//         it(`Third party calling unpause() should revert with "Ownable: caller is not the owner"`, async () => {
//             await expect(
//                 concavenft.connect(thirdParty).unpause()
//             ).to.be.revertedWith('Ownable: caller is not the owner')
//         })
//         it(`Owner calling unpause() should not revert`, async () => {
//             await concavenft.unpause()
//         })
//         it(`After owner calling unpause() - "paused" should be "false"`, async () => {
//             await concavenft.unpause()
//             expect(await concavenft.paused()).to.equal(false)
//         })
//     })
//     describe("pause()", () => {
//         it(`Third party calling pause() should revert with "Ownable: caller is not the owner"`, async () => {
//             await expect(
//                 concavenft.connect(thirdParty).pause()
//             ).to.be.revertedWith('Ownable: caller is not the owner')
//         })
//         it(`Owner calling pause() should revert with "Pausable: paused"`, async () => {
//             await expect(
//                 concavenft.pause()
//             ).to.be.revertedWith('Pausable: paused')
//         })
//         it(`If paused=false - owner calling pause() should not revert`, async () => {
//             await concavenft.unpause();
//             await concavenft.pause();
//         })
//         it(`After calling pause() - paused should=true`, async () => {
//             await concavenft.unpause();
//             await concavenft.pause();
//             expect(await concavenft.paused()).to.equal(true)
//         })
//     })
//     describe("reveal()", () => {
//         it(`Third party calling reveal() should revert with "Ownable: caller is not the owner"`, async () => {
//             await expect(
//                 concavenft.connect(thirdParty).reveal()
//             ).to.be.revertedWith('Ownable: caller is not the owner')
//         })
//         it(`Owner calling reveal() should pass"`, async () => {
//             await concavenft.reveal();
//         })
//         it(`Calling reveal() should make reveal=true`, async () => {
//             await concavenft.reveal();
//             expect(await concavenft.revealed()).to.equal(true);
//         })
//     })
//     describe("setNotRevealedURI()", () => {
//         it(`Third party calling setNotRevealedURI() should revert with "Ownable: caller is not the owner"`, async () => {
//             await expect(
//                 concavenft.connect(thirdParty).setNotRevealedURI("")
//             ).to.be.revertedWith('Ownable: caller is not the owner')
//         })
//         it(`Owner calling setNotRevealedURI() should pass"`, async () => {
//             await concavenft.setNotRevealedURI("");
//         })
//         it(`Calling setNotRevealedURI() with parameter "test" should set notRevealedUri="test"`, async () => {
//             await concavenft.setNotRevealedURI("test");
//             expect(await concavenft.notRevealedUri()).to.equal("test");
//         })
//         it(`Owner can call setNotRevealedURI multiple times`, async () => {
//             await concavenft.setNotRevealedURI("test");
//             expect(await concavenft.notRevealedUri()).to.equal("test");
//             await concavenft.setNotRevealedURI("test2");
//             expect(await concavenft.notRevealedUri()).to.equal("test2");
//             await concavenft.setNotRevealedURI("test3");
//             expect(await concavenft.notRevealedUri()).to.equal("test3");
//         })
//     })
//     describe("setBaseURI()", () => {
//         it(`Third party calling setBaseURI() should revert with "Ownable: caller is not the owner"`, async () => {
//             await expect(
//                 concavenft.connect(thirdParty).setBaseURI("")
//             ).to.be.revertedWith('Ownable: caller is not the owner')
//         })
//         it(`Owner calling setBaseURI() should pass"`, async () => {
//             await concavenft.setBaseURI("");
//         })
//         it(`Calling setBaseURI() with parameter "test" should set baseURI="test"`, async () => {
//             await concavenft.setBaseURI("test");
//             expect(await concavenft.baseURI()).to.equal("test");
//         })
//         it(`Owner can call setBaseURI multiple times`, async () => {
//             await concavenft.setBaseURI("test");
//             expect(await concavenft.baseURI()).to.equal("test");
//             await concavenft.setBaseURI("test2");
//             expect(await concavenft.baseURI()).to.equal("test2");
//             await concavenft.setBaseURI("test3");
//             expect(await concavenft.baseURI()).to.equal("test3");
//         })
//     })
//     describe("setMaxMintAmount()", () => {
//         it(`Third party calling setMaxMintAmount() should revert with "Ownable: caller is not the owner"`, async () => {
//             await expect(
//                 concavenft.connect(thirdParty).setMaxMintAmount(20)
//             ).to.be.revertedWith('Ownable: caller is not the owner')
//         })
//         it(`Owner calling setMaxMintAmount() should pass"`, async () => {
//             await concavenft.setMaxMintAmount(20);
//         })
//         it(`Calling setMaxMintAmount() with parameter "40" should set maxMintAmount="40"`, async () => {
//             await concavenft.setMaxMintAmount(40);
//             expect(await concavenft.maxMintAmount()).to.equal(40);
//         })
//         it(`Owner can call setMaxMintAmount multiple times`, async () => {
//             await concavenft.setMaxMintAmount(40);
//             expect(await concavenft.maxMintAmount()).to.equal(40);
//             await concavenft.setMaxMintAmount(50);
//             expect(await concavenft.maxMintAmount()).to.equal(50);
//             await concavenft.setMaxMintAmount(60);
//             expect(await concavenft.maxMintAmount()).to.equal(60);
//         })
//     })
//     describe("setPrice()", () => {
//         it(`Third party calling setPrice() should revert with "Ownable: caller is not the owner"`, async () => {
//             await expect(
//                 concavenft.connect(thirdParty).setPrice(20)
//             ).to.be.revertedWith('Ownable: caller is not the owner')
//         })
//         it(`Owner calling setPrice() should pass"`, async () => {
//             await concavenft.setPrice(20);
//         })
//         it(`Calling setPrice() with parameter "40" should set maxMintAmount="40"`, async () => {
//             await concavenft.setPrice(40);
//             expect(await concavenft.price()).to.equal(40);
//         })
//         it(`Owner can call setPrice multiple times`, async () => {
//             await concavenft.setPrice(40);
//             expect(await concavenft.price()).to.equal(40);
//             await concavenft.setPrice(50);
//             expect(await concavenft.price()).to.equal(50);
//             await concavenft.setPrice(60);
//             expect(await concavenft.price()).to.equal(60);
//         })
//     })
//     describe("setPublicMintActive()", () => {
//         it(`Third party calling setPublicMintActive() should revert with "Ownable: caller is not the owner"`, async () => {
//             await expect(
//                 concavenft.connect(thirdParty).setPublicMintActive(true)
//             ).to.be.revertedWith('Ownable: caller is not the owner')
//         })
//         it(`Owner calling setPublicMintActive() should pass"`, async () => {
//             await concavenft.setPublicMintActive(true);
//         })
//         it(`Calling setPublicMintActive() with parameter "true" should make isPublicMintActive return "true"`, async () => {
//             await concavenft.setPublicMintActive(true);
//             expect(await concavenft.isPublicMintActive()).to.equal(true);
//         })
//         it(`Owner can call setPublicMintActive multiple times`, async () => {
//             await concavenft.setPublicMintActive(true);
//             expect(await concavenft.isPublicMintActive()).to.equal(true);
//             await concavenft.setPublicMintActive(false);
//             expect(await concavenft.isPublicMintActive()).to.equal(false);
//             await concavenft.setPublicMintActive(true);
//             expect(await concavenft.isPublicMintActive()).to.equal(true);
//         })
//     })
//     describe("tokenURI()", () => {
//         it(`Calling tokenURI() on nonexistent tokenId should revert with "ERC721Metadata: URI query for nonexistent token"`, async () => {
//             await expect(
//                 concavenft.tokenURI(0)
//             ).to.be.revertedWith("ERC721Metadata: URI query for nonexistent token")
//         })
//         it(`Calling tokenURI() on an existing tokenId when not revealed should return "${_initNotRevealedUri}"`, async () => {
//             await concavenft.unpause();
//             await getColorsMinter()
//             await mint(colorsOwnerSigner,1)
//             expect(
//                 await concavenft.tokenURI(0)
//             ).to.equal(_initNotRevealedUri)
//         })
//         it(`Calling tokenURI() on an existing tokenId 0 after reveal should return "${_initBaseURI}0.json"`, async () => {
//             await concavenft.unpause();
//             await getColorsMinter()
//             await mint(colorsOwnerSigner,1)
//             await concavenft.reveal();
//             expect(
//                 await concavenft.tokenURI(0)
//             ).to.equal(`${_initBaseURI}0.json`)
//         })
//     })
//     describe("withdraw()", () => {
//         it(`after succesfull sellout - contract balance should equal ${ethers.utils.formatEther(ethers.utils.parseEther((price_in_ether*(MAX_SUPPLY-TOTAL_COLORS_QUOTA)).toString()))}`, async () => {
//             await concavenft.unpause()
//             await mintAllColorsHolders()
//             expect(await concavenft.totalSupply()).to.equal(200);
//             await mintThirdParty(MAX_SUPPLY - 200)
//             expect(await concavenft.totalSupply()).to.equal(MAX_SUPPLY);
//             expect(
//                 await waffle.provider.getBalance(concavenft.address)
//             ).to.equal(ethers.utils.parseEther((price_in_ether*(MAX_SUPPLY-TOTAL_COLORS_QUOTA)).toString()))
//         }).timeout(0);
//         it(`if sold 1 NFT - after withdraw contract balance is 0 and allocations would be the above`, async () => {
//             await concavenft.unpause()
//             await mintAllColorsHolders()
//             expect(await concavenft.totalSupply()).to.equal(200);
//             // await mintThirdParty(MAX_SUPPLY - 200)
//             await mintThirdParty(1)
//             // expect(await concavenft.totalSupply()).to.equal(MAX_SUPPLY);
//             // expect(
//             //     await waffle.provider.getBalance(concavenft.address)
//             // ).to.equal(ethers.utils.parseEther((price_in_ether*(MAX_SUPPLY-TOTAL_COLORS_QUOTA)).toString()))
//             const totalRaised = await waffle.provider.getBalance(concavenft.address);
//
//             const names = [
//                 'NFT                                       ',
//                 'Treasury                                  '
//             ]
//             const previous = []
//             const addresses = [
//                 concavenft.address,
//                 '0x48aE900E9Df45441B2001dB4dA92CE0E7C08c6d2',
//                 '0x2F66d5D7561e1bE587968cd336FA3623E5792dc2',
//                 '0xeb9ADe429FBA6c51a1B352a869417Bd410bC1421',
//                 '0xf1A1e46463362C0751Af4Ff46037D1815d66bB4D',
//                 '0x1E3005BD8281148f1b00bdcC94E8d0cD9DA242C2',
//                 '0x21761978a6F93D0bF5bAb5F75762880E8dc813e8',
//                 '0x5b3DBf9004E01509777329B762EC2332565F12fA',
//                 '0xB2b9FF858Bf74436685DaaF76d6901C2A24ef0C3',
//                 '0xe873Fa8436097Bcdfa593EEd60c10eFAd4244dC0',
//                 '0x182e0C610c4A855b81169385821C4c8690Af5f3b'
//             ]
//             for (var i = 0; i < addresses.length; i++) {
//                 const p = await waffle.provider.getBalance(addresses[i])
//                 previous.push(p)
//             }
//             console.log(`Total Raised: ${totalRaised/(10**18)}`)
//             console.log('---------')
//             await concavenft.withdraw();
//
//             for (var i = 0; i < addresses.length; i++) {
//                 const p = await waffle.provider.getBalance(addresses[i])
//                 let ch = p - previous[i]
//                 let bal = ((p - previous[i])/(10**18))
//                 console.log(
//                     names[i] || addresses[i],
//                     bal > 0 ? `+ ${bal}` : `- ${Math.abs(bal)}`,
//                     `(${(ch/totalRaised)*100} %)`
//                 )
//             }
//
//
//             expect(
//                 await waffle.provider.getBalance(concavenft.address)
//             ).to.equal(ethers.utils.parseEther((0).toString()))
//         }).timeout(0);
//         it(`if full sellout - after withdraw contract balance is 0 and allocations would be the above`, async () => {
//             await concavenft.unpause()
//             await mintAllColorsHolders()
//             expect(await concavenft.totalSupply()).to.equal(200);
//             await mintThirdParty(MAX_SUPPLY - 200)
//             expect(await concavenft.totalSupply()).to.equal(MAX_SUPPLY);
//             expect(
//                 await waffle.provider.getBalance(concavenft.address)
//             ).to.equal(ethers.utils.parseEther((price_in_ether*(MAX_SUPPLY-TOTAL_COLORS_QUOTA)).toString()))
//             const totalRaised = await waffle.provider.getBalance(concavenft.address);
//
//             const names = [
//                 'NFT                                       ',
//                 'Treasury                                  '
//             ]
//             const previous = []
//             const addresses = [
//                 concavenft.address,
//                 '0x48aE900E9Df45441B2001dB4dA92CE0E7C08c6d2',
//                 '0x2F66d5D7561e1bE587968cd336FA3623E5792dc2',
//                 '0xeb9ADe429FBA6c51a1B352a869417Bd410bC1421',
//                 '0xf1A1e46463362C0751Af4Ff46037D1815d66bB4D',
//                 '0x1E3005BD8281148f1b00bdcC94E8d0cD9DA242C2',
//                 '0x21761978a6F93D0bF5bAb5F75762880E8dc813e8',
//                 '0x5b3DBf9004E01509777329B762EC2332565F12fA',
//                 '0xB2b9FF858Bf74436685DaaF76d6901C2A24ef0C3',
//                 '0xe873Fa8436097Bcdfa593EEd60c10eFAd4244dC0',
//                 '0x182e0C610c4A855b81169385821C4c8690Af5f3b'
//             ]
//             for (var i = 0; i < addresses.length; i++) {
//                 const p = await waffle.provider.getBalance(addresses[i])
//                 previous.push(p)
//             }
//             console.log(`Total Raised: ${totalRaised/(10**18)}`)
//             console.log('---------')
//             await concavenft.withdraw();
//
//             for (var i = 0; i < addresses.length; i++) {
//                 const p = await waffle.provider.getBalance(addresses[i])
//                 let ch = p - previous[i]
//                 let bal = ((p - previous[i])/(10**18))
//                 console.log(
//                     names[i] || addresses[i],
//                     bal > 0 ? `+ ${bal}` : `- ${Math.abs(bal)}`,
//                     `(${(ch/totalRaised)*100} %)`
//                 )
//             }
//
//
//             expect(
//                 await waffle.provider.getBalance(concavenft.address)
//             ).to.equal(ethers.utils.parseEther((0).toString()))
//         }).timeout(0);
//     })
//     // it(``, async () => {})
// })

describe("Public Functions", () => {
    beforeEach(deploy)
    describe("mint()", () => {
        // modifiers
        // describe("whenNotPaused",() => {
        //     it(`mint should fail with "Pausable: paused" if minting when paused`, async () => {
        //         await expect(
        //             concavenft.connect(thirdParty).mint(1)
        //         ).to.be.revertedWith('Pausable: paused')
        //     })
        //     it(`mint should not fail with "Pausable: paused" if minting when not paused`, async () => {
        //         await concavenft.unpause()
        //         await expect(
        //             concavenft.connect(thirdParty).mint(1)
        //         ).to.not.be.revertedWith('Pausable: paused')
        //     })
        // })
        // general conditions
        describe("General Conditions", () => {
            // it(`mint should fail with "Max mint 10 per tx" if minting more than 10`, async () => {
            //     await concavenft.unpause()
            //     await expect(
            //         concavenft.connect(thirdParty).mint(11)
            //     ).to.be.revertedWith('Max mint 10 per tx')
            // })
            // it(`mint should fail with "Mint should be > 0" if minting 0`, async () => {
            //     await concavenft.unpause()
            //     await expect(
            //         concavenft.connect(thirdParty).mint(0)
            //     ).to.be.revertedWith('Mint should be > 0')
            // })
            // it(`succesfull sell out - 200 mints by holders and remaining by third party`, async () => {
            //     await concavenft.unpause()
            //     await mintAllColorsHolders()
            //     expect(await concavenft.totalSupply()).to.equal(200);
            //     await mintThirdParty(MAX_SUPPLY - 200)
            //     expect(await concavenft.totalSupply()).to.equal(MAX_SUPPLY);
            // }).timeout(0)
            it(`mint should fail with "not enough supply" if minting would exceed supply`, async () => {
                await concavenft.unpause()
                await mintAllColorsHolders()
                expect(await concavenft.totalSupply()).to.equal(200);
                await mintThirdParty(MAX_SUPPLY - 200)
                expect(await concavenft.totalSupply()).to.equal(MAX_SUPPLY);
                await expect(
                    concavenft.connect(thirdParty).mint(1,{value:ethers.utils.parseEther((price_in_ether).toString())})
                ).to.be.revertedWith('not enough supply')
            }).timeout(0)
        })
        // first 200 mints
        // describe("first 200 mints", () => {
        //     it(`mint should fail with "Not Colors Owner" if supply is < 200 and caller is non-colors holder`, async () => {
        //         await concavenft.unpause()
        //         await mintAllColorsHolders()
        //         expect(await concavenft.totalSupply()).to.equal(200);
        //     })
        //     it(`mint should fail with "Already minted your quota" if supply is < 200 and caller is colors holder minting more than quota`, async () => {
        //         await concavenft.unpause()
        //         // ["0xEeAf86E05A95261290a871Dd8cdB9470D5D3c9B7", 10],
        //         const signer = await getNewColorsMinter('0xEeAf86E05A95261290a871Dd8cdB9470D5D3c9B7')
        //         await concavenft.connect(signer).mint(10)
        //         await expect(
        //             concavenft.connect(signer).mint(1)
        //         ).to.be.revertedWith('Already minted your quota')
        //     })
        //     it(`mint should pass for the first 200 colors holders minting within quota`, async () => {
        //         await concavenft.unpause()
        //         await mintAllColorsHolders()
        //         expect(await concavenft.totalSupply()).to.equal(200);
        //     })
        // })
        // after 200 mints
        describe("After 200 mints", () => {
            it(`isPublicMintActive should return true after first 200 mints`, async () => {
                await concavenft.unpause()
                await mintAllColorsHolders()
                expect(await concavenft.totalSupply()).to.equal(200);
                expect(await concavenft.isPublicMintActive()).to.equal(true);
            })
            it(`mint should fail with "insufficient funds" if value isnt >= price*_mintAmount`, async () => {
                // await fundBalances()
                await concavenft.unpause()
                await mintAllColorsHolders()
                expect(await concavenft.totalSupply()).to.equal(200);
                expect(await concavenft.isPublicMintActive()).to.equal(true);
                await expect(
                    concavenft.connect(thirdParty).mint(1)
                )
                // .to.be.revertedWith('insufficient funds')
                .to.be.reverted
                await expect(
                    concavenft.connect(thirdParty).mint(2,{value:ethers.utils.parseEther((price_in_ether).toString())})
                )
                .to.be.reverted
                // .to.be.revertedWith('insufficient funds')
            })
            it('mint should pass if supply>200, value>price*_mintAmount if not colors holder', async () => {
                await concavenft.unpause()
                await mintAllColorsHolders()
                expect(await concavenft.totalSupply()).to.equal(200);
                expect(await concavenft.isPublicMintActive()).to.equal(true);
                await concavenft.connect(thirdParty).mint(1,{value:ethers.utils.parseEther((price_in_ether).toString())})
                await concavenft.connect(thirdParty).mint(2,{value:ethers.utils.parseEther((price_in_ether*2).toString())})
                expect(await concavenft.totalSupply()).to.equal(203);
            })
            it('mint should fail if supply>200 if value<price*_mintAmount if colors holder', async () => {
                // await fundBalances()
                await concavenft.unpause()
                await mintAllColorsHolders()
                expect(await concavenft.totalSupply()).to.equal(200);
                expect(await concavenft.isPublicMintActive()).to.equal(true);
                await concavenft.connect(thirdParty).mint(1,{value:ethers.utils.parseEther((price_in_ether).toString())})
                await concavenft.connect(thirdParty).mint(2,{value:ethers.utils.parseEther((price_in_ether*2).toString())})
                const signer = await getNewColorsMinter('0xEeAf86E05A95261290a871Dd8cdB9470D5D3c9B7')
                await expect(
                    concavenft.connect(signer).mint(10)
                )
                .to.be.reverted
                // .to.be.revertedWith('insufficient funds')
                // expect(await concavenft.totalSupply()).to.equal(203);
            })
            it('mint should pass if supply>200 if value>=price*_mintAmount if colors holder', async () => {
                await concavenft.unpause()
                await mintAllColorsHolders()
                expect(await concavenft.totalSupply()).to.equal(200);
                expect(await concavenft.isPublicMintActive()).to.equal(true);
                await concavenft.connect(thirdParty).mint(1,{value:ethers.utils.parseEther((price_in_ether).toString())})
                await concavenft.connect(thirdParty).mint(2,{value:ethers.utils.parseEther((price_in_ether*2).toString())})
                const signer = await getNewColorsMinter('0xEeAf86E05A95261290a871Dd8cdB9470D5D3c9B7')
                await concavenft.connect(signer).mint(10,{value:ethers.utils.parseEther((price_in_ether*10).toString())})
                expect(await concavenft.totalSupply()).to.equal(213);
            })
        })
        describe("Manually setting to public before 200 mints", () => {
            it("if supply < 200 and owner calls setPublicMintActive - mint should fail with 'insufficient funds' if value<price*_mintAmount", async () => {
                // await fundBalances()
                await concavenft.unpause()
                // ["0xEeAf86E05A95261290a871Dd8cdB9470D5D3c9B7", 10],
                const signer = await getNewColorsMinter('0xEeAf86E05A95261290a871Dd8cdB9470D5D3c9B7')
                await concavenft.connect(signer).mint(10)
                await concavenft.setPublicMintActive(true);
                // await mintThirdParty(10)
                await expect(
                    concavenft.connect(thirdParty).mint(10)
                )
                .to.be.reverted
                // .to.be.revertedWith('insufficient funds')
            })
            it("if supply < 200 and owner calls setPublicMintActive - mint should pass if value>=price*_mintAmount", async () => {
                await concavenft.unpause()
                // ["0xEeAf86E05A95261290a871Dd8cdB9470D5D3c9B7", 10],
                const signer = await getNewColorsMinter('0xEeAf86E05A95261290a871Dd8cdB9470D5D3c9B7')
                await concavenft.connect(signer).mint(10)
                await concavenft.setPublicMintActive(true);
                // await mintThirdParty(10)
                await concavenft.connect(thirdParty).mint(10,{value:ethers.utils.parseEther((price_in_ether*10).toString())})
                expect(await concavenft.totalSupply()).to.equal(20);
            })
        })
    })
})



// TODO:
// withdraw()



// const TheColors = await ethers.getContractFactory("TheColors");
// const thecolors = await TheColors.attach(colorsAddress);
// let bal = await thecolors.balanceOf('0xEeAf86E05A95261290a871Dd8cdB9470D5D3c9B7')
// console.log({bal})
// bal = await concavenft.balanceOf('0xEeAf86E05A95261290a871Dd8cdB9470D5D3c9B7')
// console.log({bal})
// console.log('deployer',deployer.address)
// console.log('concavenft',concavenft.address)
