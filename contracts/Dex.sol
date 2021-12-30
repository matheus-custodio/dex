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
        uint id;
        address trader;
        Type orderType;
        bytes32 ticker;
        uint amount;
        uint price;
    }

    mapping(bytes32 => mapping(uint => Order[])) orderBook;

    function getOrderBook(bytes32 ticker, Type orderType) view public returns(Order[] memory){
        return orderBook[ticker][uint(orderType)];
    }

    function createLimitOrder() public{

    }

}
