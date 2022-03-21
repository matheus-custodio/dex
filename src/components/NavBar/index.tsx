import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';
import { useMediaQuery } from 'react-responsive';
import Account from '../Account';
import Balance from '../Balance';
import menuStyles from './menuStyles';
const navigation = [
  { name: 'Trading', href: '#' },
  { name: 'Farming', href: '#' },
  { name: 'Pools', href: '#' },
];

export default function NavBar() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  //flex items-center justify-center list-none lg:w-auto lg:h-full lg:ml-20
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

  return (
    <nav className="bg-slate-800 h-14">
      {isMobile && (
        <Menu styles={menuStyles} pageWrapId={'items'} outerContainerId={'nav'}>
          {navItems}
        </Menu>
      )}
      <div className="grid items-center grid-cols-3 gap-1 px-4 py-2">
        <div className="flex justify-center col-span-1 col-start-2 " id="nav">
          {!isMobile && navItems}
        </div>
        <div className="flex justify-end col-span-1">
          <Balance />
          <Account />
        </div>
      </div>
    </nav> //relative flex items-center mx-auto mt-3 sm:h-10
  );
}
