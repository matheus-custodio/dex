import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { TradeList } from '../../../data';
import { Order } from '../../../type';
function History({ orders, user }: any) {
  const [tabIndex, setTabIndex] = useState(0);
  const selected = 'border-b-2 text-white border-slate-400';
  const notSelected =
    'border-b-2 hover:border-white border-slate-700 hover:text-slate-400 ';
  const myOrders: Array<Order> = orders?.SELL.filter(
    (order: any) => order.trader.toLowerCase() === user?.address,
  ).concat(
    orders?.BUY.filter(
      (order: any) => order.trader.toLowerCase() === user?.address,
    ),
  );
  const myTrades = TradeList.filter(
    (trade: any) => trade.trader.toLowerCase() === user?.address,
  );
  return (
    <div className="flex px-2 text-lg text-white">
      <Tabs
        isLazy
        variant={'unstyled'}
        onChange={(index) => setTabIndex(index)}
      >
        <TabList>
          <Tab className={tabIndex === 0 ? selected : notSelected}>
            Open Orders
          </Tab>
          <Tab className={tabIndex === 1 ? selected : notSelected}>
            Order History
          </Tab>
        </TabList>
        <TabPanels className="flex h-full">
          <TabPanel>
            <div className="min-h-[15vh] max-h-[16vh] overflow-auto h-fit min-w-full ">
              {myOrders?.map((order: any, index) => (
                <div className="flex justify-between px-4 my-1" key={index}>
                  <p>Trader: {order.trader}</p>
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="min-h-[15vh] max-h-[16vh] overflow-auto h-fit min-w-full ">
              {myTrades?.map((trade: any, index) => (
                <div className="flex justify-between px-4 my-1" key={index}>
                  <p>Time: {trade.time}</p>
                </div>
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default History;
