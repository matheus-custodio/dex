import { BytesLike } from 'ethers/';

export type Token = [
  {
    ticker: string;
    tokenAddress: string | undefined;
    bytes32: BytesLike;
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
  isActive: boolean;
  depositToken: Function;
  withdrawToken: Function;
  user: AccountType | undefined;
};

export type BalanceList = [
  {
    token: any;
    balance: string | number;
  },
];
