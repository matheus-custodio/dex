import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

function Account() {
  useEffect(() => {});
  const { authenticate, isAuthenticated, logout, user } = useMoralis();
  const isLogged = !isAuthenticated || !user?.authenticated();

  return (
    <div
      className="w-[170px] px-4 py-2 truncate transition duration-300 rounded-lg cursor-pointer bg-slate-400 hover:bg-slate-600 hover:text-white text-center"
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
      {isLogged ? 'Connect Wallet' : 'Disconnect Wallet'}
    </div>
  );
}

export default Account;
