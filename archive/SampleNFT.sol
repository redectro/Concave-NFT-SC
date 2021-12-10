// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SampleNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("SampleNFT", "SNFT") {}

    function mintMany(uint256 _amount) public {
        for (uint i = 0; i < _amount; i++) {
            _mint(msg.sender, _tokenIds.current());
            _tokenIds.increment();
        }
    }
}
