import { useState } from 'react';
import { Asset } from '../../../type';
const DIRECTION = {
  WITHDRAW: 'WITHDRAW',
  DEPOSIT: 'DEPOSIT',
};
function Assets({ isActive, depositToken, withdrawToken, user }: Asset) {
  // const { isAuthenticated } = useMoralis();
  // if (!isAuthenticated && !isActive) {
  //   return (
  //     <>
  //       <Account />
  //     </>
  //   );
  if (!isActive) {
    return <div>Loading...</div>;
  }
  const [direction, setDirection] = useState(DIRECTION.DEPOSIT);
  const [amount, setAmount] = useState(0);
  const selected = 'w-full text-white border-8 border-black bg-slate-900';
  const notSelected = 'w-full border-8 border-black bg-slate-600';
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (Number.isNaN(amount) || amount === 0) return alert('error');
    if (direction === DIRECTION.DEPOSIT) {
      depositToken(amount, user!.selectedToken.bytes32);
    } else {
      withdrawToken(amount, user!.selectedToken.bytes32);
    }
  };

  return (
    <form id="transfer" onSubmit={(e) => onSubmit(e)}>
      <div className="flex justify-center p-2">
        <button
          type="button"
          onClick={() => setDirection(DIRECTION.DEPOSIT)}
          className={direction === DIRECTION.DEPOSIT ? selected : notSelected}
        >
          Deposit
        </button>
        <button
          type="button"
          onClick={() => setDirection(DIRECTION.WITHDRAW)}
          className={direction === DIRECTION.WITHDRAW ? selected : notSelected}
        >
          Withdraw
        </button>
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <div>
          <div>
            <input
              id="amount"
              type="number"
              min={0}
              placeholder="00"
              onChange={(e) => setAmount(e.target.valueAsNumber)}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                {user!.selectedToken.ticker}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Assets;
