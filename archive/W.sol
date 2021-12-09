// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract W {
    function withdraw() public payable {
        uint256 balance = address(this).balance;
        uint256 for_treasury = balance * 60 / 100;
        uint256 for_r1 = balance * 9 / 100;
        uint256 for_r2 = balance * 5 / 100;
        uint256 for_r3 = balance * 5 / 100;
        uint256 for_r4 = balance * 5 / 100;
        uint256 for_r5 = balance * 4 / 100;
        uint256 for_r6 = balance * 4 / 100;
        uint256 for_r7 = balance * 2 / 100;
        uint256 for_r8 = balance * 4 / 100;
        uint256 for_r9 = balance * 2 / 100;
        payable(0x48aE900E9Df45441B2001dB4dA92CE0E7C08c6d2).transfer(for_treasury);
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
}
