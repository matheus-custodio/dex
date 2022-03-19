import { useMoralis } from 'react-moralis';

function Account() {
  const { authenticate, isAuthenticated, logout } = useMoralis();

  if (!isAuthenticated) {
    return (
      <div
        className="px-4 py-2 transition duration-300 rounded-lg cursor-pointer bg-slate-400 hover:bg-slate-600 hover:text-white"
        onClick={authenticate}
      >
        Connect
      </div>
    );
  }
  return (
    <div
      className="px-4 py-2 transition duration-300 rounded-lg cursor-pointer bg-slate-400 hover:bg-slate-600 hover:text-white"
      onClick={logout}
    >
      Disconnect
    </div>
  );
}

export default Account;
