// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 The Concave Spoons
 */

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ConcaveNFT is ERC721Enumerable, Pausable, Ownable {

    using Strings for uint256;
    using Counters for Counters.Counter;

    // Private
    // Counter for tokenIds
    Counters.Counter private _tokenIds;
    bool internal _isPublicMintActive;

    // Public Variables
    string public baseURI; // Base URI for NFT post reveal
    string public notRevealedUri; // Base URI for NFT pre-reveal
    uint256 public maxMintAmount = 10; // Max amount of mints per transaction
    uint256 public price = 0.04 ether; // Price per mint
    bool public revealed = false; // NFT URI has been revealed
    mapping(address => uint256) public hasMinted; // Whether colors owner has minted

    // Public Constants
    address public constant THE_COLORS = 0x9fdb31F8CE3cB8400C7cCb2299492F2A498330a4;
    address public constant TREASURY = 0x48aE900E9Df45441B2001dB4dA92CE0E7C08c6d2;
    uint256 public constant MAX_SUPPLY = 4317;
    uint256 public constant TOTAL_COLORS_QUOTA = 200;


    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        string memory _initNotRevealedUri
    ) ERC721(_name, _symbol) {
        baseURI = _initBaseURI;
        notRevealedUri = _initNotRevealedUri;
        _pause();

    }

    /*
     @notice: Minting is done uniquely through the mint function. Whether for
     a single mint or multiple mints, whether for the initial colors holders or
     for the public.

     This function can only be called externally and when the contract is not
     paused.

     The function first checks if the desired mint amount is whithin boundaries
     - i.e larger than 0 and less than the maxMintAmount.

     It then checks whether minting would result in excess supply - and reverts
     if it would.

     It then check whether the public mint is active - a check which gives true
     if 200 or more mints have occurred or if public mint manually set, false
     otherwise.

     If the public mint is active - the value in the message must be larger than
     or equal to the _mintAmount multiplied by the price.

     If not public mint - the following checks occur:
      - value in the message sent is zero (mint is free)
      - sender has a THE_COLORS balance by calling balanceOf THE_COLORS
      - reverts if THE_COLORS balance is zero
      - reverts if sender has already minted their THE_COLORS balance
      - Upong passing those checks it sets the _mintAmount for the sender via
       hasMinted[msg.sender] = hasMinted[msg.sender] + _mintAmount

     After passing those checks - it proceeds minting the number of mints
     requested which does the following:
      - stores the current value of the tokenId Counter as newItemId
      - increments the counter
      - mints to the sender the newItemId via _safeMint

     returns the _mintAmount
     */
    function mint(uint256 _mintAmount) external payable whenNotPaused returns (uint256) {

        require(_mintAmount <= maxMintAmount,"Max mint 10 per tx");
        require(_mintAmount > 0,"Mint should be > 0");

        uint256 _totalSupply = totalSupply();
        require(_totalSupply + 1 <= MAX_SUPPLY, "not enough supply");


        if (_isPublicMintActiveInternal(_totalSupply)) {
            require(msg.value >= price * _mintAmount, "insufficient funds");
        } else {
            require(msg.value == 0);
            uint256 colors_balance = IERC721(THE_COLORS).balanceOf(msg.sender);
            require(colors_balance > 0,"Not Colors Owner");
            require(hasMinted[msg.sender] < colors_balance,"Already minted your quota");
            hasMinted[msg.sender] = hasMinted[msg.sender] + _mintAmount;
        }

        for (uint i = 0; i < _mintAmount; i++) {
            uint256 newItemId = _tokenIds.current();
            _tokenIds.increment();
            _safeMint(msg.sender, newItemId);
        }

        return _mintAmount;
    }

    /**
     * View Functions
     */
    function isPublicMintActive() external view returns (bool) {
        return _isPublicMintActiveInternal(totalSupply());
    }


    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        if (!revealed) {
            return notRevealedUri;
        }

        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(),".json")) : "";
    }

    /**
     * Owner Functions
     */

    function unpause() public onlyOwner {
        _unpause();
    }
    function pause() public onlyOwner {
        _pause();
    }
    function reveal() public onlyOwner {
        revealed = true;
    }
    function withdraw() public payable onlyOwner {
        uint256 balance = address(this).balance;
        uint256 for_treasury = balance * 60 / 100;
        uint256 for_r1 = (balance * 9) / 100;
        uint256 for_r2 = (balance * 5) / 100;
        uint256 for_r3 = (balance * 5) / 100;
        uint256 for_r4 = (balance * 5) / 100;
        uint256 for_r5 = (balance * 4) / 100;
        uint256 for_r6 = (balance * 4) / 100;
        uint256 for_r7 = (balance * 2) / 100;
        uint256 for_r8 = (balance * 4) / 100;
        uint256 for_r9 = (balance * 2) / 100;
        payable(TREASURY).transfer(for_treasury);
        payable(0x2F66d5D7561e1bE587968cd336FA3623E5792dc2).transfer(for_r1);
        payable(0xeb9ADe429FBA6c51a1B352a869417Bd410bC1421).transfer(for_r2);
        payable(0xf1A1e46463362C0751Af4Ff46037D1815d66bB4D).transfer(for_r3);
        payable(0x1E3005BD8281148f1b00bdcC94E8d0cD9DA242C2).transfer(for_r4);
        payable(0x21761978a6F93D0bF5bAb5F75762880E8dc813e8).transfer(for_r5);
        payable(0x5b3DBf9004E01509777329B762EC2332565F12fA).transfer(for_r6);
        payable(0xB2b9FF858Bf74436685DaaF76d6901C2A24ef0C3).transfer(for_r7);
        payable(0xe873Fa8436097Bcdfa593EEd60c10eFAd4244dC0).transfer(for_r8);
        payable(0x182e0C610c4A855b81169385821C4c8690Af5f3b).transfer(for_r9);
    }
    function setNotRevealedURI(string calldata _notRevealedURI) external onlyOwner {
        notRevealedUri = _notRevealedURI;
    }
    function setBaseURI(string calldata _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }
    function setMaxMintAmount(uint256 _newmaxMintAmount) external onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }
    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    }
    function setPublicMintActive(bool _active) external onlyOwner {
        _isPublicMintActive = _active;
    }

    /**
     * Internal
     */
    function _isPublicMintActiveInternal(uint256 _totalSupply) view internal returns (bool) {
        return _totalSupply >= TOTAL_COLORS_QUOTA || _isPublicMintActive;
    }
}
