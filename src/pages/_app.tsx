import type { AppProps } from 'next/app';
import Header from '../components/Header';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className='grid grid-cols-12 xl:h-[85vh] gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48"'>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
