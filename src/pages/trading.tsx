import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { contractAddress, nativeToken, nodeUrl } from '../../config';
import { AccountType, Order, Orders, Token, TradeList } from '../../type';
import ABI from '../artifacts/contracts/Dex.sol/Dex.json';
import Assets from '../components/Assets';
import Graph from '../components/Graph';
import History from '../components/History';
import OrderBook from '../components/OrderBook';
import Selector from '../components/Selector';
import Trades from '../components/Trades';

function trading() {
  const SIDE = {
    BUY: 0,
    SELL: 1,
  };
  const [user, setUser] = useState<AccountType>();
  const [orders, setOrders] = useState<Orders>();
  const [trades, setTrades] = useState<TradeList>();
  const [tokens, setTokens] = useState<Token | undefined>();
  const {
    Moralis,
    isWeb3Enabled,
    isAuthenticated,
    isWeb3EnableLoading,
    enableWeb3,
    account,
  } = useMoralis();
  const ethers = Moralis.web3Library;
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
  const signer = provider.getSigner(account!);
  let isUser = typeof user != 'undefined';
  let contract: any;
  if (isWeb3Enabled) {
    contract = new ethers.Contract(
      contractAddress,
      JSON.stringify(ABI),
      signer,
    );
  }
  const getOrderList = (rawOrderList: any) => {
    let orderList: Array<Order> = [];
    rawOrderList.map((order: any) => {
      const formatted: Order = {
        amount: order.amount.toString(),
        filled: order.filled.toString(),
        price: order.price.toString(),
        trader: order.trader,
      };
      orderList.push(formatted);
    });
    return orderList;
  };

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
    const OrderList = {
      BUY: getOrderList(orders[0]),
      SELL: getOrderList(orders[1]),
    };
    return OrderList;
  };

  const getBalances = async (account: any, bytes32: any) => {
    const balances = await Promise.all([
      (
        await contract.balances(
          account,
          ethers.utils.formatBytes32String(nativeToken),
        )
      ).toString(),
      (await contract.balances(account, bytes32)).toString(),
    ]);
    return {
      nativeToken: balances[0],
      dexToken: balances[1],
    };
  };

  const selectToken = async (token: any) => {
    if (token.ticker === user?.selectedToken.ticker) return;

    const balances = await getBalances(user?.address, token.bytes32);
    const newState: AccountType = createUser(user?.address, balances, token);
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
    let isActive = true;
    let tokens: any;
    let orders: any;
    let balances: any;
    let user: any;
    async function init() {
      if (isWeb3Enabled && !isWeb3EnableLoading) {
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

    return () => {
      isActive = false;
    };
  }, [isWeb3Enabled, isAuthenticated]);

  useEffect(() => {
    if (isUser) {
      const ordersList = getOrders(user?.selectedToken);
      Promise.resolve(ordersList).then((response: any) => {
        setOrders(response);
      });
    }
  }, [user?.selectedToken]);

  /**
   * TODO: fix change account flux
   * TODO: fix balance page rendering
   * * TK2  0x544b320000000000000000000000000000000000000000000000000000000000
   * * MTK  0x4d544b0000000000000000000000000000000000000000000000000000000000
   */

  if (!isUser) {
    return <div>Loading</div>;
  }

  return (
    <>
      {isWeb3Enabled && (
        <div className="flex items-center">
          <div className="grid min-h-[93vh] grid-cols-12 grid-rows-3 gap-1 p-2 w-full self-center">
            <div className="col-span-12 row-span-1 p-4 text-base text-center border-2 border-black lg:row-span-2 lg:col-span-6 rounded-2xl bg-slate-700">
              <Selector user={user} tokens={tokens} selectToken={selectToken} />
              <Graph />
            </div>
            <div className="min-h-full col-span-12 row-span-2 text-base text-center border-2 border-black lg:col-span-3 rounded-2xl bg-slate-700">
              <OrderBook user={user} orders={orders} />
            </div>
            <div className="col-span-12 row-span-3 text-base text-center lg:col-span-3 rounded-2xl ">
              <div className="flex h-full">
                <div className="grid w-full grid-rows-2 gap-1">
                  <div className="row-span-1">
                    <Assets
                      depositToken={depositToken}
                      withdrawToken={withdrawToken}
                      user={user}
                    />
                  </div>
                  <div className="row-span-1">
                    <Trades user={user} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 p-4 text-base text-center border-2 border-black lg:col-span-9 rounded-2xl bg-slate-700">
              <History orders={orders} user={user} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default trading;
