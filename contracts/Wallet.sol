//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Wallet is Ownable {
    using SafeMath for uint256;
    bytes32 public native;

    constructor(bytes32 nativeTicker) {
        native = nativeTicker;
    }

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

    function getTokens() external view returns (Token[] memory) {
        Token[] memory _tokens = new Token[](tokenList.length);
        for (uint256 i = 0; i < tokenList.length; i++) {
            _tokens[i] = Token(
                tokenMapping[tokenList[i]].ticker,
                tokenMapping[tokenList[i]].tokenAddress
            );
        }
        return _tokens;
    }

    function addToken(bytes32 ticker, address tokenAddress) external onlyOwner {
        tokenMapping[ticker] = Token(ticker, tokenAddress);
        tokenList.push(ticker);
    }

    function depositToken(uint256 amount, bytes32 ticker)
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

    function withdrawToken(uint256 amount, bytes32 ticker)
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

    function deposit() external payable {
        require(msg.value > 0);
        balances[msg.sender][native] = balances[msg.sender][native].add(
            msg.value
        );
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender][native] >= amount, "Insuffient balance");
        balances[msg.sender][native] = balances[msg.sender][native].sub(amount);
        (bool success, ) = msg.sender.call{value: amount}("");
        require(
            success,
            "Address: unable to send value, recipient may have reverted"
        );
    }
}
