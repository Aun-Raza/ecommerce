import { useEffect, useState } from 'react';
import { OrderType } from '../../../../api/types/order';
import { retrieveOrder } from '../../../../api/order-api';
import { useParams, useHistory } from 'react-router-dom';

const OrderDetail = () => {
  const [order, setOrder] = useState<OrderType>();
  const token = localStorage.getItem('token') as string;
  const { id: paramId } = useParams<{ id: string }>();
  const history = useHistory();

  useEffect(() => {
    async function init() {
      const data = (await retrieveOrder(paramId, token)) as OrderType;
      if (data === null) {
        history.push('/');
      }
      setOrder(data);
    }
    init();
  }, []);
  return (
    <>
      <h1>Order {order?.id}</h1>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg my-4'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Id
              </th>
              <th scope='col' className='px-6 py-3'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Quantity
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {order?.products.map((productItem) => (
              <tr
                key={productItem.id}
                className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
              >
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {productItem.id}
                </th>
                <td className='px-6 py-4'>{productItem.product.name}</td>
                <td className='px-6 py-4'>{productItem.quantity}</td>
                <td className='px-6 py-4'>${productItem.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderDetail;
