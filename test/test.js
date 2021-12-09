const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

const colorsOwner = "0xfA8F061675f46CB9e71308BDf3C1C15E35011AC2"
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

const mint = async (colorsOwnerSigner,_mintAmount) => {
    await concavenft.connect(colorsOwnerSigner).mint(_mintAmount);
}

/*
describe("ConcaveNFT: Reads public constants", () => {
    before(deploy)

    it(`THE_COLORS is "${THE_COLORS}"`, async () => {
        expect(await concavenft.THE_COLORS()).to.equal(THE_COLORS)
    })
    it(`TREASURY is "${TREASURY}"`, async () => {
        expect(await concavenft.TREASURY()).to.equal(TREASURY)
    })
    it(`MAX_SUPPLY is "${MAX_SUPPLY}"`, async () => {
        expect(await concavenft.MAX_SUPPLY()).to.equal(MAX_SUPPLY)
    })
    it(`TOTAL_COLORS_QUOTA is "${TOTAL_COLORS_QUOTA}"`, async () => {
        expect(await concavenft.TOTAL_COLORS_QUOTA()).to.equal(TOTAL_COLORS_QUOTA)
    })

});

describe("ConcaveNFT: Reads public variables", () => {
    before(deploy)

    it(`name is "${_name}"`, async () => {
        expect(await concavenft.name()).to.equal(_name)
    })
    it(`symbol is "${_symbol}"`, async () => {
        expect(await concavenft.symbol()).to.equal(_symbol)
    })
    it(`baseURI is "${_initBaseURI}"`, async () => {
        expect(await concavenft.baseURI()).to.equal(_initBaseURI)
    })
    it(`notRevealedUri is "${_initNotRevealedUri}"`, async () => {
        expect(await concavenft.notRevealedUri()).to.equal(_initNotRevealedUri)
    })
    it(`maxMintAmount is "${maxMintAmount}"`, async () => {
        expect(await concavenft.maxMintAmount()).to.equal(maxMintAmount)
    })
    it(`price is "${ethers.utils.formatEther(price)}"`, async () => {
        expect(await concavenft.price()).to.equal(price)
    })
    it(`revealed is "${revealed}"`, async () => {
        expect(await concavenft.revealed()).to.equal(revealed)
    })
    it(`paused is "${paused}"`, async () => {
        expect(await concavenft.paused()).to.equal(paused)
    })
    it(`owner is "${paused}"`, async () => {
        expect(await concavenft.owner()).to.equal(deployer.address)
    })
    it(`isPublicMintActive is "${false}"`, async () => {
        expect(await concavenft.isPublicMintActive()).to.equal(false)
    })

});
*/
describe("ConcaveNFT: Owner functions", () => {
    beforeEach(deploy)
    /*
    describe("unpause()", () => {
        it(`Third party calling unpause() should revert with "Ownable: caller is not the owner"`, async () => {
            await expect(
                concavenft.connect(thirdParty).unpause()
            ).to.be.revertedWith('Ownable: caller is not the owner')
        })
        it(`Owner calling unpause() should not revert`, async () => {
            await concavenft.unpause()
        })
        it(`After owner calling unpause() - "paused" should be "false"`, async () => {
            await concavenft.unpause()
            expect(await concavenft.paused()).to.equal(false)
        })
    })

    describe("pause()", () => {
        it(`Third party calling pause() should revert with "Ownable: caller is not the owner"`, async () => {
            await expect(
                concavenft.connect(thirdParty).pause()
            ).to.be.revertedWith('Ownable: caller is not the owner')
        })
        it(`Owner calling pause() should revert with "Pausable: paused"`, async () => {
            await expect(
                concavenft.pause()
            ).to.be.revertedWith('Pausable: paused')
        })
        it(`If paused=false - owner calling pause() should not revert`, async () => {
            await concavenft.unpause();
            await concavenft.pause();
        })
        it(`After calling pause() - paused should=true`, async () => {
            await concavenft.unpause();
            await concavenft.pause();
            expect(await concavenft.paused()).to.equal(true)
        })
    })

    describe("reveal()", () => {
        it(`Third party calling reveal() should revert with "Ownable: caller is not the owner"`, async () => {
            await expect(
                concavenft.connect(thirdParty).reveal()
            ).to.be.revertedWith('Ownable: caller is not the owner')
        })
        it(`Owner calling reveal() should pass"`, async () => {
            await concavenft.reveal();
        })
        it(`Calling reveal() should make reveal=true`, async () => {
            await concavenft.reveal();
            expect(await concavenft.revealed()).to.equal(true);
        })
    })

    describe("setNotRevealedURI()", () => {
        it(`Third party calling setNotRevealedURI() should revert with "Ownable: caller is not the owner"`, async () => {
            await expect(
                concavenft.connect(thirdParty).setNotRevealedURI("")
            ).to.be.revertedWith('Ownable: caller is not the owner')
        })
        it(`Owner calling setNotRevealedURI() should pass"`, async () => {
            await concavenft.setNotRevealedURI("");
        })
        it(`Calling setNotRevealedURI() with parameter "test" should set notRevealedUri="test"`, async () => {
            await concavenft.setNotRevealedURI("test");
            expect(await concavenft.notRevealedUri()).to.equal("test");
        })
        it(`Owner can call setNotRevealedURI multiple times`, async () => {
            await concavenft.setNotRevealedURI("test");
            expect(await concavenft.notRevealedUri()).to.equal("test");
            await concavenft.setNotRevealedURI("test2");
            expect(await concavenft.notRevealedUri()).to.equal("test2");
            await concavenft.setNotRevealedURI("test3");
            expect(await concavenft.notRevealedUri()).to.equal("test3");
        })
    })

    describe("setBaseURI()", () => {
        it(`Third party calling setBaseURI() should revert with "Ownable: caller is not the owner"`, async () => {
            await expect(
                concavenft.connect(thirdParty).setBaseURI("")
            ).to.be.revertedWith('Ownable: caller is not the owner')
        })
        it(`Owner calling setBaseURI() should pass"`, async () => {
            await concavenft.setBaseURI("");
        })
        it(`Calling setBaseURI() with parameter "test" should set baseURI="test"`, async () => {
            await concavenft.setBaseURI("test");
            expect(await concavenft.baseURI()).to.equal("test");
        })
        it(`Owner can call setBaseURI multiple times`, async () => {
            await concavenft.setBaseURI("test");
            expect(await concavenft.baseURI()).to.equal("test");
            await concavenft.setBaseURI("test2");
            expect(await concavenft.baseURI()).to.equal("test2");
            await concavenft.setBaseURI("test3");
            expect(await concavenft.baseURI()).to.equal("test3");
        })
    })

    describe("setMaxMintAmount()", () => {
        it(`Third party calling setMaxMintAmount() should revert with "Ownable: caller is not the owner"`, async () => {
            await expect(
                concavenft.connect(thirdParty).setMaxMintAmount(20)
            ).to.be.revertedWith('Ownable: caller is not the owner')
        })
        it(`Owner calling setMaxMintAmount() should pass"`, async () => {
            await concavenft.setMaxMintAmount(20);
        })
        it(`Calling setMaxMintAmount() with parameter "40" should set maxMintAmount="40"`, async () => {
            await concavenft.setMaxMintAmount(40);
            expect(await concavenft.maxMintAmount()).to.equal(40);
        })
        it(`Owner can call setMaxMintAmount multiple times`, async () => {
            await concavenft.setMaxMintAmount(40);
            expect(await concavenft.maxMintAmount()).to.equal(40);
            await concavenft.setMaxMintAmount(50);
            expect(await concavenft.maxMintAmount()).to.equal(50);
            await concavenft.setMaxMintAmount(60);
            expect(await concavenft.maxMintAmount()).to.equal(60);
        })
    })

    describe("setPrice()", () => {
        it(`Third party calling setPrice() should revert with "Ownable: caller is not the owner"`, async () => {
            await expect(
                concavenft.connect(thirdParty).setPrice(20)
            ).to.be.revertedWith('Ownable: caller is not the owner')
        })
        it(`Owner calling setPrice() should pass"`, async () => {
            await concavenft.setPrice(20);
        })
        it(`Calling setPrice() with parameter "40" should set maxMintAmount="40"`, async () => {
            await concavenft.setPrice(40);
            expect(await concavenft.price()).to.equal(40);
        })
        it(`Owner can call setPrice multiple times`, async () => {
            await concavenft.setPrice(40);
            expect(await concavenft.price()).to.equal(40);
            await concavenft.setPrice(50);
            expect(await concavenft.price()).to.equal(50);
            await concavenft.setPrice(60);
            expect(await concavenft.price()).to.equal(60);
        })
    })

    describe("setPublicMintActive()", () => {
        it(`Third party calling setPublicMintActive() should revert with "Ownable: caller is not the owner"`, async () => {
            await expect(
                concavenft.connect(thirdParty).setPublicMintActive(true)
            ).to.be.revertedWith('Ownable: caller is not the owner')
        })
        it(`Owner calling setPublicMintActive() should pass"`, async () => {
            await concavenft.setPublicMintActive(true);
        })
        it(`Calling setPublicMintActive() with parameter "true" should make isPublicMintActive return "true"`, async () => {
            await concavenft.setPublicMintActive(true);
            expect(await concavenft.isPublicMintActive()).to.equal(true);
        })
        it(`Owner can call setPublicMintActive multiple times`, async () => {
            await concavenft.setPublicMintActive(true);
            expect(await concavenft.isPublicMintActive()).to.equal(true);
            await concavenft.setPublicMintActive(false);
            expect(await concavenft.isPublicMintActive()).to.equal(false);
            await concavenft.setPublicMintActive(true);
            expect(await concavenft.isPublicMintActive()).to.equal(true);
        })
    })
    */
    describe("tokenURI()", () => {
        it(`Calling tokenURI() on nonexistent tokenId should revert with "ERC721Metadata: URI query for nonexistent token"`, async () => {
            await expect(
                concavenft.tokenURI(0)
            ).to.be.revertedWith("ERC721Metadata: URI query for nonexistent token")
        })
        it(`Calling tokenURI() on an existing tokenId when not revealed should return "${_initNotRevealedUri}"`, async () => {
            await concavenft.unpause();
            await getColorsMinter()
            await mint(colorsOwnerSigner,1)
            expect(
                await concavenft.tokenURI(0)
            ).to.equal(_initNotRevealedUri)
        })
        it(`Calling tokenURI() on an existing tokenId 0 after reveal should return "${_initBaseURI}0.json"`, async () => {
            await concavenft.unpause();
            await getColorsMinter()
            await mint(colorsOwnerSigner,1)
            await concavenft.reveal();
            expect(
                await concavenft.tokenURI(0)
            ).to.equal(`${_initBaseURI}0.json`)
        })
    })

    // it(``, async () => {})
})



// TODO:
// withdraw()
