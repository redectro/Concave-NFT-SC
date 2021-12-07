// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

interface INFTOwner {
  function ownerOf(uint256 tokenId) external view returns (address);
  function balanceOf(address owner) external view returns (uint256);
}