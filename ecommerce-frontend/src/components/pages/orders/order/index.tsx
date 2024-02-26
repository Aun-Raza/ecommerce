import { useEffect, useState } from 'react';
import { OrderType } from '../../../../api/types/order';
import { retrieveOrder } from '../../../../api/order-api';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Button, Image } from '@nextui-org/react';

const OrderDetail = () => {
  const [order, setOrder] = useState<OrderType | null>(null);
  const token = localStorage.getItem('token') as string;
  const { id: paramId } = useParams<{ id: string }>();
  const history = useHistory();

  useEffect(() => {
    async function init() {
      const data = (await retrieveOrder(paramId, token)) as OrderType | null;
      if (data === null) {
        history.push('/');
      } else {
        setOrder(data);
      }
    }
    init();
  }, [paramId, token, history]);

  return (
    <section>
      <h2 className='mb-4'>Order #{order?.id}</h2>
      {order &&
        order.products.map((productItem) => (
          <div
            className='p-2 flex gap-2 [&:not(:first-of-type)]:border-t-1'
            key={productItem.id} // Changed to productItem.id for uniqueness
          >
            <div>
              <Image
                className='w-36 h-36 object-contain'
                src={productItem.product.imageUrl}
                alt={'image of ' + productItem.product.name}
              />
            </div>
            <div className='mt-5 flex flex-col gap-1'>
              <p>{productItem.product.name}</p>
              <span className='block text-sm'>
                ${productItem.product.price}/each
              </span>
              <span className='block text-sm'>
                Quantity: {productItem.quantity}
              </span>
              <span className='block text-sm'>Total: ${productItem.price}</span>
            </div>
          </div>
        ))}
      {order && (
        <div className='px-3 flex flex-col gap-2 text-xl border shadow-lg py-5 rounded-lg'>
          <div className='flex'>
            <p className='w-48 font-bold'>
              Subtotal <span className='text-lg font-normal'>(4 items)</span>
            </p>
            <p>${order.subtotal.toFixed(2)}</p>
          </div>
          <div className='flex'>
            <p className='w-48 font-bold'>Discount</p>
            <p>-${(order.subtotal / 2).toFixed(2)}</p>
          </div>
          <div className='flex'>
            <p className='w-48 font-bold'>
              Taxes <span className='text-lg font-normal'>(13%)</span>
            </p>
            <p>${order.tax.toFixed(2)}</p>
          </div>
          <div className='flex'>
            <p className='w-48 font-bold'>Total</p>
            <p>${order.total.toFixed(2)}</p>
          </div>
        </div>
      )}
      <Button color='primary' className='mt-4'>
        <Link to='/orders'>Return to Order History</Link>
      </Button>
    </section>
  );
};

export default OrderDetail;
