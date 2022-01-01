//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
pragma abicoder v2;

import "./Wallet.sol";

contract Dex is Wallet {
    using SafeMath for uint256;
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

    uint256 public nextOrderId;

    mapping(bytes32 => mapping(uint256 => Order[])) public orderBook;

    function GetOrderBook(bytes32 ticker, Type orderType)
        public
        view
        returns (Order[] memory)
    {
        return orderBook[ticker][uint256(orderType)];
    }

    function createLimitOrder(
        Type orderType,
        bytes32 ticker,
        uint256 amount,
        uint256 price
    ) public tokenExist(ticker) {
        if (orderType == Type.BUY) {
            require(balances[msg.sender]["BNB"] >= amount.mul(price));
        } else if (orderType == Type.SELL) {
            require(balances[msg.sender][ticker] >= amount);
        }

        Order[] storage orders = orderBook[ticker][uint8(orderType)];
        orders.push(
            Order(nextOrderId, msg.sender, orderType, ticker, amount, price)
        );

        uint256 i = orders.length > 0 ? orders.length - 1 : 0;

        while (i > 0) {
            if (
                (orderType == Type.BUY &&
                    orders[i - 1].price > orders[i].price) ||
                (orderType == Type.SELL &&
                    orders[i - 1].price < orders[i].price)
            ) {
                break;
            }
            Order memory orderToMove = orders[i - 1];
            orders[i - 1] = orders[i];
            orders[i] = orderToMove;
            i--;
        }
        nextOrderId.add(1);
    }

    function createMarketOrder(
        Type orderType,
        bytes32 ticker,
        uint256 amount,
        uint256 price
    ) public tokenExist(ticker) {}
}
