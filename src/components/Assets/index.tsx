import { useState } from 'react';
import { nativeToken } from '../../../config';
import { Asset } from '../../../type';
const DIRECTION = {
  LIMIT: 'LIMIT',
  MARKET: 'MARKET',
};
const type = {
  BUY: 0,
  SELL: 1,
};
function Assets({ depositToken, withdrawToken, user }: Asset) {
  const [getType, setType] = useState(type.BUY);
  const [direction, setDirection] = useState(DIRECTION.LIMIT);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const selected = 'w-full text-white bg-slate-900 rounded-md p-1 font-bold';
  const notSelected = 'w-full bg-slate-600 rounded-md p-1 text-black';
  const selectedDirection =
    'rounded-3xl m-2 w-full bg-slate-400 text-black font-bold';
  const notSelectedDirection = 'm-2 w-full';

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (Number.isNaN(amount) || amount === 0) return alert('error');
    if (getType === type.BUY) {
      depositToken(amount, user!.selectedToken.bytes32);
    } else {
      withdrawToken(amount, user!.selectedToken.bytes32);
    }
  };
  console.log('getType ', getType);
  console.log('direction ', direction);

  return (
    <form id="transfer" onSubmit={(e) => onSubmit(e)}>
      <div className="grid items-center grid-cols-2 grid-rows-6 gap-2 p-4 text-white">
        <div className="flex justify-center col-span-2">
          <div className="flex bg-slate-400 w-[80%] rounded-lg border-2 border-slate-400 my-2">
            <button
              type="button"
              onClick={() => setType(type.BUY)}
              className={getType === type.BUY ? selected : notSelected}
            >
              Open
            </button>
            <button
              type="button"
              onClick={() => setType(type.SELL)}
              className={getType === type.SELL ? selected : notSelected}
            >
              Close
            </button>
          </div>
        </div>
        <div className="flex justify-center col-span-2">
          <div className="flex w-[60%] rounded-2xl">
            <button
              type="button"
              onClick={() => setDirection(DIRECTION.LIMIT)}
              className={
                direction === DIRECTION.LIMIT
                  ? selectedDirection
                  : notSelectedDirection
              }
            >
              Limit
            </button>
            <button
              type="button"
              onClick={() => setDirection(DIRECTION.MARKET)}
              className={
                direction === DIRECTION.MARKET
                  ? selectedDirection
                  : notSelectedDirection
              }
            >
              Market
            </button>
          </div>
        </div>
        <div className="col-span-1 col-start-2 text-sm cursor-default">
          <a className="text-gray-500">Avlb </a>
          {user!.balance.dexToken + '  ' + user!.selectedToken.ticker}
        </div>
        <div className="col-span-1">
          <label htmlFor="amount">
            Amount{' '}
            <a className="text-gray-500 ">
              {'( ' + user!.selectedToken.ticker + ' )'}
            </a>
          </label>
        </div>
        <div className="col-span-1 appearance-none">
          <div className="flex justify-end">
            <input
              id="amount"
              type="number"
              min={0}
              placeholder="00"
              onChange={(e) => setAmount(e.target.valueAsNumber)}
              className="w-full text-right text-black rounded-lg placeholder:text-right"
            />
          </div>
        </div>
        <div className="col-span-1">
          <label htmlFor="price">
            Price <a className="text-gray-500 ">{'( ' + nativeToken + ' )'}</a>
          </label>
        </div>
        <div className="col-span-1 appearance-none">
          <div className="flex justify-end">
            <input
              id="price"
              type="text"
              min={0}
              placeholder="00"
              onChange={(e) => setPrice(e.target.valueAsNumber)}
              className="w-full text-right text-black rounded-lg appearance-none placeholder:text-right"
            />
          </div>
        </div>
        <div className="col-span-2 row-start-6 py-4">
          <button
            className="w-full p-1 text-black transition duration-300 bg-slate-400 hover:bg-slate-600 hover:text-white rounded-xl"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default Assets;
