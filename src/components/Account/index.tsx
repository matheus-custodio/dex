import { useEffect } from 'react';
import { useChain, useMoralis } from 'react-moralis';

function Account() {
  useEffect(() => {});
  const { authenticate, isAuthenticated, logout, account } = useMoralis();
  const { switchNetwork, chainId } = useChain();
  async function logIn() {
    if (chainId != '0x61') await switchNetwork('0x61');
    authenticate();
  }
  const isLogged = !isAuthenticated || !account;
  return (
    <div
      className="w-[170px] px-4 py-2 transition duration-300 rounded-lg cursor-pointer bg-slate-400 hover:bg-slate-600 hover:text-white justify-center flex"
      onClick={() => {
        try {
          if (isLogged) {
            logIn();
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
