const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

const _name = 'ConcaveName';
const _symbol = 'ConcaveSymbol';
const _initBaseURI = 'Base URI';
const _initNotRevealedUri = 'Unrevealed Base URI';

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

    it(`name is ${_name}`, async () => {
        await concavenft.name();
    })
    it(`symbol is ${_symbol}`, async () => {
        await concavenft.symbol();
    })
    it(`baseURI is ${_initBaseURI}`, async () => {
        await concavenft.baseURI();
    })
    it(`notRevealedUri is ${_initNotRevealedUri}`, async () => {
        await concavenft.notRevealedUri();
    })



    it(``, async () => {})
});
