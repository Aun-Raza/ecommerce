import { useEffect, useState } from 'react';
import { retrieveAllOrders } from '../../../api/order-api';
import { OrderType } from '../../../api/types/order';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const token = localStorage.getItem('token') as string;
  useEffect(() => {
    async function init() {
      const data = (await retrieveAllOrders(token)) as OrderType[];
      console.log(data);
      setOrders(data);
    }
    init();
  }, []);
  return (
    <>
      <h1>Your Orders</h1>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg my-4'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Id
              </th>
              <th scope='col' className='px-6 py-3'>
                Subtotal
              </th>
              <th scope='col' className='px-6 py-3'>
                Tax
              </th>
              <th scope='col' className='px-6 py-3'>
                Total
              </th>
              <th scope='col' className='px-6 py-3'></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
              >
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {order.id}
                </th>
                <td className='px-6 py-4'>${order.subtotal}</td>
                <td className='px-6 py-4'>${order.tax}</td>
                <td className='px-6 py-4'>${order.total}</td>
                <td className='px-6 py-4'>
                  <Link to={`/orders/${order.id}`}>
                    <button>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderList;
