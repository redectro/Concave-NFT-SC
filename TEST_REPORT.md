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

All methods, variables, and lines of code were testing from the point of view of how they should behave and how they shouldn't. The following functions are the only `public` non-`view` functions not protected by `onlyOwner` - so a particular effort was made in devising as many scenarios as possible to test this function:

 - `mint()`
 - `mintMany(uint256 _mintAmount)`
 - `mintColorsOnce(uint256 tokenId)`
 - `mintColorsBatch(uint256[] memory tokenIds)`


## Coverage

100% of Statements, branches, functions, and lines were covered. More detailed information can be found by cloning this repo and opening `coverage/index.html` on a browser.

```
102 passing (20m)

--------------|----------|----------|----------|----------|----------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------|----------|----------|----------|----------|----------------|
contracts/   |      100 |      100 |      100 |      100 |                |
Concave.sol |      100 |      100 |      100 |      100 |                |
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
Compiling 15 files with 0.8.4
Compilation finished successfully

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
      public sale active check
>_
        ✓ mint should fail with "public sale not active" if public sale not active yet
>_
        ✓ mint should not fail with "public sale not active" if public sale is active
      sold out check
>_
        ✓ mint should fail with "sold out" if isSoldOut=true
>_
        ✓ mint should not fail with "sold out" if isSoldOut=false
      insufficent funds check
>_
        ✓ mint should fail with "insufficient funds" if msg.value < price
>_
        ✓ mint should pass if msg.value >= price
      counting
>_
        ✓ totalSupply should increase by 1 after mint()
    mintColorsBatch()
      whenNotPaused
>_
        ✓ mintColorsBatch should fail with "Pausable: paused" if minting when paused
>_
        ✓ mintColorsBatch should not fail with "Pausable: paused" if minting when not paused
      presale check
>_
        ✓ mintColorsBatch should fail with "presale over" if public sale not active yet
>_
        ✓ mintColorsBatch should not fail with "presale over" if public sale is active
      max mint 10 check, min mint 0 check
>_
        ✓ mintColorsBatch should fail with "Max mint 10 per tx" if mintColorsBatch(>10)
>_
        ✓ mintColorsBatch should not fail with "Max mint 10 per tx" if mintColorsBatch(<10)
>_
        ✓ mintColorsBatch should fail with "Mint should be > 0" if mintColorsBatch(0)
>_
        ✓ mintColorsBatch should not fail with "Mint should be > 0" if mintColorsBatch(>0)
      claimed token check
>_
        ✓ shoud fail not fail with "Color already claimed." if tokenId not claimed
>_
        ✓ shoud fail with "Color already claimed." if tokenId already claimed
      owner of token check
>_
        ✓ shoud fail not fail with "Only owner can claim." if owner is sender
>_
        ✓ shoud fail with "Only owner can claim." if owner is not sender
    mintColorsOnce()
      whenNotPaused
>_
        ✓ mintColorsOnce should fail with "Pausable: paused" if minting when paused
>_
        ✓ mintColorsBatch should not fail with "Pausable: paused" if minting when not paused
      presale check
>_
        ✓ mintColorsOnce should fail with "presale over" if public sale not active yet
>_
        ✓ mintColorsBatch should not fail with "presale over" if public sale is active
      claimed token check
>_
        ✓ shoud fail not fail with "Color already claimed." if tokenId not claimed
>_
        ✓ shoud fail with "Color already claimed." if tokenId already claimed
      owner of token check
>_
        ✓ shoud fail not fail with "Only owner can claim." if owner is sender
>_
        ✓ shoud fail with "Only owner can claim." if owner is not sender
    mintMany()
      whenNotPaused
>_
        ✓ mintMany should fail with "Pausable: paused" if minting when paused
>_
        ✓ mintMany should not fail with "Pausable: paused" if minting when not paused
      public sale active check
>_
        ✓ mintMany should fail with "public sale not active" if public sale not active yet
>_
        ✓ mintMany should not fail with "public sale not active" if public sale is active
      sold out check
>_
        ✓ mintMany should fail with "sold out" if isSoldOut=true
>_
        ✓ mintMany should not fail with "sold out" if isSoldOut=false
      max mint 10 check, min mint 0 check
>_
        ✓ mintMany should fail with "Max mint 10 per tx" if mintMany(>10)
>_
        ✓ mintMany should not fail with "Max mint 10 per tx" if mintMany(<10)
>_
        ✓ mintMany should fail with "Mint should be > 0" if mintMany(0)
>_
        ✓ mintMany should not fail with "" if mintMany(>0)
      exceeds supply
>_
        ✓ mintMany should fail with "exceeds supply" if totalSupply+_mintAmount>MAX_SUPPLY
>_
        ✓ mintMany should not fail with "exceeds supply" if totalSupply+_mintAmount<=MAX_SUPPLY
      insufficent funds check
>_
        ✓ mintMany should fail with "insufficient funds" if msg.value < price
>_
        ✓ mintMany should pass if msg.value >= price
      counting
>_
        ✓ totalSupply should increase by 5 after mintMany(5)

  Public View Functions
    isPublicMintActive
>_
      ✓ shoud return false when supply < 200 or _isPublicMintActive=false
>_
      ✓ shoud return true when supply >= 200
>_
      ✓ shoud return true when setPublicMintActive set to true even if supply < 200
    isSoldOut
>_
      ✓ shoud return false when supply < 4317
>_
      ✓ shoud return true when supply = 4317
    getUnmintedSpoonsByUser
>_
      ✓ shoud return array of unminted colors by colors owner
>_
      ✓ shoud return array of unminted colors by colors owner that matches array from TheColors contract
>_
      ✓ when minting one - array should exclude minted token

·--------------------------------------|----------------------------|-------------|-----------------------------·
|         Solc version: 0.8.4          ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
·······································|····························|·············|······························
|  Methods                             ·               100 gwei/gas               ·       4036.34 usd/eth       │
···············|·······················|·············|··············|·············|···············|··············
|  Contract    ·  Method               ·  Min        ·  Max         ·  Avg        ·  # calls      ·  usd (avg)  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  mint                 ·     129767  ·      153126  ·     137553  ·            3  ·      55.52  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  mintColorsBatch      ·     159906  ·     1468752  ·    1241978  ·          217  ·     501.30  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  mintColorsOnce       ·          -  ·           -  ·     156401  ·            5  ·      63.13  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  mintMany             ·     248736  ·     1201279  ·    1199322  ·         2475  ·     484.09  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  pause                ·          -  ·           -  ·      28099  ·            2  ·      11.34  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  reveal               ·          -  ·           -  ·      45754  ·            3  ·      18.47  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  setBaseURI           ·      27080  ·       32127  ·      31113  ·            5  ·      12.56  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  setMaxMintAmount     ·          -  ·           -  ·      28960  ·            5  ·      11.69  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  setNotRevealedURI    ·      27035  ·       32082  ·      31068  ·            5  ·      12.54  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  setPrice             ·          -  ·           -  ·      29025  ·            5  ·      11.72  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  setPublicMintActive  ·      24207  ·       46119  ·      45166  ·           23  ·      18.23  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  unpause              ·          -  ·           -  ·      28118  ·           53  ·      11.35  │
···············|·······················|·············|··············|·············|···············|··············
|  ConcaveNFT  ·  withdraw             ·     121614  ·      321614  ·     221614  ·            2  ·      89.45  │
···············|·······················|·············|··············|·············|···············|··············
|  Deployments                         ·                                          ·  % of limit   ·             │
·······································|·············|··············|·············|···············|··············
|  ConcaveNFT                          ·          -  ·           -  ·    5313095  ·       17.7 %  ·    2144.55  │
·--------------------------------------|-------------|--------------|-------------|---------------|-------------·

  102 passing (15m)

✨  Done in 898.80s.
```
