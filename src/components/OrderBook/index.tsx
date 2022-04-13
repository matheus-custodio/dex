import { nativeToken } from '../../../config';
import { TradeList } from '../../../data';
import { OrderBook } from '../../../type';

function OrderBook({ user }: OrderBook) {
  return (
    <div className="flex h-full text-white rounded-lg">
      <div className="grid w-full grid-rows-2 rounded-lg">
        <div className="row-span-1">
          <div className="flex justify-between px-4 py-2 text-xs font-bold rounded-t-2xl bg-slate-800">
            <p>Price{'(' + user?.selectedToken?.ticker! + ')'}</p>
            <p>Amount{'(' + nativeToken + ')'}</p>
            <p>Sum{'(' + nativeToken + ')'}</p>
          </div>
          <div className="min-h-[26vh] max-h-[27vh] overflow-auto 2xl h-fit">
            <div className="overflow-auto">
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
        <div className="row-span-1">
          <div className="flex justify-between px-4 py-2 text-xs font-bold rounded-t-md bg-slate-800">
            <p>Price{'(' + user?.selectedToken?.ticker! + ')'}</p>
            <p>Amount{'(' + nativeToken + ')'}</p>
            <p>Sum{'(' + nativeToken + ')'}</p>
          </div>
          <div className="min-h-[26vh] max-h-[27vh] overflow-auto 2xl h-fit">
            <div className="overflow-auto">
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
    </div>
    // <div className="flex-col text-left text-white">
    //   <div className="flex">
    //     <a className="p-1">Order Book</a>
    //   </div>
    //     <div className="h-[18vh]">

    //       <div className="h-[14vh] overflow-y-scroll overflow-x-hidden">
    //       </div>
    //     </div>
    //   </div>
    //   <div className="h-[21vh] overflow-hidden">
    //     <div className="flex">
    //       <a className="p-1">Trades</a>
    //     </div>
    //     <div className="flex justify-between px-4 py-2 text-xs font-bold bg-slate-800">
    //       <p>Price{'(' + user?.selectedToken?.ticker! + ')'}</p>
    //       <p>Amount{'(' + nativeToken + ')'}</p>
    //       <p>Sum{'(' + nativeToken + ')'}</p>
    //     </div>
    //     <div className="h-[14vh] overflow-y-scroll overflow-x-hidden">
    //       <div className="flex-grow">
    //         {TradeList.map((trade: any) => {
    //           return (
    //             <div className="flex justify-between px-4 my-1">
    //               <p>{trade.name}</p>
    //               <p>{trade.level}</p>
    //               <p>{trade.price}</p>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default OrderBook;
