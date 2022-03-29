import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { contractAddress, nodeUrl } from '../../config';
import { BalanceList } from '../../type';
import ABI from '../artifacts/contracts/Dex.sol/Dex.json';

function balances() {
  const [balanceList, setBalanceList] = useState<BalanceList>();
  const {
    Moralis,
    isWeb3Enabled,
    isAuthenticated,
    enableWeb3,
    account,
    logout,
    authenticate,
  } = useMoralis();
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
    const balanceList: BalanceList = [
      {
        token: {
          ticker: 'TBNB',
          tokenAddress: undefined,
          bytes32: ethers.utils.formatBytes32String('TBNB'),
        },
        balance: ethers.utils.formatEther(
          (
            await contract.balances(
              account,
              ethers.utils.formatBytes32String('TBNB'),
            )
          ).toString(),
        ),
      },
    ];
    tokens.map(async (token: any) => {
      const balance = (
        await contract.balances(account, token.bytes32)
      ).toString();
      const balanceObj = {
        token,
        balance,
      };
      balanceList.push(balanceObj);
      console.log(balanceList);
    });
    return balanceList;
  };

  useEffect(() => {
    let balanceList;
    async function init() {
      if (isWeb3Enabled && account) {
        try {
          const tokens = await getTokens();
          balanceList = getBalanceList(account, tokens);
        } catch (e) {
          console.log(e);
        }
      }
    }
    init();
    setBalanceList(balanceList);
    // if (isAuthenticated && !isUser) {
    //   console.log('account, tokens[0] ', account, tokens[0]);
    //   getBalances(account, tokens[0]);
    // }
  }, [isWeb3Enabled, isAuthenticated]);
  console.log('balances ', balanceList);
  return <div className="bg-slate-800">balances</div>;
}

export default balances;
