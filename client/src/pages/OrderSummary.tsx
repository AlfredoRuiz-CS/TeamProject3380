import Header from '@/components/Header';
import Footer from '@/components/Footer';

import useUserStore from '@/components/store';
// import { PaymentMethod } from '@/pages/Profile';
// import { productItem } from '@/components/store';
import { useParams } from 'react-router-dom';
// import { useState } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
// import { productItem } from '@/components/store';

interface OrderSummaryProps {
  type: 'membership' | 'order';
}

type orderData = {
  productID?: string;
  productName?: string;
  quantity?: number;
  unitPrice?: number;
  totalAmount?: number;
  total?: number;
  paymentMethod?: string;
  nameOnCard?: string;
}

const OrderSummary = (props: OrderSummaryProps) => {
  const user = useUserStore();
  const [orderDetails, setOrderDetails] = useState<orderData[]>([{ productName: '', quantity: 0, nameOnCard: '', paymentMethod: '' }]);
  const { orderID } = useParams();
  console.log(orderID);
  const membershipCost = 10;
  const total = props.type === 'membership'
    ? membershipCost.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    }) : orderDetails[0].total?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    })

  // const { orderId } = useParams();
  function loyaltyMembershipNotification() {
    toast.success('Congratulations! You have been awarded three free months of membership for your purchase!', {
      position: 'bottom-right',
      className: 'font-bold text-black',
      duration: 4000,
    });
  }

  useEffect(() => {
    const fetchOrder = async () => {
      const data = {
        orderID: orderID,
      }
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post("https://shastamart-api-deploy.vercel.app/api/orders/orderDetail", data, { 
          headers: { Authorization: `Bearer ${token}` } })
        console.log(response.data);
        let orderData = await response.data;
        orderData.res[0].paymentMethod = orderData.res[0].paymentMethod.slice(0, 19);
        setOrderDetails(orderData.res);
        console.log(orderDetails);
        if (orderData.membershipStatus === "From Order"){
          user.setUserDetails({isMember: true});
          loyaltyMembershipNotification();
        }
        user.resetCart();
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrder();
  }, [])

  return (
    <>
      <div className="flex min-h-screen flex-col gap-6 overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
        <Header />
        {/* Order Summary/ Receipt Section */}
        <section className="flex h-auto w-[40rem] flex-col justify-between place-self-center rounded-2xl bg-cardwhite">
          <div className="">
            <h3 className="ml-5 mt-3 text-2xl font-medium">Order Summary</h3>
            {/* Item Table */}

            <table className="mb-5 mt-2 w-full">
              <thead>
                <tr>
                  <th className="pl-5 text-left">Item</th>
                  <th className=" pr-5 text-right">Cost</th>
                </tr>
              </thead>
              <tbody>
                {props.type === 'membership' ? (
                  <tr>
                    <td className="pl-5">{'Membership x 1'}</td>
                    <td className="pr-5 text-right">
                      {(10).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </td>
                  </tr>
                ) : (
                  orderDetails.map((product, index) => (
                    <tr key={index}>
                      <td className="pl-5">
                        {product.productName + ' x ' + product.quantity}
                      </td>
                      <td className="pr-5 text-right">
                        {product.totalAmount?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <table>
            <tbody>
              <tr className="border-t-2 border-darkblue">
                <td>
                  <h3 className="pb-5 pl-5 pt-2 text-left text-xl font-bold">
                    Total
                  </h3>
                </td>
                <td className="pr-5 text-right">
                  {total}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Payment Information Section */}
        <section className="mt-6 flex h-auto w-[40rem] flex-col justify-between place-self-center rounded-2xl bg-cardwhite">
          <div className="">
            <h3 className="ml-5 mt-3 text-2xl font-medium">
              Payment Information
            </h3>
            <table className="mb-5 mt-2 w-full">
              <thead>
                <tr>
                  <th className="pl-5 text-left">Card Used</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="pl-5">
                    <p>{orderDetails[0]?.nameOnCard}</p>
                    <p>
                    {orderDetails[0]?.paymentMethod &&
                      orderDetails[0].paymentMethod
                      .replace(/.(?=....)/g, match => (match === ' ' ? ' ' : '*'))
                      .slice(0, -4) +
                      orderDetails[0].paymentMethod.slice(-4)}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Shipping Information Section */}
        {props.type === 'order' && (
          <section className="mt-6 flex h-auto w-[40rem] flex-col justify-between place-self-center rounded-2xl bg-cardwhite">
            <div className="">
              <h3 className="ml-5 mt-3 text-2xl font-medium">
                Shipping Information
              </h3>
              <table className="mb-5 mt-2 w-full">
                <thead>
                  <tr>
                    <th className="pl-5 text-left">Shipping Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pl-5">
                      <p>{user.address.street}</p>
                      <p>{user.address.city + ', ' + user.address.state}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
        <Footer />
      </div>
    </>
  );
};

export default OrderSummary;
