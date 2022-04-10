import { nativeToken } from '../../../config';
import { OrderBook } from '../../../type';

function OrderBook({ isActive, user }: OrderBook) {
  if (!isActive) {
    return <div className="min-h-[50%]">Loading...</div>;
  }
  console.log('user Order' + user);
  return (
    <div className="flex h-full text-left text-white">
      <div className="grid w-full grid-rows-3 bg-slate-700 rounded-2xl">
        <div className="row-span-2">
          <div className="flex flex-col h-full">
            <a className="p-1">Order Book</a>
            <div className="flex h-full">
              <div className="grid w-full grid-rows-2">
                <div className="row-span-1">
                  <div className="flex justify-between px-4 py-2 text-sm bg-slate-800">
                    <p>Price{'(' + user?.selectedToken?.ticker! + ')'}</p>
                    <p>Amount{'(' + nativeToken + ')'}</p>
                    <p>Sum{'(' + nativeToken + ')'}</p>
                  </div>
                  <div className="flex flex-col max-h-full">
                    {/* {TradeList.map((trade: any) => {
                        return (
                          <>
                            <div className="grid grid-cols-3 p-2 m-2 text-center rounded-lg">
                              <p>{trade.name}</p>
                              <p>{trade.level}</p>
                              <p>{trade.price}</p>
                            </div>
                          </>
                        );
                      })} */}
                  </div>
                </div>
                <div className="row-span-1">SELL</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row-span-1">
          <a className="p-1">Trades</a>
        </div>
      </div>
    </div>
  );
}

export default OrderBook;
