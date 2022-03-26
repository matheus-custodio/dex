import { useMoralis } from 'react-moralis';

function Balance() {
  const { isAuthenticated, account, isWeb3Enabled } = useMoralis();

  if (isAuthenticated && account && isWeb3Enabled) {
    return (
      <div className="flex px-4 py-2 mr-4 text-center rounded-lg bg-slate-400">
        0.00
        <a className="hidden md:inline-flex">&nbsp;TBNB</a>
      </div>
    );
  }
  return <></>;
}

export default Balance;
