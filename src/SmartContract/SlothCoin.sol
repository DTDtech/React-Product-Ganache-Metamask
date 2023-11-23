// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract buyRecipeNFT is ERC20 {
    constructor() ERC20("SlothCoin", "STH") {
        _mint(msg.sender, 1000 * 10 ** 18);
    } 
}