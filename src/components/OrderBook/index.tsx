import { nativeToken } from '../../../config';
import { TradeList } from '../../../data';
import { OrderBook } from '../../../type';

function OrderBook({ user }: OrderBook) {
  console.log('user Order' + user);
  return (
    <div className="flex-col text-left text-white">
      <div className="flex">
        <a className="p-1">Order Book</a>
      </div>
      <div className="h-[35vh]">
        <div className="h-[18vh]">
          <div className="flex justify-between px-4 py-2 text-xs font-bold bg-slate-800">
            <p>Price{'(' + user?.selectedToken?.ticker! + ')'}</p>
            <p>Amount{'(' + nativeToken + ')'}</p>
            <p>Sum{'(' + nativeToken + ')'}</p>
          </div>
          <div className="h-[14vh] overflow-y-scroll overflow-x-hidden">
            <div className="flex-grow">
              {TradeList.map((trade: any) => {
                return (
                  <div className="flex justify-between px-4 my-1">
                    <p>{trade.name}</p>
                    <p>{trade.level}</p>
                    <p>{trade.price}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="h-[18vh]">
          <div className="flex justify-between px-4 py-2 text-xs font-bold bg-slate-800">
            <p>Price{'(' + user?.selectedToken?.ticker! + ')'}</p>
            <p>Amount{'(' + nativeToken + ')'}</p>
            <p>Sum{'(' + nativeToken + ')'}</p>
          </div>
          <div className="h-[14vh] overflow-y-scroll overflow-x-hidden">
            <div className="flex-grow">
              {TradeList.map((trade: any) => {
                return (
                  <div className="flex justify-between px-4 my-1">
                    <p>{trade.name}</p>
                    <p>{trade.level}</p>
                    <p>{trade.price}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[21vh] overflow-hidden">
        <div className="flex">
          <a className="p-1">Trades</a>
        </div>
        <div className="flex justify-between px-4 py-2 text-xs font-bold bg-slate-800">
          <p>Price{'(' + user?.selectedToken?.ticker! + ')'}</p>
          <p>Amount{'(' + nativeToken + ')'}</p>
          <p>Sum{'(' + nativeToken + ')'}</p>
        </div>
        <div className="h-[14vh] overflow-y-scroll overflow-x-hidden">
          <div className="flex-grow">
            {TradeList.map((trade: any) => {
              return (
                <div className="flex justify-between px-4 my-1">
                  <p>{trade.name}</p>
                  <p>{trade.level}</p>
                  <p>{trade.price}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderBook;
