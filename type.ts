import { BytesLike } from 'ethers/';

export type Token = [
  {
    ticker: string;
    tokenAddress: string;
    bytes32: BytesLike;
  },
];

export type Account = {
  address: String;
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
  user: Account | undefined;
};
