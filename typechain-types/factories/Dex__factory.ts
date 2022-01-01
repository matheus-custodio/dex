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
    name: "createLimitOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
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
    name: "createMarketOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
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
    name: "depositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOrderId",
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
    ],
    name: "withdraw",
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
    name: "withdrawToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5062000032620000266200003860201b60201c565b6200004060201b60201c565b62000104565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b612a1780620001146000396000f3fe6080604052600436106100f35760003560e01c80637d34900a1161008a578063c1612c4411610059578063c1612c441461032c578063cd7b9df514610355578063d0e30db014610392578063f2fde38b1461039c576100f3565b80637d34900a146102725780638da5cb5b1461029b5780639776aacf146102c65780639ead7222146102ef576100f3565b80634d559cda116100c65780634d559cda146101cb578063667cb4ba146101f45780636f3b62f914610232578063715018a61461025b576100f3565b80630bb431b6146100f85780631f14df691461013a5780632a58b330146101775780632e1a7d4d146101a2575b600080fd5b34801561010457600080fd5b5061011f600480360381019061011a919061203d565b6103c5565b60405161013196959493929190612583565b60405180910390f35b34801561014657600080fd5b50610161600480360381019061015c9190611f37565b610458565b60405161016e9190612568565b60405180910390f35b34801561018357600080fd5b5061018c61047d565b6040516101999190612568565b60405180910390f35b3480156101ae57600080fd5b506101c960048036038101906101c491906120ef565b610483565b005b3480156101d757600080fd5b506101f260048036038101906101ed919061208c565b6106dd565b005b34801561020057600080fd5b5061021b60048036038101906102169190611f9c565b61078b565b60405161022992919061247f565b60405180910390f35b34801561023e57600080fd5b506102596004803603810190610254919061208c565b6107cf565b005b34801561026757600080fd5b506102706112e5565b005b34801561027e57600080fd5b5061029960048036038101906102949190612118565b61136d565b005b3480156102a757600080fd5b506102b0611627565b6040516102bd91906123c7565b60405180910390f35b3480156102d257600080fd5b506102ed60048036038101906102e89190611fc5565b611650565b005b3480156102fb57600080fd5b50610316600480360381019061031191906120ef565b61178b565b6040516103239190612464565b60405180910390f35b34801561033857600080fd5b50610353600480360381019061034e9190612118565b6117af565b005b34801561036157600080fd5b5061037c60048036038101906103779190612001565b6119d8565b6040516103899190612442565b60405180910390f35b61039a611b99565b005b3480156103a857600080fd5b506103c360048036038101906103be9190611f0e565b611c9f565b005b600560205282600052604060002060205281600052604060002081815481106103ed57600080fd5b906000526020600020906005020160009250925050508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160149054906101000a900460ff16908060020154908060030154908060040154905086565b6003602052816000526040600020602052806000526040600020600091509150505481565b60045481565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060007f424e4200000000000000000000000000000000000000000000000000000000008152602001908152602001600020541015610536576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052d906124c8565b60405180910390fd5b6105b981600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060007f424e420000000000000000000000000000000000000000000000000000000000815260200190815260200160002054611d9790919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060007f424e42000000000000000000000000000000000000000000000000000000000081526020019081526020016000208190555060003373ffffffffffffffffffffffffffffffffffffffff1682604051610653906123b2565b60006040518083038185875af1925050503d8060008114610690576040519150601f19603f3d011682016040523d82523d6000602084013e610695565b606091505b50509050806106d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106d0906124e8565b60405180910390fd5b5050565b82600073ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610784576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161077b90612508565b60405180910390fd5b5050505050565b60016020528060005260406000206000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b82600073ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610876576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086d90612508565b60405180910390fd5b600060018111156108b0577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8560018111156108e9577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1415610983576109028284611dad90919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060007f424e420000000000000000000000000000000000000000000000000000000000815260200190815260200160002054101561097e57600080fd5b610a5a565b6001808111156109bc577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8560018111156109f5577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1415610a595782600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000868152602001908152602001600020541015610a5857600080fd5b5b5b6000600560008681526020019081526020016000206000876001811115610aaa577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60ff1681526020019081526020016000209050806040518060c0016040528060045481526020013373ffffffffffffffffffffffffffffffffffffffff168152602001886001811115610b26577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b81526020018781526020018681526020018581525090806001815401808255809150506001900390600052602060002090600502016000909190919091506000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160146101000a81548160ff02191690836001811115610c06577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550606082015181600201556080820151816003015560a082015181600401555050600080828054905011610c3f576000610c51565b60018280549050610c5091906126e9565b5b90505b60008111156112c55760006001811115610c97577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b876001811115610cd0577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b148015610d7c5750818181548110610d11577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002090600502016004015482600183610d3191906126e9565b81548110610d68577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020906005020160040154115b80610ea15750600180811115610dbb577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b876001811115610df4577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b148015610ea05750818181548110610e35577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002090600502016004015482600183610e5591906126e9565b81548110610e8c577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020906005020160040154105b5b15610eab576112c5565b600082600183610ebb91906126e9565b81548110610ef2577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002090600502016040518060c0016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160149054906101000a900460ff166001811115610fb6577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6001811115610fee577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b81526020016002820154815260200160038201548152602001600482015481525050905082828154811061104b577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002090600502018360018461106791906126e9565b8154811061109e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000209060050201600082015481600001556001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001820160149054906101000a900460ff168160010160146101000a81548160ff0219169083600181111561117b577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550600282015481600201556003820154816003015560048201548160040155905050808383815481106111db577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002090600502016000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160146101000a81548160ff0219169083600181111561128b577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550606082015181600201556080820151816003015560a0820151816004015590505081806112bc90612794565b92505050610c54565b6112db6001600454611dc390919063ffffffff16565b5050505050505050565b6112ed611dd9565b73ffffffffffffffffffffffffffffffffffffffff1661130b611627565b73ffffffffffffffffffffffffffffffffffffffff1614611361576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161135890612528565b60405180910390fd5b61136b6000611de1565b565b80600073ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611414576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161140b90612508565b60405180910390fd5b82600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008481526020019081526020016000205410156114a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161149e90612548565b60405180910390fd5b61150a83600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002054611d9790919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000848152602001908152602001600020819055506001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33856040518363ffffffff1660e01b81526004016115cf929190612419565b602060405180830381600087803b1580156115e957600080fd5b505af11580156115fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116219190611f73565b50505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b611658611dd9565b73ffffffffffffffffffffffffffffffffffffffff16611676611627565b73ffffffffffffffffffffffffffffffffffffffff16146116cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116c390612528565b60405180910390fd5b60405180604001604052808381526020018273ffffffffffffffffffffffffffffffffffffffff16815250600160008481526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505060028290806001815401808255809150506001900390600052602060002001600090919091909150555050565b6002818154811061179b57600080fd5b906000526020600020016000915090505481565b80600073ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611856576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161184d90612508565b60405180910390fd5b6001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff1660e01b81526004016118c9939291906123e2565b602060405180830381600087803b1580156118e357600080fd5b505af11580156118f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061191b9190611f73565b5061197f83600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002054611dc390919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002081905550505050565b6060600560008481526020019081526020016000206000836001811115611a28577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b82821015611b8d57838290600052602060002090600502016040518060c0016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160149054906101000a900460ff166001811115611b24577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6001811115611b5c577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8152602001600282015481526020016003820154815260200160048201548152505081526020019060010190611a56565b50505050905092915050565b60003411611ba657600080fd5b611c2934600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060007f424e420000000000000000000000000000000000000000000000000000000000815260200190815260200160002054611dc390919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060007f424e420000000000000000000000000000000000000000000000000000000000815260200190815260200160002081905550565b611ca7611dd9565b73ffffffffffffffffffffffffffffffffffffffff16611cc5611627565b73ffffffffffffffffffffffffffffffffffffffff1614611d1b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d1290612528565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611d8b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d82906124a8565b60405180910390fd5b611d9481611de1565b50565b60008183611da591906126e9565b905092915050565b60008183611dbb919061268f565b905092915050565b60008183611dd19190612639565b905092915050565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081359050611eb481612975565b92915050565b600081519050611ec98161298c565b92915050565b600081359050611ede816129a3565b92915050565b600081359050611ef3816129ba565b92915050565b600081359050611f08816129ca565b92915050565b600060208284031215611f2057600080fd5b6000611f2e84828501611ea5565b91505092915050565b60008060408385031215611f4a57600080fd5b6000611f5885828601611ea5565b9250506020611f6985828601611ecf565b9150509250929050565b600060208284031215611f8557600080fd5b6000611f9384828501611eba565b91505092915050565b600060208284031215611fae57600080fd5b6000611fbc84828501611ecf565b91505092915050565b60008060408385031215611fd857600080fd5b6000611fe685828601611ecf565b9250506020611ff785828601611ea5565b9150509250929050565b6000806040838503121561201457600080fd5b600061202285828601611ecf565b925050602061203385828601611ee4565b9150509250929050565b60008060006060848603121561205257600080fd5b600061206086828701611ecf565b935050602061207186828701611ef9565b925050604061208286828701611ef9565b9150509250925092565b600080600080608085870312156120a257600080fd5b60006120b087828801611ee4565b94505060206120c187828801611ecf565b93505060406120d287828801611ef9565b92505060606120e387828801611ef9565b91505092959194509250565b60006020828403121561210157600080fd5b600061210f84828501611ef9565b91505092915050565b6000806040838503121561212b57600080fd5b600061213985828601611ef9565b925050602061214a85828601611ecf565b9150509250929050565b60006121608383612319565b60c08301905092915050565b6121758161271d565b82525050565b6121848161271d565b82525050565b6000612195826125f4565b61219f818561260c565b93506121aa836125e4565b8060005b838110156121db5781516121c28882612154565b97506121cd836125ff565b9250506001810190506121ae565b5085935050505092915050565b6121f18161273b565b82525050565b6122008161273b565b82525050565b61220f81612782565b82525050565b61221e81612782565b82525050565b6000612231602683612628565b915061223c8261281c565b604082019050919050565b6000612254601283612628565b915061225f8261286b565b602082019050919050565b6000612277603a83612628565b915061228282612894565b604082019050919050565b600061229a600f83612628565b91506122a5826128e3565b602082019050919050565b60006122bd602083612628565b91506122c88261290c565b602082019050919050565b60006122e0601683612628565b91506122eb82612935565b602082019050919050565b600061230360008361261d565b915061230e8261295e565b600082019050919050565b60c08201600082015161232f6000850182612394565b506020820151612342602085018261216c565b5060408201516123556040850182612206565b50606082015161236860608501826121e8565b50608082015161237b6080850182612394565b5060a082015161238e60a0850182612394565b50505050565b61239d81612778565b82525050565b6123ac81612778565b82525050565b60006123bd826122f6565b9150819050919050565b60006020820190506123dc600083018461217b565b92915050565b60006060820190506123f7600083018661217b565b612404602083018561217b565b61241160408301846123a3565b949350505050565b600060408201905061242e600083018561217b565b61243b60208301846123a3565b9392505050565b6000602082019050818103600083015261245c818461218a565b905092915050565b600060208201905061247960008301846121f7565b92915050565b600060408201905061249460008301856121f7565b6124a1602083018461217b565b9392505050565b600060208201905081810360008301526124c181612224565b9050919050565b600060208201905081810360008301526124e181612247565b9050919050565b600060208201905081810360008301526125018161226a565b9050919050565b600060208201905081810360008301526125218161228d565b9050919050565b60006020820190508181036000830152612541816122b0565b9050919050565b60006020820190508181036000830152612561816122d3565b9050919050565b600060208201905061257d60008301846123a3565b92915050565b600060c08201905061259860008301896123a3565b6125a5602083018861217b565b6125b26040830187612215565b6125bf60608301866121f7565b6125cc60808301856123a3565b6125d960a08301846123a3565b979650505050505050565b6000819050602082019050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b600061264482612778565b915061264f83612778565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612684576126836127be565b5b828201905092915050565b600061269a82612778565b91506126a583612778565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156126de576126dd6127be565b5b828202905092915050565b60006126f482612778565b91506126ff83612778565b925082821015612712576127116127be565b5b828203905092915050565b600061272882612758565b9050919050565b60008115159050919050565b6000819050919050565b600081905061275382612961565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061278d82612745565b9050919050565b600061279f82612778565b915060008214156127b3576127b26127be565b5b600182039050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f496e7375666669656e742062616c616e63650000000000000000000000000000600082015250565b7f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260008201527f6563697069656e74206d61792068617665207265766572746564000000000000602082015250565b7f546f6b656e206e6f742061646465640000000000000000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f42616c616e6365206e6f742073756666696369656e7400000000000000000000600082015250565b50565b60028110612972576129716127ed565b5b50565b61297e8161271d565b811461298957600080fd5b50565b6129958161272f565b81146129a057600080fd5b50565b6129ac8161273b565b81146129b757600080fd5b50565b600281106129c757600080fd5b50565b6129d381612778565b81146129de57600080fd5b5056fea264697066735822122076a1e09ceaad65e6d0b839b506d073867cd65adaba88d0fa486d82f4d3e54e3a64736f6c63430008040033";

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
