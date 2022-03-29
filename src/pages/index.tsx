import { useEffect, useState } from 'react';
import { useChain, useMoralis } from 'react-moralis';
import { contractAddress, nodeUrl } from '../../config';
import { Account, Token } from '../../type';
import ABI from '../artifacts/contracts/Dex.sol/Dex.json';
import Assets from '../components/Assets';
import Graph from '../components/Graph';
import History from '../components/History';
import NavBar from '../components/NavBar';
import OrderBook from '../components/OrderBook';
import Orders from '../components/Orders';

function HomePage() {
  const SIDE = {
    BUY: 0,
    SELL: 1,
  };
  const [user, setUser] = useState<Account>();
  const [orders, setOrders] = useState({
    BUY: [],
    SELL: [],
  });
  const [tokens, setTokens] = useState<Token | undefined>();
  const { switchNetwork, chainId } = useChain();
  const {
    Moralis,
    isWeb3Enabled,
    isAuthenticated,
    isWeb3EnableLoading,
    enableWeb3,
    account,
    logout,
    authenticate,
  } = useMoralis();
  const ethers = Moralis.web3Library;
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
  const signer = provider.getSigner(account!);
  let isUser = typeof user != 'undefined';
  let contract: any;
  let contractSigner: any;
  if (isWeb3Enabled) {
    contract = new ethers.Contract(
      contractAddress,
      JSON.stringify(ABI),
      signer,
    );
    // contractSigner = new ethers.Contract(
    //   contractAddress,
    //   JSON.stringify(ABI),
    //   signer,
    // );
  }
  //methods
  const createUser = (address: any, balance: any, token: Token) => {
    const newUser = {
      address: address,
      balance: balance,
      selectedToken: token,
    };
    return newUser;
  };
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

  const getOrders = async (token: any) => {
    const orders = await Promise.all([
      contract.GetOrderBook(token.bytes32, SIDE.BUY),
      contract.GetOrderBook(token.bytes32, SIDE.SELL),
    ]);
    return { BUY: orders[0], SELL: orders[1] };
  };

  const getBalances = async (account: any, bytes32: any) => {
    const balances = await Promise.all([
      contract.balances(account, ethers.utils.formatBytes32String('TBNB')),
      contract.balances(account, bytes32),
    ]);
    return {
      nativeToken: balances[0].toString(),
      dexToken: balances[1].toString(),
    };
  };

  const selectToken = (token: any) => {
    const newState: Account = createUser(user?.address, user?.balance!, token);
    setUser(newState);
  };

  const depositToken = async (amount: BigInteger, bytes32: any) => {
    await contract.depositToken(amount, bytes32);
    const balances = await getBalances(
      user?.address,
      user?.selectedToken.bytes32,
    );
    setUser(createUser(user?.address, balances, user?.selectedToken));
  };

  const withdrawToken = async (amount: BigInteger, bytes32: any) => {
    await contract.withdrawToken(amount, bytes32);
    const balances = await getBalances(
      user?.address,
      user?.selectedToken.bytes32,
    );
    setUser(createUser(user?.address, balances, user?.selectedToken));
  };

  useEffect(() => {
    if (!isWeb3Enabled && !isWeb3EnableLoading) {
      enableWeb3();
    }
  }, [isAuthenticated, isWeb3Enabled]);

  useEffect(() => {
    async function init() {
      if (isWeb3Enabled) {
        if (chainId != '0x61' && isAuthenticated) {
          logout();
        } else if (chainId != '0x61') {
          await switchNetwork('0x61');
          authenticate();
        }
        try {
          const tokens = await getTokens();
          const orders = await getOrders(
            isUser ? user?.selectedToken : tokens[0],
          );
          console.log(
            'account != null && !isUser && isAuthenticated ',
            account != null && !isUser && isAuthenticated,
          );
          if (account != null && !isUser && isAuthenticated) {
            const balances = await getBalances(account, tokens[0].bytes32);
            setUser({
              address: account,
              balance: balances,
              selectedToken: tokens[0],
            });
          }
          setTokens(tokens);
          setOrders(orders);
        } catch (e) {
          console.log(e);
        }
      }
    }
    isUser = typeof user != 'undefined';
    init();
    // if (isAuthenticated && !isUser) {
    //   console.log('account, tokens[0] ', account, tokens[0]);
    //   getBalances(account, tokens[0]);
    // }
  }, [isWeb3Enabled, chainId, isAuthenticated]);
  //read -->
  //getOrderBook - OK
  //getTokens - OK
  //NewTrade event

  //TokenPage -->
  //getBalances - OK

  //write -->
  //admin -->
  //addToken

  //createLimitOrder
  //createMarketOrder

  //TokenPage -->
  //deposit
  //depositToken
  //withdraw
  //withdrawToken
  console.log('isUser ', isUser);
  return (
    <div className="min-h-screen bg-slate-600">
      <NavBar />
      {isWeb3Enabled ? (
        <div className="grid h-screen grid-cols-12 grid-rows-3 gap-6 px-5 pb-5 my-2 mb-0 ">
          <div className="col-span-12 row-span-2 p-4 text-base text-center lg:col-span-6 md:col-span-8 rounded-2xl bg-slate-400">
            <Graph />
          </div>
          <div className="col-span-12 row-span-2 p-4 text-base text-center lg:col-span-3 md:col-span-4 rounded-2xl bg-slate-400">
            <OrderBook />
          </div>
          <div className="col-span-12 row-span-3 text-base text-center lg:col-span-3 rounded-2xl md:col-span-8">
            <div className="row-span-2 min-h-[50%] bg-slate-400 rounded-2xl">
              <Assets
                isActive={isUser}
                depositToken={depositToken}
                withdrawToken={withdrawToken}
                user={user}
              />
            </div>
            <Orders />
          </div>
          <div className="col-span-12 p-4 text-base text-center lg:col-span-9 md:col-span-8 rounded-2xl bg-slate-400">
            <History />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default HomePage;
