import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { contractAddress, nativeToken, nodeUrl } from '../../config';
import ABI from '../artifacts/contracts/Dex.sol/Dex.json';
const DIRECTION = {
  WITHDRAW: 'WITHDRAW',
  DEPOSIT: 'DEPOSIT',
};

function balances() {
  const isSelected = 'bg-slate-900 text-white';
  const [selected, setSelected] = useState<string>();
  const [amount, setAmount] = useState<Map<string, number>>(
    new Map<string, number>(),
  );
  let isActive: boolean;
  const [balanceList, setBalanceList] = useState<any>();
  const { Moralis, isWeb3Enabled, isAuthenticated, account } = useMoralis();
  const ethers = Moralis.web3Library;
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
  const signer = provider.getSigner(account!);
  let contract: any;
  if (isWeb3Enabled) {
    contract = new ethers.Contract(
      contractAddress,
      JSON.stringify(ABI),
      signer,
    );
  }

  const getTokens = async () => {
    const rawTokens = await contract.getTokens();
    const tokens = rawTokens.map((token: any) => {
      return {
        ticker: ethers.utils.parseBytes32String(token.ticker),
        tokenAddress: token.tokenAddress,
        bytes32: token[0],
      };
    });
    return tokens;
  };
  const getBalanceList = async (account: any, tokens: any) => {
    const balanceList = [
      {
        ticker: nativeToken,
        tokenAddress: undefined,
        bytes32: ethers.utils.formatBytes32String(nativeToken),
        balance: ethers.utils.formatEther(
          (
            await contract.balances(
              account,
              ethers.utils.formatBytes32String(nativeToken),
            )
          ).toString(),
        ),
      },
    ];
    tokens.map(async (token: any) => {
      const balance = await (
        await contract.balances(account, token.bytes32)
      ).toString();
      const balanceObj = {
        ...token,
        balance,
      };
      balanceList.push(balanceObj);

      if (isActive) setBalanceList(balanceList);
    });
  };

  useEffect(() => {
    isActive = true;
    async function init() {
      if (isWeb3Enabled && account && isAuthenticated) {
        try {
          const tokens = await getTokens();
          await getBalanceList(account, tokens);
        } catch (e) {
          console.log(e);
        }
      }
    }
    init();
    return () => {
      isActive = false;
    };
  }, [isWeb3Enabled, isAuthenticated]);
  const balanceItems = balanceList?.map((balance: any) => {
    return (
      <div
        className={`grid grid-cols-3 p-2 text-center m-2 rounded-lg transition duration-300 cursor-pointer gap-6 justify-center ${
          selected === balance?.ticker ? isSelected : `bg-slate-400`
        } `}
        key={balance?.ticker}
        onClick={() => setSelected(balance?.ticker)}
      >
        <div className="col-span-1 ">{balance?.ticker}</div>
        <div className="col-span-1">{balance?.balance}</div>
        <input
          id={balance?.ticker}
          type="number"
          onClick={(e) => {
            amount.set(balance?.ticker, e.currentTarget.valueAsNumber);
          }}
          min={0}
          placeholder="00"
          onChange={(e) => {
            amount.set(balance?.ticker, e.target.valueAsNumber);
          }}
          className="w-[100%] rounded-lg appearance-none text-black col-span-1 placeholder:text-right text-right"
        />
      </div>
    );
  });

  const operation = async (operation: string) => {
    if (amount.size === 0) {
      return alert('error amount');
    }
    const selectedAmount = amount.get(selected!);
    if (Number.isNaN(selectedAmount) || selectedAmount === 0) {
      return alert('error value');
    }
    balanceList.map((balance: any) => {
      if (operation === DIRECTION.WITHDRAW) {
        if (
          balance?.ticker === selected &&
          balance?.balance < selectedAmount!
        ) {
          return alert('error on withdraw');
        }
      }
    });
  };
  return (
    <div className="flex min-h-[93vh] max-g-[93vh] p-6 border-b-2 border-slate-900 items-center justify-center">
      <div className="flex-col ">
        <div className="flex rounded-t-lg bg-slate-700 min-w-[50vw] container border-b-2 border-slate-400">
          <button
            type="button"
            onClick={() => operation(DIRECTION.DEPOSIT)}
            className="w-full transition duration-300 rounded-t-lg border-slate-900 hover:bg-slate-400 hover:text-white"
          >
            Deposit
          </button>
          <button
            type="button"
            onClick={() => operation(DIRECTION.WITHDRAW)}
            className="w-full transition duration-300 rounded-t-lg border-slate-900 hover:bg-slate-400 hover:text-white"
          >
            Withdraw
          </button>
        </div>
        <div className="grid grid-cols-3 bg-slate-700 min-w-[50vw] container text-center gap-6 text-white cursor-default">
          <div className="col-span-1">Token</div>
          <div className="col-span-1">Balance</div>
          <div className="col-span-1">Amount</div>
        </div>
        <div className="bg-slate-700 rounded-b-2xl min-h-[80vh] max-h-[80vh] min-w-[50vw] container overflow-x-hidden overflow-y-auto border-b-8 border-slate-700">
          {balanceItems}
        </div>
      </div>
    </div>
  );
}

export default balances;
