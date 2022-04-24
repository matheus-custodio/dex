import { Order } from '../../../type';

function OrderItem({ order }: Order | any) {
  return (
    <div className="flex justify-between px-4 my-1">
      <p>{order.price}</p>
      <p>{order.amount}</p>
      <p>{order.amount * order.price}</p>
    </div>
  );
}

export default OrderItem;
