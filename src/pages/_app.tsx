import type { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID ?? 'AppId Undefined'}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL ?? 'ServerUrl Undefined'}
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
