//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Wallet is Ownable {
	using SafeMath for uint256;

	struct Token {
		bytes32 ticker;
		address tokenAddress;
	}

	mapping(bytes32 => Token) public tokenMapping;
	bytes32[] public tokenList;

	mapping(address => mapping(bytes32 => uint256)) public balances;

	modifier tokenExist(bytes32 ticker) {
		require(
			tokenMapping[ticker].tokenAddress != address(0),
			"Token not added"
		);
		_;
	}

	function addToken(bytes32 ticker, address tokenAddress) external onlyOwner {
		tokenMapping[ticker] = Token(ticker, tokenAddress);
		tokenList.push(ticker);
	}

	function deposit(uint256 amount, bytes32 ticker)
		external
		tokenExist(ticker)
	{
		IERC20(tokenMapping[ticker].tokenAddress).transferFrom(
			msg.sender,
			address(this),
			amount
		);
		balances[msg.sender][ticker] = balances[msg.sender][ticker].add(amount);
	}

	function withdraw(uint256 amount, bytes32 ticker)
		external
		tokenExist(ticker)
	{
		require(
			balances[msg.sender][ticker] >= amount,
			"Balance not sufficient"
		);

		balances[msg.sender][ticker] = balances[msg.sender][ticker].sub(amount);

		IERC20(tokenMapping[ticker].tokenAddress).transfer(msg.sender, amount);
	}
}
