import { useState } from 'react';
import { Asset } from '../../../type';
const DIRECTION = {
  LIMIT: 'LIMIT',
  MARKET: 'MARKET',
};
const type = {
  BUY: 0,
  SELL: 1,
};
function Assets({ isActive, depositToken, withdrawToken, user }: Asset) {
  if (!isActive) {
    return <div>Loading...</div>;
  }
  const [getType, setType] = useState(type.BUY);
  const [direction, setDirection] = useState(DIRECTION.LIMIT);
  const [amount, setAmount] = useState(0);
  const selected = 'w-full text-white bg-slate-900 rounded-md p-1';
  const notSelected = 'w-full bg-slate-600 rounded-md p-1';
  const selectedDirection = 'rounded-3xl m-2 w-full bg-slate-400';
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

  return (
    <form id="transfer" onSubmit={(e) => onSubmit(e)}>
      <div className="flex justify-center pt-2 ">
        <div className="flex bg-slate-400 w-[80%] rounded-lg border-2 border-slate-400">
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
      <div className="flex justify-center py-2">
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
      <div className="flex text-white">
        <label htmlFor="amount">Amount</label>
        <div>
          <div className="appearance-none">
            <input
              id="amount"
              type="text"
              min={0}
              placeholder="00"
              onChange={(e) => setAmount(e.target.valueAsNumber)}
              className="text-right text-black appearance-none placeholder:text-right"
            />
            <div className="input-group-append">
              <span className="input-group-text">
                {user!.selectedToken.ticker}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex text-white">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Assets;
