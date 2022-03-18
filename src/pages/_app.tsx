import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-slate-600">
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
