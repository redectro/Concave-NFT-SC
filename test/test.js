const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");


const THE_COLORS = '0x9fdb31F8CE3cB8400C7cCb2299492F2A498330a4';
const TREASURY = '0x48aE900E9Df45441B2001dB4dA92CE0E7C08c6d2';
const MAX_SUPPLY = 4317;
const TOTAL_COLORS_QUOTA = 200;


const _name = 'ConcaveName';
const _symbol = 'ConcaveSymbol';
const _initBaseURI = 'Base URI';
const _initNotRevealedUri = 'Unrevealed Base URI';
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

    // it(``, async () => {})
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

    // it(``, async () => {})
});

describe("ConcaveNFT: Owner functions", () => {
    beforeEach(deploy)
    describe("unpause()", () => {
        it(`Contract is paused upon deployment`, async () => {
            expect(await concavenft.paused()).to.equal(paused);
        })
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

    // it(``, async () => {})
})
