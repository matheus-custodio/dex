//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
pragma abicoder v2;

import "./Wallet.sol";

contract Dex is Wallet {
    constructor(bytes32 nativeTicker) Wallet(nativeTicker) {}

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
        uint256 filled;
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
    ) external tokenExist(ticker) tokenIsNotnative(ticker) {
        if (orderType == Type.BUY) {
            require(balances[msg.sender][native] >= amount.mul(price));
        } else if (orderType == Type.SELL) {
            require(balances[msg.sender][ticker] >= amount);
        }

        Order[] storage orders = orderBook[ticker][uint8(orderType)];
        orders.push(
            Order(nextOrderId, msg.sender, orderType, ticker, amount, price, 0)
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
        uint256 amount
    ) external tokenExist(ticker) tokenIsNotnative(ticker) {
        if (orderType == Type.SELL) {
            require(
                balances[msg.sender][ticker] >= amount,
                "Insufficient balance"
            );
        }
        Order[] storage orders = orderBook[ticker][
            uint8(orderType == Type.BUY ? Type.SELL : Type.BUY)
        ];

        uint256 totalFilled;
        uint256 price;

        for (uint256 i = 0; i < orders.length && totalFilled < amount; i++) {
            if (orders[i].trader == msg.sender) break;
            uint256 leftToFill = amount.sub(totalFilled);
            uint256 availableToFill = orders[i].amount.sub(orders[i].filled);
            uint256 filled = (availableToFill > leftToFill)
                ? leftToFill
                : availableToFill;

            totalFilled = totalFilled.add(filled);
            orders[i].filled = orders[i].filled.add(filled);
            price = filled.mul(orders[i].price);

            if (orderType == Type.SELL) {
                balances[msg.sender][ticker] = balances[msg.sender][ticker].sub(
                    filled
                );
                balances[msg.sender][native] = balances[msg.sender][native].add(
                    price
                );
                balances[orders[i].trader][ticker] = balances[orders[i].trader][
                    ticker
                ].add(filled);
                balances[orders[i].trader][native] = balances[orders[i].trader][
                    native
                ].sub(price);
            }
            if (orderType == Type.BUY) {
                require(
                    balances[msg.sender][native] >= price,
                    '"native" balance too low'
                );
                balances[msg.sender][ticker] = balances[msg.sender][ticker].add(
                    filled
                );
                balances[msg.sender][native] = balances[msg.sender][native].sub(
                    price
                );
                balances[orders[i].trader][ticker] = balances[orders[i].trader][
                    ticker
                ].sub(filled);
                balances[orders[i].trader][native] = balances[orders[i].trader][
                    native
                ].add(price);
            }
        }
        while (orders.length > 0 && orders[0].filled == orders[0].amount) {
            for (uint256 i = 0; i < orders.length - 1; i++) {
                orders[i] = orders[i + 1];
            }
            orders.pop();
        }
    }

    modifier tokenIsNotnative(bytes32 ticker) {
        require(ticker != native, "cannot trade this token");
        _;
    }
}
