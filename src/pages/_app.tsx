import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';
import NavBar from '../components/NavBar';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID ?? 'AppId Undefined'}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL ?? 'ServerUrl Undefined'}
      >
        <div className="h-screen overflow-auto bg-slate-600">
          <NavBar />
          <Component {...pageProps} />
        </div>
      </MoralisProvider>
    </ChakraProvider>
  );
}

export default MyApp;
