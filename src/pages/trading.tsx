import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { contractAddress, nodeUrl } from '../../config';
import { AccountType, Token } from '../../type';
import ABI from '../artifacts/contracts/Dex.sol/Dex.json';
import Assets from '../components/Assets';
import Graph from '../components/Graph';
import History from '../components/History';
import OrderBook from '../components/OrderBook';
import Orders from '../components/Orders';

function trading() {
  const SIDE = {
    BUY: 0,
    SELL: 1,
  };
  const [user, setUser] = useState<AccountType | any>();
  const [orders, setOrders] = useState();
  const [tokens, setTokens] = useState<Token | undefined>();
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
  console.log('provider ', provider);
  const signer = provider.getSigner(account!);
  console.log('signer ', signer);
  let isUser = typeof user != 'undefined';
  let contract: any;
  if (isWeb3Enabled) {
    contract = new ethers.Contract(
      contractAddress,
      JSON.stringify(ABI),
      signer,
    );
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
      (
        await contract.balances(
          account,
          ethers.utils.formatBytes32String('TBNB'),
        )
      ).toString(),
      (await contract.balances(account, bytes32)).toString(),
    ]);
    return {
      nativeToken: balances[0],
      dexToken: balances[1],
    };
  };

  const selectToken = (token: any) => {
    const newState: AccountType = createUser(
      user?.address,
      user?.balance!,
      token,
    );
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
    let isActive = true;
    let tokens: any;
    let orders: any;
    let balances: any;
    let user: any;
    async function init() {
      if (isWeb3Enabled) {
        try {
          tokens = await getTokens();
          orders = await getOrders(isUser ? user?.selectedToken : tokens[0]);
          if (account != null && !isUser && isAuthenticated) {
            balances = await getBalances(account, tokens[0].bytes32);
            user = {
              address: account,
              balance: balances,
              selectedToken: tokens[0],
            };
          }
        } catch (e) {
          console.log(e);
        }
      }
      if (isActive) {
        setUser(user);
        setTokens(tokens);
        setOrders(orders);
      }
    }
    isUser = typeof user != 'undefined';
    init();

    // if (isAuthenticated && !isUser) {
    //   console.log('account, tokens[0] ', account, tokens[0]);
    //   getBalances(account, tokens[0]);
    // }
    return () => {
      isActive = false;
    };
  }, [isWeb3Enabled, isAuthenticated]);
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
  console.log('user ', user);
  console.log('tokens ', tokens);
  console.log('orders ', orders);
  return (
    <>
      {isWeb3Enabled ? (
        <div className="grid min-h-[93vh] grid-cols-12 grid-rows-3 gap-6 p-2 m-auto">
          <div className="col-span-12 row-span-2 p-4 text-base text-center border-2 border-slate-800 lg:col-span-6 md:col-span-8 rounded-2xl bg-slate-700">
            <Graph />
          </div>
          <div className="col-span-12 row-span-2 p-4 text-base text-center border-2 border-slate-800 lg:col-span-3 md:col-span-4 rounded-2xl bg-slate-700">
            <OrderBook />
          </div>
          <div className="col-span-12 row-span-3 text-base text-center border-2 border-slate-800 lg:col-span-3 rounded-2xl md:col-span-8">
            <div className="row-span-2 min-h-[50%] bg-slate-700 rounded-2xl">
              <Assets
                isActive={isUser}
                depositToken={depositToken}
                withdrawToken={withdrawToken}
                user={user}
              />
            </div>
            <Orders />
          </div>
          <div className="col-span-12 p-4 text-base text-center border-2 border-slate-800 lg:col-span-9 md:col-span-8 rounded-2xl bg-slate-700">
            <History />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default trading;
