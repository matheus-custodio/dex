function Account() {
    const { authenticate, isAuthenticated, account, chainId, logout } =
    useMoralis();
  return (
    <div className="px-4 py-2 transition duration-300 rounded-lg cursor-pointer bg-slate-400 hover:bg-slate-600 hover:text-white" onClick={() => console.log('click')}>
      Connect
    </div>
  );
}

export default Account;
