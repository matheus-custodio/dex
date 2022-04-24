import { nativeToken } from '../../../config';
import { TradeList } from '../../../type';

function Trades({ ...tradeList }: TradeList | any) {
  return (
    <div className="flex-wrap h-full text-white border-2 border-black bg-slate-700 rounded-2xl">
      <div className="flex px-2 pt-1 text-xl">Trades</div>
      <div className="flex justify-between px-4 py-2 text-xs font-bold bg-slate-800">
        <p>Price{'(' + tradeList + ')'}</p>
        <p>Amount{'(' + nativeToken + ')'}</p>
        <p>Time</p>
      </div>
      <div className="min-h-[37vh] max-h-[38vh] overflow-auto h-fit">
        <div className="overflow-auto"></div>
      </div>
    </div>
  );
}

export default Trades;
