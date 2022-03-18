import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';
import { useMediaQuery } from 'react-responsive';
import styles from './menuStyles';

const navigation = [
  { name: 'Trading', href: '#' },
  { name: 'Farming', href: '#' },
  { name: 'Pools', href: '#' },
];

export default function NavBar() {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const navItems = (
    <ul className="flex items-center justify-center w-full h-auto list-none lg:w-auto lg:h-full lg:ml-20">
      {navigation.map((item) => (
        <li
          key={item.name}
          className="mr-8
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
    hover:text-gray-200
    box-content"
        >
          <Link href={item.href}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative h-16 px-4 overflow-hidden sm:px-6 lg:px-8 bg-slate-800 shadow-white">
      <nav
        className="relative flex items-center justify-between sm:h-10 lg:justify-start"
        aria-label="Global"
      >
        <div className="flex items-center content-center self-center justify-center w-full h-20 pt-4">
          {isMobile && (
            <Menu right styles={styles}>
              {navItems}
            </Menu>
          )}
          {!isMobile && navItems}
        </div>
      </nav>
    </div>
  );
}
