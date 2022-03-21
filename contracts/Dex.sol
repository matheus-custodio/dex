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
        uint256 filled;
    }
    event NewTrade(
        uint256 tradeId,
        uint256 orderId,
        bytes32 indexed ticker,
        address indexed trader1,
        address indexed trader2,
        uint256 amount,
        uint256 price,
        uint256 date
    );

    uint256 public nextOrderId;
    uint256 public nextTradeId;

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
    ) external tokenExist(ticker) tokenIsNotTBNB(ticker) {
        if (orderType == Type.BUY) {
            require(balances[msg.sender][TBNB] >= amount.mul(price));
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
    ) external tokenExist(ticker) tokenIsNotTBNB(ticker) {
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
            emit NewTrade(
                nextTradeId,
                orders[i].id,
                ticker,
                orders[i].trader,
                msg.sender,
                filled,
                orders[i].price,
                block.timestamp
            );
            if (orderType == Type.SELL) {
                balances[msg.sender][ticker] = balances[msg.sender][ticker].sub(
                    filled
                );
                balances[msg.sender][TBNB] = balances[msg.sender][TBNB].add(
                    price
                );
                balances[orders[i].trader][ticker] = balances[orders[i].trader][
                    ticker
                ].add(filled);
                balances[orders[i].trader][TBNB] = balances[orders[i].trader][
                    TBNB
                ].sub(price);
            }
            if (orderType == Type.BUY) {
                require(
                    balances[msg.sender][TBNB] >= price,
                    "TBNB balance too low"
                );
                balances[msg.sender][ticker] = balances[msg.sender][ticker].add(
                    filled
                );
                balances[msg.sender][TBNB] = balances[msg.sender][TBNB].sub(
                    price
                );
                balances[orders[i].trader][ticker] = balances[orders[i].trader][
                    ticker
                ].sub(filled);
                balances[orders[i].trader][TBNB] = balances[orders[i].trader][
                    TBNB
                ].add(price);
            }
            nextTradeId.add(1);
        }
        while (orders.length > 0 && orders[0].filled == orders[0].amount) {
            for (uint256 i = 0; i < orders.length - 1; i++) {
                orders[i] = orders[i + 1];
            }
            orders.pop();
        }
    }

    modifier tokenIsNotTBNB(bytes32 ticker) {
        require(ticker != TBNB, "cannot trade this token");
        _;
    }
}
