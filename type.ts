import { BytesLike } from 'ethers/';

export type Token = [
  {
    ticker: string;
    tokenAddress: string | undefined;
    bytes32: BytesLike;
    balance?: undefined;
  },
];

export type AccountType = {
  address: string;
  balance: {
    nativeToken: 0;
    dexToken: 0;
  };
  selectedToken: any;
};

export type Asset = {
  depositToken: Function;
  withdrawToken: Function;
  user: AccountType | undefined;
};

export type OrderBook = {
  user: AccountType | undefined;
  orders: Orders | undefined;
};

export type Select = {
  user: AccountType | undefined;
  tokens: Token | undefined;
  selectToken: Function;
};

export type Orders = {
  BUY: Array<Order>;
  SELL: Array<Order>;
};

export type Order = {
  amount: string;
  filled: string;
  price: string;
  trader: string;
};
