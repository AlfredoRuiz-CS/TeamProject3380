import Header from '@/components/Header';
import Footer from '@/components/Footer';

import useUserStore from '@/components/store';
import { PaymentMethod } from '@/pages/Profile';

import { useParams } from 'react-router-dom';
// import { productItem } from '@/components/store';

interface OrderSummaryProps {
  type: 'membership' | 'order';
}

const OrderSummary = (props: OrderSummaryProps) => {
  const user = useUserStore();
  const { orderId } = useParams();
  console.log(orderId);
  const membershipCost = 10;
  const total =
    props.type === 'membership'
      ? membershipCost.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
      : user.cartItems
          .reduce(
            (acc, product, index) => acc + product.price * user.quantity[index],
            0
          )
          .toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          });

  const dummyPaymentMethods: PaymentMethod[] = Array(5).fill({
    cardId: 1,
    nameOnCard: 'John Doe',
    cardnumber: '1234 5678 9012 3456',
    expiration: '01/23',
    cvv: '123',
    cardType: 'Debit',
  });
  const selectedPaymentMethod: PaymentMethod = dummyPaymentMethods[0];
  // const { orderId } = useParams();

  return (
    <>
      <div className="mb-[5rem] flex min-h-screen flex-col gap-6 overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
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
                  user.cartItems.map((product, index) => (
                    <tr key={index}>
                      <td className="pl-5">
                        {product.name + ' x ' + user.quantity[index]}
                      </td>
                      <td className="pr-5 text-right">
                        {product.price.toLocaleString('en-US', {
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
                <td className="pr-5 text-right">{total}</td>
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
                    <p>{selectedPaymentMethod.nameOnCard}</p>
                    <p>
                      {selectedPaymentMethod.cardnumber
                        .replace(/.(?=....)/g, (match) =>
                          match === ' ' ? ' ' : '*'
                        )
                        .slice(0, selectedPaymentMethod.cardnumber.length - 4) +
                        selectedPaymentMethod.cardnumber.slice(-4)}
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
      </div>
      <Footer />
    </>
  );
};

export default OrderSummary;
