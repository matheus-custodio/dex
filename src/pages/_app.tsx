import type { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';
import NavBar from '../components/NavBar';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID ?? 'AppId Undefined'}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL ?? 'ServerUrl Undefined'}
    >
      <div className="min-h-screen bg-slate-600">
        <NavBar />
        <Component {...pageProps} />
      </div>
    </MoralisProvider>
  );
}

export default MyApp;
