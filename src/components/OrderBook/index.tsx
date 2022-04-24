import { nativeToken } from '../../../config';
import { Order, OrderBook } from '../../../type';
import OrderItem from '../OrderItem';

function OrderBook({ user, orders }: OrderBook) {
  console.log('orders ', orders);
  return (
    <div className="flex h-full text-white rounded-lg">
      <div className="grid w-full grid-rows-2 rounded-lg">
        <div className="row-span-1">
          <div className="flex justify-between px-4 py-2 text-xs font-bold rounded-t-2xl bg-slate-800">
            <p>Price{'(' + nativeToken + ')'}</p>
            <p>Amount{'(' + user?.selectedToken?.ticker! + ')'}</p>
            <p>Sum{'(' + nativeToken + ')'}</p>
          </div>
          <div className="min-h-[26vh] max-h-[27vh] overflow-auto h-fit">
            <div className="overflow-auto">
              {orders?.BUY.map((order: Order, index) => (
                <OrderItem order={order} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="row-span-1">
          <div className="flex justify-between px-4 py-2 text-xs font-bold rounded-t-md bg-slate-800">
            <p>Price{'(' + nativeToken + ')'}</p>
            <p>Amount{'(' + user?.selectedToken?.ticker! + ')'}</p>
            <p>Sum{'(' + nativeToken + ')'}</p>
          </div>
          <div className="min-h-[26vh] max-h-[27vh] overflow-auto h-fit">
            <div className="overflow-auto">
              {orders?.SELL.map((order: Order, index) => (
                <OrderItem order={order} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderBook;
