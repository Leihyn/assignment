// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./token.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenFactory is Ownable {
    uint256 public fee = 0.1 ether;
    address[] public tokens;

    event TokenCreated(address tokenAddress);
    event FeeUpdated(uint256 amount);
    event OwnerUpdated(address indexed newOwner);
    event FeesWithdrawn(address to, uint256 amount);

    constructor(address _initialOwner) Ownable(msg.sender) {

    }

    function createToken(
        address owner,
        string memory name,
        string memory symbol,
        uint256 maxSupply
    ) external payable onlyOwner {
        require(msg.value == fee, "Invalid fees");
        Token newToken = new Token(owner, name, symbol, maxSupply);
        tokens.push(address(newToken));
        emit TokenCreated(address(newToken));
    }

    function getTokens() external view returns (address[] memory) {
        return tokens;
    }

    function setFees(uint256 newFee) external onlyOwner {
        fee = newFee;
        emit FeeUpdated(newFee);
    }

    function withdrawFees() external onlyOwner {
        uint256 fees = address(this).balance;
        (bool sent, ) = payable(owner()).call{value: fees}("");
        require(sent, "Failed to withdraw fees");
        emit FeesWithdrawn(owner(), fees);
    }
}
