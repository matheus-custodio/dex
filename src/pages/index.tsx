import Graph from '../components/Graph';
import History from '../components/History';
import NavBar from '../components/NavBar';
import OrderBook from '../components/OrderBook';
import Orders from '../components/Orders';

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-600">
      <NavBar />
      <div className="grid h-screen grid-cols-12 gap-6 px-5 pb-5 my-2 lg:mb-0 md:mb-16">
        <div className="col-span-12 p-4 text-base text-center lg:col-span-6 md:col-span-8 rounded-2xl bg-slate-400">
          <Graph />
        </div>
        <div className="col-span-12 p-4 text-base text-center lg:col-span-3 md:col-span-4 rounded-2xl bg-slate-400">
          <OrderBook />
        </div>
        <div className="h-auto col-span-12 p-4 text-base text-center lg:col-span-3 rounded-2xl bg-slate-400 md:col-span-8">
          <Orders />
        </div>
        <div className="col-span-12 p-4 text-base text-center rounded-2xl bg-slate-400">
          <History />
        </div>
      </div>
    </div>
  );
}

export default HomePage;