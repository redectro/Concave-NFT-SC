
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface theColors{
  function ownerOf (uint256 tokenid) external view returns (address);
}

contract ConcaveNFT is ERC721Enumerable, Ownable {
  using Strings for uint256;

  string public baseURI;
  string public baseExtension = ".json";
  string public notRevealedUri;
  uint256 public cost = 0 ether;
  uint256 public totalMinted = 0;
  uint256 public maxSupply = 4317;
  uint256 public maxMintAmount = 10;
  bool public paused = false;
  bool public isPublicSaleActive = false;
  bool public revealed = false;

  address public thecolorsaddress = 0x3328358128832A260C76A4141e19E2A943CD4B6D; 
  theColors thecolorscontract = theColors(thecolorsaddress);  
  mapping(uint256 => bool) public hasClaimed;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI,
    string memory _initNotRevealedUri
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    setNotRevealedURI(_initNotRevealedUri);
  }
  /*
    check if paused
    max supply
    check corrrect  value
  */

  // presale 
  function _presaleSingleMint(uint256 tokenId) public payable {
    require(!paused, "Contracts paused!");
    require(totalMinted + 1 <= maxSupply, "max supply has been reached");
    require(msg.value >= cost, "insufficient funds");
    require(thecolorscontract.ownerOf(tokenId) == msg.sender, "not the owner of this color!");
    require(!hasClaimed[tokenId], "already minted with this token!!");
    hasClaimed[tokenId] = true;
    totalMinted++;
    _safeMint(msg.sender, tokenId);
  }


  function _presaleBatchMint(uint256[] memory tokenIds) public {
      for (uint256 i = 0; i < tokenIds.length; i++) {
        _presaleSingleMint(tokenIds[i]);
      }
    }

  // public
  function mint(uint256 _mintAmount) public payable {
    require(!paused, "the contract is paused");
    require(totalMinted + _mintAmount <= maxSupply, "max supply has been reached");
    require(msg.value >= cost * _mintAmount, "insufficient funds");
    require(_mintAmount <= maxMintAmount, "max mint amount per tx exceeded");
    require(isPublicSaleActive, "Public sale isn't active yet!");
    for (uint256 i = 1; i <= _mintAmount; i++) {
      _safeMint(msg.sender, totalMinted + 1);
      totalMinted = totalMinted + 1;
    }
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
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
    
    if(revealed == false) {
        return notRevealedUri;
    }

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, "/", tokenId.toString(), baseExtension))
        : "";
  }

  //only owner

  function setPublicSaleIsActive(bool isActive) public onlyOwner {
      isPublicSaleActive = isActive;
  }

  function reveal() public onlyOwner {
      revealed = true;
  }
  
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }
  
  function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
    notRevealedUri = _notRevealedURI;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
  
  function withdraw() public payable onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
  }

   //internal
   function getColorsOwnedByUser(address user) public view returns (uint256[] memory tokenIdsList) {
      uint256[] memory tokenIds = new uint256[](4317);

      uint index = 0;
      for (uint i = 0; i < 4317; i++) {
        address tokenOwner = thecolorscontract.ownerOf(i);
        
        if (user == tokenOwner) {
          tokenIds[index] = i;
          index += 1;
        }
      }

      uint left = 4317 - index;
      for (uint i = 0; i < left; i++) {
        tokenIds[index] = 9999;
        index += 1;
      }

      return tokenIds;
    }

    function getUnmintedSpiralsByUser(address user) public view returns (uint256[] memory tokenIdsList) {
      uint256[] memory tokenIds = new uint256[](4317);

      uint index = 0;
      for (uint i = 0; i < 4317; i++) {
        address tokenOwner = thecolorscontract.ownerOf(i);
        
        if (user == tokenOwner && !hasClaimed[i]) {
          tokenIds[index] = i;
          index += 1;
        }
      }

      uint left = 4317 - index;
      for (uint i = 0; i < left; i++) {
        tokenIds[index] = 9999;
        index += 1;
      }

      return tokenIds;
    }

    function getNextUnmintedToken() public view returns (uint256 nextTokenId){
      for(uint256 i = 0; i < totalSupply(); i++)
        if(!hasClaimed[i]) return i;
    }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

}