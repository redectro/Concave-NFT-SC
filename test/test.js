const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

const _name = 'ConcaveName';
const _symbol = 'ConcaveSymbol';
const _initBaseURI = 'Base URI';
const _initNotRevealedUri = 'Unrevealed Base URI';
const maxMintAmount = 10;
const price_in_ether = 0.04;
const price = ethers.utils.parseEther(price_in_ether.toString());
const revealed = false;

describe("ConcaveNFT", () => {
    let ConcaveNFT;
    let concavenft;

    beforeEach(async () => {
        ConcaveNFT = await ethers.getContractFactory("ConcaveNFT");
        concavenft = await ConcaveNFT.deploy(
            _name,
            _symbol,
            _initBaseURI,
            _initNotRevealedUri
        );
    })

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



    it(``, async () => {})
});
