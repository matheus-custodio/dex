//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
pragma abicoder v2;

import "./Wallet.sol";

contract Dex is Wallet {
    enum Type {
        BUY,
        SELL
    }
    struct Order {
        uint256 id;
        address trader;
        Type orderType;
        bytes32 ticker;
        uint256 amount;
        uint256 price;
    }

    mapping(bytes32 => mapping(uint256 => Order[])) public orderBook;

    function getOrderBook(bytes32 ticker, Type orderType)
        public
        view
        returns (Order[] memory)
    {
        return orderBook[ticker][uint256(orderType)];
    }

    function createLimitOrder() public {}
}
