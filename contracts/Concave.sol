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
    mapping(uint256 => bool) public hasClaimed; // Whether tokenId has been claimed

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
     @notice: mint is for minting 1 once the public sale is active.

     The following checks occur, it checks:
      - that the public mint is active
      - whether collection sold out
      - whether minting 1 would exceed supply.
      - finally checks where value > price

     Upon passing checks it calls  the internal _mintOnce function to perform
     the minting.
     */
    function mint() external payable whenNotPaused {

        uint256 _totalSupply = totalSupply();
        require(
            _isPublicMintActiveInternal(_totalSupply),
            "public sale not active"
        );
        require(!_isSoldOut(_totalSupply), "sold out");
        require(_totalSupply < MAX_SUPPLY, "exceeds supply");
        require(msg.value >= price, "insufficient funds");
        _mintOnce();
    }

    /*
     @notice: mintMany is for minting many once the public sale is active. The
     parameter _mintAmount indicates the number of tokens the user wishes to
     mint.

     The following checks occur, it checks:
      - that the public mint is active
      - whether collection sold out
      - whether _mintAmount is within boundaries: 0 < x <= 10
      - whether minting _mintAmount would exceed supply.
      - finally checks where value > price*_mintAmount

     Upon passing checks it calls  the internal _mintOnce function to perform
     the minting.
     */
    function mintMany(uint256 _mintAmount) external payable whenNotPaused {

        uint256 _totalSupply = totalSupply();
        require(
            _isPublicMintActiveInternal(_totalSupply),
            "public sale not active"
        );
        require(!_isSoldOut(_totalSupply), "sold out");
        require(_mintAmount <= maxMintAmount,"Max mint 10 per tx");
        require(_mintAmount > 0,"Mint should be > 0");
        require(
            _totalSupply + _mintAmount <= MAX_SUPPLY,
            "exceeds supply"
        );
        require(msg.value >= price * _mintAmount, "insufficient funds");

        for (uint i = 0; i < _mintAmount; i++) {
            _mintOnce();
        }
    }

    /*
     @notice: mintColorsBatch is for colors holders to mint a batch of their
     specific tokens.

     The following checks occur, it checks:
      - that the public mint not be active
      - number of tokens in the array does not exceed boundaries:
        0 < tokenIds.length <= 10

     Then, it begins looping over the array of tokenIds sent and performs the
     following checks:
      - that the tokenID has not already been claimed
      - that the owner of the tokenID is the msg.sender

      It then sets the token as claimed.

      Finally calls the _mintOnce internal function to perform the mint.
     */
    function mintColorsBatch(uint256[] memory tokenIds) external whenNotPaused {
        uint256 _totalSupply = totalSupply();
        require(!_isPublicMintActiveInternal(_totalSupply),"presale over");
        require(tokenIds.length <= maxMintAmount,"Max mint 10 per tx");
        require(tokenIds.length > 0,"Minting 0.");


        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(!hasClaimed[tokenIds[i]], "Color already claimed.");
            require(
                msg.sender == IERC721(THE_COLORS).ownerOf(tokenIds[i]),
                "Only owner can claim."
            );
            hasClaimed[tokenIds[i]] = true;
            _mintOnce();
        }
    }

    /*
     @notice: mintColorsOnce is for colors holders to mint a single specific
     token.

     The following checks occur, it checks:
      - that the public mint not be active
      - that the tokenID has not already been claimed
      - that the owner of the tokenID is the msg.sender

      It then sets the token as claimed.

      Finally calls the _mintOnce internal function to perform the mint.
     */
    function mintColorsOnce(uint256 tokenId) external whenNotPaused {
        uint256 _totalSupply = totalSupply();
        require(!_isPublicMintActiveInternal(_totalSupply),"presale over");
        require(!hasClaimed[tokenId], "Color already claimed.");
        require(
            msg.sender == IERC721(THE_COLORS).ownerOf(tokenId),
            "Only owner can claim."
        );
        hasClaimed[tokenId] = true;
        _mintOnce();
    }

    /**
     * View Functions
     */
    function isPublicMintActive() external view returns (bool) {
        return _isPublicMintActiveInternal(totalSupply());
    }

    function isSoldOut() external view returns (bool) {
        return _isSoldOut(totalSupply());
    }

    /*
     @notice: this is a helper function for the frontend that allows the user
     to view how many of their colors are available to be minted.
     */
    function getUnmintedSpoonsByUser(address user)
        public
        view
        returns (uint256[] memory, uint256) 
    {
        uint balance = THE_COLORS.balanceOf(user);
        uint256[] memory tokenIds = new uint256[](balance);

        uint index = 0;
        for (uint i = 0; i < balance; i++) {
            uint tokenID = THE_COLORS.tokenOfOwnerByIndex(user, i);
            if(!hasClaimed[tokenID]) {
                tokenIds[i] = tokenID;
                index += 1;
            }
        }

        return (tokenIds, index);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (!revealed) {
            return notRevealedUri;
        }

        return bytes(baseURI).length > 0
            ? string(abi.encodePacked(baseURI, tokenId.toString(),".json"))
            : "";
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
    function setNotRevealedURI(string calldata _notRevealedURI)
        external
        onlyOwner
    {
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


    /*
     @notice: the _mintOnce initernal function is called by the public mint
     functions (mint,mintMany,mintColorsOnce,mintColorsOnce) and is in charge
     of increasing the token counter and minting.
     */
    function _mintOnce() internal {
        uint256 newItemId = _tokenIds.current();
        _tokenIds.increment();
        _safeMint(msg.sender, newItemId);
    }

    function _isPublicMintActiveInternal(uint256 _totalSupply)
        view
        internal 
        returns (bool)
    {
        return _totalSupply >= TOTAL_COLORS_QUOTA || _isPublicMintActive;
    }

    function _isSoldOut(uint256 _totalSupply) pure internal returns (bool) {
        return !(_totalSupply < MAX_SUPPLY);
    }
}
