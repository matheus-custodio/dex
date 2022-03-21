import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

function Account() {
  useEffect(() => {});
  const { authenticate, isAuthenticated, logout, account } = useMoralis();

  const isLogged = !isAuthenticated || !account;
  return (
    <div
      className="w-[170px] px-4 py-2 transition duration-300 rounded-lg cursor-pointer bg-slate-400 hover:bg-slate-600 hover:text-white justify-center flex"
      onClick={() => {
        try {
          if (isLogged) {
            authenticate();
          } else {
            logout();
          }
        } catch (e) {
          console.error(e);
        }
      }}
    >
      {isLogged ? 'Connect' : 'Disconnect'}
      <a className="hidden lg:inline-flex">&nbsp;Wallet</a>
    </div>
  );
}

export default Account;
