/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Wallet, WalletInterface } from "../Wallet";

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
  "0x608060405234801561001057600080fd5b5061002d61002261003260201b60201c565b61003a60201b60201c565b6100fe565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6116998061010d6000396000f3fe60806040526004361061009c5760003560e01c80638da5cb5b116100645780638da5cb5b146101855780639776aacf146101b05780639ead7222146101d9578063c1612c4414610216578063d0e30db01461023f578063f2fde38b146102495761009c565b80631f14df69146100a15780632e1a7d4d146100de578063667cb4ba14610107578063715018a6146101455780637d34900a1461015c575b600080fd5b3480156100ad57600080fd5b506100c860048036038101906100c39190610f9b565b610272565b6040516100d59190611380565b60405180910390f35b3480156100ea57600080fd5b5061010560048036038101906101009190611065565b610297565b005b34801561011357600080fd5b5061012e60048036038101906101299190611000565b6104f1565b60405161013c929190611297565b60405180910390f35b34801561015157600080fd5b5061015a610535565b005b34801561016857600080fd5b50610183600480360381019061017e919061108e565b6105bd565b005b34801561019157600080fd5b5061019a610877565b6040516101a79190611201565b60405180910390f35b3480156101bc57600080fd5b506101d760048036038101906101d29190611029565b6108a0565b005b3480156101e557600080fd5b5061020060048036038101906101fb9190611065565b6109db565b60405161020d919061127c565b60405180910390f35b34801561022257600080fd5b5061023d6004803603810190610238919061108e565b6109ff565b005b610247610c28565b005b34801561025557600080fd5b50610270600480360381019061026b9190610f72565b610d2e565b005b6003602052816000526040600020602052806000526040600020600091509150505481565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060007f424e420000000000000000000000000000000000000000000000000000000000815260200190815260200160002054101561034a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610341906112e0565b60405180910390fd5b6103cd81600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060007f424e420000000000000000000000000000000000000000000000000000000000815260200190815260200160002054610e2690919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060007f424e42000000000000000000000000000000000000000000000000000000000081526020019081526020016000208190555060003373ffffffffffffffffffffffffffffffffffffffff1682604051610467906111ec565b60006040518083038185875af1925050503d80600081146104a4576040519150601f19603f3d011682016040523d82523d6000602084013e6104a9565b606091505b50509050806104ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104e490611300565b60405180910390fd5b5050565b60016020528060005260406000206000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b61053d610e3c565b73ffffffffffffffffffffffffffffffffffffffff1661055b610877565b73ffffffffffffffffffffffffffffffffffffffff16146105b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105a890611340565b60405180910390fd5b6105bb6000610e44565b565b80600073ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610664576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161065b90611320565b60405180910390fd5b82600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008481526020019081526020016000205410156106f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106ee90611360565b60405180910390fd5b61075a83600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002054610e2690919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000848152602001908152602001600020819055506001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33856040518363ffffffff1660e01b815260040161081f929190611253565b602060405180830381600087803b15801561083957600080fd5b505af115801561084d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108719190610fd7565b50505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6108a8610e3c565b73ffffffffffffffffffffffffffffffffffffffff166108c6610877565b73ffffffffffffffffffffffffffffffffffffffff161461091c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161091390611340565b60405180910390fd5b60405180604001604052808381526020018273ffffffffffffffffffffffffffffffffffffffff16815250600160008481526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505060028290806001815401808255809150506001900390600052602060002001600090919091909150555050565b600281815481106109eb57600080fd5b906000526020600020016000915090505481565b80600073ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610aa6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a9d90611320565b60405180910390fd5b6001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff1660e01b8152600401610b199392919061121c565b602060405180830381600087803b158015610b3357600080fd5b505af1158015610b47573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b6b9190610fd7565b50610bcf83600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002054610f0890919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002081905550505050565b60003411610c3557600080fd5b610cb834600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060007f424e420000000000000000000000000000000000000000000000000000000000815260200190815260200160002054610f0890919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060007f424e420000000000000000000000000000000000000000000000000000000000815260200190815260200160002081905550565b610d36610e3c565b73ffffffffffffffffffffffffffffffffffffffff16610d54610877565b73ffffffffffffffffffffffffffffffffffffffff1614610daa576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610da190611340565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610e1a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e11906112c0565b60405180910390fd5b610e2381610e44565b50565b60008183610e34919061140d565b905092915050565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60008183610f1691906113b7565b905092915050565b600081359050610f2d81611607565b92915050565b600081519050610f428161161e565b92915050565b600081359050610f5781611635565b92915050565b600081359050610f6c8161164c565b92915050565b600060208284031215610f8457600080fd5b6000610f9284828501610f1e565b91505092915050565b60008060408385031215610fae57600080fd5b6000610fbc85828601610f1e565b9250506020610fcd85828601610f48565b9150509250929050565b600060208284031215610fe957600080fd5b6000610ff784828501610f33565b91505092915050565b60006020828403121561101257600080fd5b600061102084828501610f48565b91505092915050565b6000806040838503121561103c57600080fd5b600061104a85828601610f48565b925050602061105b85828601610f1e565b9150509250929050565b60006020828403121561107757600080fd5b600061108584828501610f5d565b91505092915050565b600080604083850312156110a157600080fd5b60006110af85828601610f5d565b92505060206110c085828601610f48565b9150509250929050565b6110d381611441565b82525050565b6110e28161145f565b82525050565b60006110f56026836113a6565b9150611100826114c2565b604082019050919050565b60006111186012836113a6565b915061112382611511565b602082019050919050565b600061113b603a836113a6565b91506111468261153a565b604082019050919050565b600061115e600f836113a6565b915061116982611589565b602082019050919050565b60006111816020836113a6565b915061118c826115b2565b602082019050919050565b60006111a46016836113a6565b91506111af826115db565b602082019050919050565b60006111c760008361139b565b91506111d282611604565b600082019050919050565b6111e681611489565b82525050565b60006111f7826111ba565b9150819050919050565b600060208201905061121660008301846110ca565b92915050565b600060608201905061123160008301866110ca565b61123e60208301856110ca565b61124b60408301846111dd565b949350505050565b600060408201905061126860008301856110ca565b61127560208301846111dd565b9392505050565b600060208201905061129160008301846110d9565b92915050565b60006040820190506112ac60008301856110d9565b6112b960208301846110ca565b9392505050565b600060208201905081810360008301526112d9816110e8565b9050919050565b600060208201905081810360008301526112f98161110b565b9050919050565b600060208201905081810360008301526113198161112e565b9050919050565b6000602082019050818103600083015261133981611151565b9050919050565b6000602082019050818103600083015261135981611174565b9050919050565b6000602082019050818103600083015261137981611197565b9050919050565b600060208201905061139560008301846111dd565b92915050565b600081905092915050565b600082825260208201905092915050565b60006113c282611489565b91506113cd83611489565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561140257611401611493565b5b828201905092915050565b600061141882611489565b915061142383611489565b92508282101561143657611435611493565b5b828203905092915050565b600061144c82611469565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f496e7375666669656e742062616c616e63650000000000000000000000000000600082015250565b7f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260008201527f6563697069656e74206d61792068617665207265766572746564000000000000602082015250565b7f546f6b656e206e6f742061646465640000000000000000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f42616c616e6365206e6f742073756666696369656e7400000000000000000000600082015250565b50565b61161081611441565b811461161b57600080fd5b50565b61162781611453565b811461163257600080fd5b50565b61163e8161145f565b811461164957600080fd5b50565b61165581611489565b811461166057600080fd5b5056fea2646970667358221220e073d9132e52f1181dc9b9749d78f712f3befbd4202838809c48ba652e78325764736f6c63430008040033";

type WalletConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WalletConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Wallet__factory extends ContractFactory {
  constructor(...args: WalletConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Wallet> {
    return super.deploy(overrides || {}) as Promise<Wallet>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Wallet {
    return super.attach(address) as Wallet;
  }
  connect(signer: Signer): Wallet__factory {
    return super.connect(signer) as Wallet__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WalletInterface {
    return new utils.Interface(_abi) as WalletInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Wallet {
    return new Contract(address, _abi, signerOrProvider) as Wallet;
  }
}