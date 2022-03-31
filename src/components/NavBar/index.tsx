import Link from 'next/link';
import { useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useChain, useMoralis } from 'react-moralis';
import { useMediaQuery } from 'react-responsive';
import Account from '../Account';
import menuStyles from './menuStyles';
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Trading', href: '/trading' },
  { name: 'Farming', href: '#' },
  { name: 'Pools', href: '#' },
  { name: 'Balances', href: '/balances' },
];
export default function NavBar() {
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    logout,
    authenticate,
  } = useMoralis();
  const { switchNetwork, chainId } = useChain();

  useEffect(() => {
    if (!isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
  }, [isWeb3Enabled]);

  useEffect(() => {
    if (isWeb3Enabled && isWeb3EnableLoading && chainId != '0x61') {
      switchNetwork('0x61');
    }
  }, [isWeb3Enabled, chainId]);

  useEffect(() => {
    if (chainId != '0x61' && isAuthenticated) {
      logout();
    }
    if (chainId === '0x61' && !isAuthenticated) {
      authenticate();
    }
  }, [chainId]);

  const navItems = (
    <>
      <ul className="list-none md:flex lg:w-auto lg:h-full lg:ml-20" id="items">
        {navigation.map((item) => (
          <li
            key={item.name}
            className=" mr-8
                        flex
                        items-center
                        justify-center
                        min-h-full
                        text-white
                        cursor-pointer
                        font-medium
                        text-lg
                        lg:text-base
                        transition-colors
                        transition-duration[300ms]
                        hover:text-gray-500
                        box-content"
          >
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );

  const isMobile = useMediaQuery({ maxWidth: 1024 });
  return (
    <div className="w-full border-b-2 border-slate-900 bg-slate-800">
      <div className="grid grid-cols-3 gap-1">
        <div className="flex items-center justify-start col-span-1 p-3 lg:justify-center lg:col-start-2">
          {!isMobile ? (
            <>{navItems}</>
          ) : (
            <Menu
              styles={menuStyles}
              pageWrapId={'items'}
              outerContainerId={'nav'}
            >
              {navItems}
            </Menu>
          )}
        </div>

        <div className="flex justify-end col-span-1 col-start-3 p-3">
          <Account />
        </div>
      </div>
    </div>
  );
}
