/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Dex, DexInterface } from "../Dex";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ticker",
        type: "bytes32",
      },
      {
        internalType: "enum Dex.Type",
        name: "orderType",
        type: "uint8",
      },
    ],
    name: "GetOrderBook",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "enum Dex.Type",
            name: "orderType",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "ticker",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
        ],
        internalType: "struct Dex.Order[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ticker",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "addToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ticker",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "createLimitOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "ticker",
        type: "bytes32",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ticker",
        type: "bytes32",
      },
    ],
    name: "getUserBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "orderBook",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        internalType: "enum Dex.Type",
        name: "orderType",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "ticker",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenList",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "tokenMapping",
    outputs: [
      {
        internalType: "bytes32",
        name: "ticker",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "ticker",
        type: "bytes32",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061002d61002261003260201b60201c565b61003a60201b60201c565b6100fe565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6117898061010d6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80639776aacf1161008c578063b6e9c2ac11610066578063b6e9c2ac14610216578063c9630cb014610232578063cd7b9df51461024e578063f2fde38b1461027e576100cf565b80639776aacf146101ae5780639ead7222146101ca578063a8d2021a146101fa576100cf565b80630bb431b6146100d45780631f14df6914610109578063667cb4ba14610139578063715018a61461016a5780637700036d146101745780638da5cb5b14610190575b600080fd5b6100ee60048036038101906100e99190610fda565b61029a565b604051610100969594939291906113ff565b60405180910390f35b610123600480360381019061011e9190610ed4565b61032d565b60405161013091906113e4565b60405180910390f35b610153600480360381019061014e9190610f39565b610352565b60405161016192919061133b565b60405180910390f35b610172610396565b005b61018e60048036038101906101899190610fda565b61041e565b005b610198610423565b6040516101a59190611283565b60405180910390f35b6101c860048036038101906101c39190610f62565b61044c565b005b6101e460048036038101906101df9190611029565b610587565b6040516101f19190611320565b60405180910390f35b610214600480360381019061020f9190611052565b6105ab565b005b610230600480360381019061022b9190610f39565b610865565b005b61024c60048036038101906102479190611052565b610868565b005b61026860048036038101906102639190610f9e565b610a91565b60405161027591906112fe565b60405180910390f35b61029860048036038101906102939190610eab565b610c52565b005b600460205282600052604060002060205281600052604060002081815481106102c257600080fd5b906000526020600020906005020160009250925050508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160149054906101000a900460ff16908060020154908060030154908060040154905086565b6003602052816000526040600020602052806000526040600020600091509150505481565b60016020528060005260406000206000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b61039e610d4a565b73ffffffffffffffffffffffffffffffffffffffff166103bc610423565b73ffffffffffffffffffffffffffffffffffffffff1614610412576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610409906113a4565b60405180910390fd5b61041c6000610d52565b565b505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610454610d4a565b73ffffffffffffffffffffffffffffffffffffffff16610472610423565b73ffffffffffffffffffffffffffffffffffffffff16146104c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104bf906113a4565b60405180910390fd5b60405180604001604052808381526020018273ffffffffffffffffffffffffffffffffffffffff16815250600160008481526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505060028290806001815401808255809150506001900390600052602060002001600090919091909150555050565b6002818154811061059757600080fd5b906000526020600020016000915090505481565b80600073ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610652576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064990611384565b60405180910390fd5b82600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008481526020019081526020016000205410156106e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106dc906113c4565b60405180910390fd5b61074883600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002054610e1690919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000848152602001908152602001600020819055506001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33856040518363ffffffff1660e01b815260040161080d9291906112d5565b602060405180830381600087803b15801561082757600080fd5b505af115801561083b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061085f9190610f10565b50505050565b50565b80600073ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561090f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161090690611384565b60405180910390fd5b6001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff1660e01b81526004016109829392919061129e565b602060405180830381600087803b15801561099c57600080fd5b505af11580156109b0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109d49190610f10565b50610a3883600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002054610e2c90919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002081905550505050565b6060600460008481526020019081526020016000206000836001811115610ae1577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b82821015610c4657838290600052602060002090600502016040518060c0016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160149054906101000a900460ff166001811115610bdd577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6001811115610c15577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8152602001600282015481526020016003820154815260200160048201548152505081526020019060010190610b0f565b50505050905092915050565b610c5a610d4a565b73ffffffffffffffffffffffffffffffffffffffff16610c78610423565b73ffffffffffffffffffffffffffffffffffffffff1614610cce576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cc5906113a4565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610d3e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d3590611364565b60405180910390fd5b610d4781610d52565b50565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60008183610e249190611500565b905092915050565b60008183610e3a91906114aa565b905092915050565b600081359050610e51816116e7565b92915050565b600081519050610e66816116fe565b92915050565b600081359050610e7b81611715565b92915050565b600081359050610e908161172c565b92915050565b600081359050610ea58161173c565b92915050565b600060208284031215610ebd57600080fd5b6000610ecb84828501610e42565b91505092915050565b60008060408385031215610ee757600080fd5b6000610ef585828601610e42565b9250506020610f0685828601610e6c565b9150509250929050565b600060208284031215610f2257600080fd5b6000610f3084828501610e57565b91505092915050565b600060208284031215610f4b57600080fd5b6000610f5984828501610e6c565b91505092915050565b60008060408385031215610f7557600080fd5b6000610f8385828601610e6c565b9250506020610f9485828601610e42565b9150509250929050565b60008060408385031215610fb157600080fd5b6000610fbf85828601610e6c565b9250506020610fd085828601610e81565b9150509250929050565b600080600060608486031215610fef57600080fd5b6000610ffd86828701610e6c565b935050602061100e86828701610e96565b925050604061101f86828701610e96565b9150509250925092565b60006020828403121561103b57600080fd5b600061104984828501610e96565b91505092915050565b6000806040838503121561106557600080fd5b600061107385828601610e96565b925050602061108485828601610e6c565b9150509250929050565b600061109a83836111ea565b60c08301905092915050565b6110af81611534565b82525050565b6110be81611534565b82525050565b60006110cf82611470565b6110d98185611488565b93506110e483611460565b8060005b838110156111155781516110fc888261108e565b97506111078361147b565b9250506001810190506110e8565b5085935050505092915050565b61112b81611552565b82525050565b61113a81611552565b82525050565b61114981611599565b82525050565b61115881611599565b82525050565b600061116b602683611499565b915061117682611609565b604082019050919050565b600061118e600f83611499565b915061119982611658565b602082019050919050565b60006111b1602083611499565b91506111bc82611681565b602082019050919050565b60006111d4601683611499565b91506111df826116aa565b602082019050919050565b60c0820160008201516112006000850182611265565b50602082015161121360208501826110a6565b5060408201516112266040850182611140565b5060608201516112396060850182611122565b50608082015161124c6080850182611265565b5060a082015161125f60a0850182611265565b50505050565b61126e8161158f565b82525050565b61127d8161158f565b82525050565b600060208201905061129860008301846110b5565b92915050565b60006060820190506112b360008301866110b5565b6112c060208301856110b5565b6112cd6040830184611274565b949350505050565b60006040820190506112ea60008301856110b5565b6112f76020830184611274565b9392505050565b6000602082019050818103600083015261131881846110c4565b905092915050565b60006020820190506113356000830184611131565b92915050565b60006040820190506113506000830185611131565b61135d60208301846110b5565b9392505050565b6000602082019050818103600083015261137d8161115e565b9050919050565b6000602082019050818103600083015261139d81611181565b9050919050565b600060208201905081810360008301526113bd816111a4565b9050919050565b600060208201905081810360008301526113dd816111c7565b9050919050565b60006020820190506113f96000830184611274565b92915050565b600060c0820190506114146000830189611274565b61142160208301886110b5565b61142e604083018761114f565b61143b6060830186611131565b6114486080830185611274565b61145560a0830184611274565b979650505050505050565b6000819050602082019050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b60006114b58261158f565b91506114c08361158f565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156114f5576114f46115ab565b5b828201905092915050565b600061150b8261158f565b91506115168361158f565b925082821015611529576115286115ab565b5b828203905092915050565b600061153f8261156f565b9050919050565b60008115159050919050565b6000819050919050565b600081905061156a826116d3565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006115a48261155c565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f546f6b656e206e6f742061646465640000000000000000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f42616c616e6365206e6f742073756666696369656e7400000000000000000000600082015250565b600281106116e4576116e36115da565b5b50565b6116f081611534565b81146116fb57600080fd5b50565b61170781611546565b811461171257600080fd5b50565b61171e81611552565b811461172957600080fd5b50565b6002811061173957600080fd5b50565b6117458161158f565b811461175057600080fd5b5056fea26469706673582212209b988860164c60eb305bf5e73d3ea7aa8b4a26302696c756c7aa741d4eb45bcb64736f6c63430008040033";

type DexConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DexConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Dex__factory extends ContractFactory {
  constructor(...args: DexConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Dex> {
    return super.deploy(overrides || {}) as Promise<Dex>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Dex {
    return super.attach(address) as Dex;
  }
  connect(signer: Signer): Dex__factory {
    return super.connect(signer) as Dex__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DexInterface {
    return new utils.Interface(_abi) as DexInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Dex {
    return new Contract(address, _abi, signerOrProvider) as Dex;
  }
}
