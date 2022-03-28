import { useEffect, useState } from 'react';
import { useChain, useMoralis } from 'react-moralis';
import { contractAddress, nodeUrl } from '../../config';
import { Token } from '../../type';
import ABI from '../artifacts/contracts/Dex.sol/Dex.json';
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
  const [orders, setOrders] = useState({
    BUY: [],
    SELL: [],
  });
  const [tokens, setTokens] = useState<Token>();
  const { switchNetwork, chainId } = useChain();
  const {
    Moralis,
    isWeb3Enabled,
    isAuthenticated,
    isWeb3EnableLoading,
    enableWeb3,
    user,
    account,
    logout,
    authenticate,
  } = useMoralis();
  const ethers = Moralis.web3Library;
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
  let contract: any;
  //methods
  const getTokens = async () => {
    const rawTokens = await contract.getTokens();
    const tokens = rawTokens.map((token: any) => {
      console.log('token ', token[0]);
      return {
        ticker: ethers.utils.parseBytes32String(token.ticker),
        tokenAddress: token.tokenAddress,
        bytes: token[0],
      };
    });
    console.log('tokens ', tokens);
    setTokens(tokens);
  };

  const getOrders = async (token: any) => {
    const orders = await Promise.all([
      contract.GetOrderBook(
        ethers.utils.formatBytes32String(token.ticker),
        SIDE.BUY,
      ),
      contract.GetOrderBook(
        ethers.utils.formatBytes32String(token.ticker),
        SIDE.SELL,
      ),
    ]);
    console.log('orders[0] ', orders[0]);
    console.log('orders[1] ', orders[1]);
    return { BUY: orders[0], SELL: orders[1] };
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
          contract = new ethers.Contract(
            contractAddress,
            JSON.stringify(ABI),
            provider,
          );
          getTokens();
          getOrders(tokens[0]);
        } catch (e) {
          console.log(e);
        }
      }
    }
    init();
  }, [isWeb3Enabled, chainId]);
  console.log('user ', user);
  console.log('account ', account);
  //read -->
  //getOrderBook
  //getTokens - OK
  //NewTrade event

  //TokenPage -->
  //getBalances

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

  return (
    <div className="min-h-screen bg-slate-600">
      <NavBar />
      <div className="grid h-screen grid-cols-12 grid-rows-3 gap-6 px-5 pb-5 my-2 mb-0 ">
        <div className="col-span-12 row-span-2 p-4 text-base text-center lg:col-span-6 md:col-span-8 rounded-2xl bg-slate-400">
          <Graph />
        </div>
        <div className="col-span-12 row-span-2 p-4 text-base text-center lg:col-span-3 md:col-span-4 rounded-2xl bg-slate-400">
          <OrderBook />
        </div>
        <div className="col-span-12 row-span-3 p-4 text-base text-center lg:col-span-3 rounded-2xl bg-slate-400 md:col-span-8">
          <Orders />
        </div>
        <div className="col-span-12 p-4 text-base text-center lg:col-span-9 md:col-span-8 rounded-2xl bg-slate-400">
          <History />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
