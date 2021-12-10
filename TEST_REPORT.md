# Testing

## Summary

The only contract in this project is `ConcaveNFT` located on `./contracts/Concave.sol`.

It inherits from the following \@openzeppelin contracts:
 - `ERC721Enumerable`
 - `Pausable`
 - `Ownable`

And uses the following libraries also from \@openzeppelin:
 - `Strings` for `uint256`
 - `Counters` for `Counters.Counter`

## Testing

The only contract tested was `ConcaveNFT` located on `./contracts/Concave.sol`.

The tests performed are in `./tests/test.js`.

Testing was done with `npx hardhat test`.

Coverage was done with `npx hardhat coverage` using [https://github.com/sc-forks/solidity-coverage](solidity-coverage).

## Approach

All methods, variables, and lines of code were testing from the point of view of how they should behave and how they shouldn't. The `mint()` function is the only `public` non-`view` function not protected by `onlyOwner` - so a particular effort was made in devising as many scenarios as possible to test this function.

## Coverage

100% of Statements, branches, functions, and lines were covered. More detailed information can be found by cloning this repo and opening `coverage/index.html` on a browser.

```
66 passing (3m)

--------------|----------|----------|----------|----------|----------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------|----------|----------|----------|----------|----------------|
contracts/    |      100 |      100 |      100 |      100 |                |
Concave.sol   |      100 |      100 |      100 |      100 |                |
--------------|----------|----------|----------|----------|----------------|
All files     |      100 |      100 |      100 |      100 |                |
--------------|----------|----------|----------|----------|----------------|

> Istanbul reports written to ./coverage/ and ./coverage.json
```

## Test Details

The following is the report of all tested statements - a total of 65 tests. Of course the statements are useless unless the code used to test the statements is appropriate. All the tests can be found in `test/test.js`.

In the below report, `>_` indicates that the contract was redeployed before the beginning of that test.


```
☁  Concave-NFT-SC [main] ⚡  yarn test
yarn run v1.22.10
warning package.json: No license field
$ npx hardhat test

  ConcaveNFT: Reads public constants
>_
    ✓ THE_COLORS is "0x9fdb31F8CE3cB8400C7cCb2299492F2A498330a4"
    ✓ TREASURY is "0x48aE900E9Df45441B2001dB4dA92CE0E7C08c6d2"
    ✓ MAX_SUPPLY is "4317"
    ✓ TOTAL_COLORS_QUOTA is "200"

  ConcaveNFT: Reads public variables
>_
    ✓ name is "ConcaveName"
    ✓ symbol is "ConcaveSymbol"
    ✓ baseURI is "ipfs://BaseURI/"
    ✓ notRevealedUri is "ipfs://unrevealedURI/"
    ✓ maxMintAmount is "10"
    ✓ price is "0.04"
    ✓ revealed is "false"
    ✓ paused is "true"
    ✓ owner is "true"
    ✓ isPublicMintActive is "false"

  ConcaveNFT: Owner functions
    unpause()
>_
      ✓ Third party calling unpause() should revert with "Ownable: caller is not the owner"
>_
      ✓ Owner calling unpause() should not revert
>_
      ✓ After owner calling unpause() - "paused" should be "false"
    pause()
>_
      ✓ Third party calling pause() should revert with "Ownable: caller is not the owner"
>_
      ✓ Owner calling pause() should revert with "Pausable: paused"
>_
      ✓ If paused=false - owner calling pause() should not revert
>_
      ✓ After calling pause() - paused should=true
    reveal()
>_
      ✓ Third party calling reveal() should revert with "Ownable: caller is not the owner"
>_
      ✓ Owner calling reveal() should pass"
>_
      ✓ Calling reveal() should make reveal=true
    setNotRevealedURI()
>_
      ✓ Third party calling setNotRevealedURI() should revert with "Ownable: caller is not the owner"
>_
      ✓ Owner calling setNotRevealedURI() should pass"
>_
      ✓ Calling setNotRevealedURI() with parameter "test" should set notRevealedUri="test"
>_
      ✓ Owner can call setNotRevealedURI multiple times
    setBaseURI()
>_
      ✓ Third party calling setBaseURI() should revert with "Ownable: caller is not the owner"
>_
      ✓ Owner calling setBaseURI() should pass"
>_
      ✓ Calling setBaseURI() with parameter "test" should set baseURI="test"
>_
      ✓ Owner can call setBaseURI multiple times
    setMaxMintAmount()
>_
      ✓ Third party calling setMaxMintAmount() should revert with "Ownable: caller is not the owner"
>_
      ✓ Owner calling setMaxMintAmount() should pass"
>_
      ✓ Calling setMaxMintAmount() with parameter "40" should set maxMintAmount="40"
>_
      ✓ Owner can call setMaxMintAmount multiple times
    setPrice()
>_
      ✓ Third party calling setPrice() should revert with "Ownable: caller is not the owner"
>_
      ✓ Owner calling setPrice() should pass"
>_
      ✓ Calling setPrice() with parameter "40" should set maxMintAmount="40"
>_
      ✓ Owner can call setPrice multiple times
    setPublicMintActive()
>_
      ✓ Third party calling setPublicMintActive() should revert with "Ownable: caller is not the owner"
>_
      ✓ Owner calling setPublicMintActive() should pass"
>_
      ✓ Calling setPublicMintActive() with parameter "true" should make isPublicMintActive return "true"
>_
      ✓ Owner can call setPublicMintActive multiple times
    tokenURI()
>_
      ✓ Calling tokenURI() on nonexistent tokenId should revert with "ERC721Metadata: URI query for nonexistent token"
>_
      ✓ Calling tokenURI() on an existing tokenId when not revealed should return "ipfs://unrevealedURI/"
>_
      ✓ Calling tokenURI() on an existing tokenId 0 after reveal should return "ipfs://BaseURI/0.json"
    withdraw()
>_
      ✓ after succesfull sellout - contract balance should equal 164.68
>_
Total Raised: 0.04
---------
NFT                                        - 0.04 (-100 %)
Treasury                                   + 0.024 (60 %)
0x2F66d5D7561e1bE587968cd336FA3623E5792dc2 + 0.0036 (9 %)
0xeb9ADe429FBA6c51a1B352a869417Bd410bC1421 + 0.002 (5 %)
0xf1A1e46463362C0751Af4Ff46037D1815d66bB4D + 0.002 (5 %)
0x1E3005BD8281148f1b00bdcC94E8d0cD9DA242C2 + 0.002 (5 %)
0x21761978a6F93D0bF5bAb5F75762880E8dc813e8 + 0.0016 (4 %)
0x5b3DBf9004E01509777329B762EC2332565F12fA + 0.0016 (4 %)
0xB2b9FF858Bf74436685DaaF76d6901C2A24ef0C3 + 0.0008 (2 %)
0xe873Fa8436097Bcdfa593EEd60c10eFAd4244dC0 + 0.0016 (4 %)
0x182e0C610c4A855b81169385821C4c8690Af5f3b + 0.0008 (2 %)
      ✓ if sold 1 NFT - after withdraw contract balance is 0 and allocations would be the above
>_
Total Raised: 164.68
---------
NFT                                        - 164.68 (-100 %)
Treasury                                   + 98.808 (60 %)
0x2F66d5D7561e1bE587968cd336FA3623E5792dc2 + 14.8212 (9 %)
0xeb9ADe429FBA6c51a1B352a869417Bd410bC1421 + 8.234 (5 %)
0xf1A1e46463362C0751Af4Ff46037D1815d66bB4D + 8.234 (5 %)
0x1E3005BD8281148f1b00bdcC94E8d0cD9DA242C2 + 8.234 (5 %)
0x21761978a6F93D0bF5bAb5F75762880E8dc813e8 + 6.5872 (4 %)
0x5b3DBf9004E01509777329B762EC2332565F12fA + 6.5872 (4 %)
0xB2b9FF858Bf74436685DaaF76d6901C2A24ef0C3 + 3.2936 (2 %)
0xe873Fa8436097Bcdfa593EEd60c10eFAd4244dC0 + 6.5872 (4 %)
0x182e0C610c4A855b81169385821C4c8690Af5f3b + 3.2936 (2 %)
      ✓ if full sellout - after withdraw contract balance is 0 and allocations would be the above

  Public Functions
    mint()
      whenNotPaused
>_
        ✓ mint should fail with "Pausable: paused" if minting when paused
>_
        ✓ mint should not fail with "Pausable: paused" if minting when not paused
      General Conditions
>_
        ✓ mint should fail with "Max mint 10 per tx" if minting more than 10
>_
        ✓ succesfull sell out - 200 mints by holders and remaining by third party
>_
        ✓ mint should fail with "not enough supply" if minting would exceed supply
      first 200 mints
>_
        ✓ mint should fail with "Not Colors Owner" if supply is < 200 and caller is non-colors holder
>_
        ✓ mint should fail with "Already minted your quota" if supply is < 200 and caller is colors holder minting more than quota
>_
        ✓ mint should pass for the first 200 colors holders minting within quota
      After 200 mints
>_
        ✓ isPublicMintActive should return true after first 200 mints
>_
        ✓ mint should fail with "insufficient funds" if value isnt >= price*_mintAmount
>_
        ✓ mint should pass if supply>200, value>price*_mintAmount if not colors holder
>_
        ✓ mint should fail if supply>200 if value<price*_mintAmount if colors holder
>_
        ✓ mint should pass if supply>200 if value>=price*_mintAmount if colors holder
      Manually setting to public before 200 mints
>_
        ✓ if supply < 200 and owner calls setPublicMintActive - mint should fail with 'insufficient funds' if value<price*_mintAmount
>_
        ✓ if supply < 200 and owner calls setPublicMintActive - mint should pass if value>=price*_mintAmount


  65 passing (2m)

✨  Done in 126.35s.
☁  Concave-NFT-SC [main] ⚡
```

## Gas Usage

The following report is of the gas usage during all the functions. Particularly notable is the `mint()` function costing an average of `1,193,097` gas in 1938 runs. The majority of the `mint()` calls in this test were calls to mint the maximum number of tokens - 10 - `mint(10)`.

Below this table is a report of the mint function when minting only 1 - `mint(1)`.

```
·--------------------------------------|----------------------------|-------------|-----------------------------·
|         Solc version: 0.8.4          ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
·······································|····························|·············|······························
|  Methods                             ·               100 gwei/gas               ·       4197.40 usd/eth       │
···············|·······················|·············|··············|·············|···············|··············
|  Contract    ·  Method               ·  Min        ·  Max         ·  Avg        ·  # calls      ·  usd (avg)  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  mint                 ·     159911  ·     1254567  ·    1193097  ·         1938  ·     500.79  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  pause                ·          -  ·           -  ·      28121  ·            2  ·      11.80  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  reveal               ·          -  ·           -  ·      45798  ·            3  ·      19.22  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  setBaseURI           ·      26971  ·       32018  ·      31004  ·            5  ·      13.01  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  setMaxMintAmount     ·          -  ·           -  ·      29049  ·            5  ·      12.19  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  setNotRevealedURI    ·      27057  ·       32104  ·      31090  ·            5  ·      13.05  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  setPrice             ·          -  ·           -  ·      29025  ·            5  ·      12.18  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  setPublicMintActive  ·      24295  ·       46207  ·      43077  ·            7  ·      18.08  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  unpause              ·          -  ·           -  ·      28118  ·           23  ·      11.80  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  withdraw             ·     121614  ·      321614  ·     221614  ·            2  ·      93.02  │
···············|·······················|·············|··············|·············|···············|··············
|  Deployments                         ·                                          ·  % of limit   ·             │
·······································|·············|··············|·············|···············|··············
|  ConcaveNFT                          ·          -  ·           -  ·    4630855  ·       15.4 %  ·    1943.76  │
·--------------------------------------|-------------|--------------|-------------|---------------|-------------·

```

Minting only 1 - `mint(1)` - costs an average of `167,240` in gas:

```
·--------------------------------------|----------------------------|-------------|-----------------------------·
|         Solc version: 0.8.4          ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
·······································|····························|·············|······························
|  Methods                             ·               100 gwei/gas               ·       4162.64 usd/eth       │
···············|·······················|·············|··············|·············|···············|··············
|  Contract    ·  Method               ·  Min        ·  Max         ·  Avg        ·  # calls      ·  usd (avg)  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  mint                 ·     159911  ·     1234541  ·     167240  ·         5327  ·      69.62  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  setPublicMintActive  ·          -  ·           -  ·      46207  ·            2  ·      19.23  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  unpause              ·          -  ·           -  ·      28118  ·            8  ·      11.70  │
···············|·······················|·············|··············|·············|···············|··············
|  Deployments                         ·                                          ·  % of limit   ·             │
·······································|·············|··············|·············|···············|··············
|  ConcaveNFT                          ·          -  ·           -  ·    4630855  ·       15.4 %  ·    1927.66  │
·--------------------------------------|-------------|--------------|-------------|---------------|-------------·
```
