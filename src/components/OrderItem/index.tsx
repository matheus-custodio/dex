import { Order } from '../../../type';

function OrderItem({ order }: Order | any) {
  console.log('OrderItem', order);
  const sum = order.amount * order.price;
  return (
    <div className="flex justify-between px-4 my-1">
      <p>{order.amount}</p>
      <p>{order.price}</p>
      <p>{order.amount * order.price}</p>
    </div>
  );
}

export default OrderItem;
