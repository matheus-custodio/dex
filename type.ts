import { BytesLike } from 'ethers';

export type Token = [
  {
    ticker: string;
    tokenAddress: string;
    bytes: BytesLike;
  },
];
