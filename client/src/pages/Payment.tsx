import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Button } from '@/components/ui/button';
// import { productItem } from '@/components/store';
import useUserStore from '@/components/store';
// import React from 'react';

interface paymentProps {
  type: 'cart' | 'membership';
}

const payment = (props: paymentProps) => {
  const store = useUserStore();
  console.log('Rendered Payment Page', props.type);

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
        <Header />
        {props.type === 'cart' ? (
          // Cart Payment Page Variant
          <>
            <h1 className="pt-16 text-center text-3xl font-medium text-white">
              Payment Summary
            </h1>
            <section className="mt-6 flex h-[40rem] w-[40rem] flex-col justify-between place-self-center rounded-2xl bg-cardwhite">
              <div className="">
                <h3 className="ml-5 mt-3 text-2xl font-medium">
                  Order Summary
                </h3>
                {/* Item Table */}
                <table className="mt-2 w-full">
                  <thead>
                    <tr>
                      <th className="pl-5 text-left">Item</th>
                      <th className=" pr-5 text-right">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {store.cartItems.map((product, index) => (
                      <tr key={index}>
                        <td className="pl-5">
                          {product.name + ' x ' + store.quantity[index]}
                        </td>
                        <td className="pr-5 text-right">
                          {product.price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </td>
                      </tr>
                    ))}
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
                      {store.cartItems
                        .reduce(
                          (acc, product, index) =>
                            acc + product.price * store.quantity[index],
                          0
                        )
                        .toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section className="mt-6 h-[30rem] w-[40rem] place-self-center rounded-2xl bg-cardwhite">
              <h3 className="ml-5 mt-5 text-2xl font-medium">
                Payment Details
              </h3>

              {/* Name Fields */}
              <div className="flex flex-col items-center ">
                <form className="flex w-full flex-col gap-0 pt-5">
                  <div className="self-center">
                    <h3 className=" pl-5 text-lg font-semibold text-darkblue">
                      Card Number
                    </h3>
                    <input
                      className="mx-4 h-10 w-[30rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                      type="text"
                      placeholder="e.g. 1234 5678 9012 3456"
                      name="cardNumber"
                    />
                    <h3 className="pl-5 pt-2 text-lg font-semibold text-darkblue">
                      Name on Card
                    </h3>
                    <input
                      className="mx-4 h-10 w-[30rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                      type="text"
                      placeholder="e.g. John Doe"
                      name="cardName"
                    ></input>
                  </div>
                  <div className="flex w-[30rem] flex-row gap-0 self-center">
                    <div>
                      <h3 className="pl-5 pt-2 text-lg font-semibold text-darkblue">
                        Expiration Date
                      </h3>
                      <input
                        className="ml-4 h-10 w-[15rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                        type="text"
                        placeholder="MM/YY"
                        name="expirationDate"
                      ></input>
                    </div>
                    <div className="">
                      <h3 className="pl-2 pt-2 text-left text-lg font-semibold text-darkblue">
                        CVC
                      </h3>
                      <input
                        className="ml-2 h-10 w-[12.5rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                        type="text"
                        placeholder="CVC"
                        name="cvc"
                      ></input>
                    </div>
                  </div>
                  <Button
                    className="ml-4 mr-4 mt-5 self-center bg-slate-500 px-44 py-6 hover:bg-slate-600"
                    size="lg"
                    type="submit"
                  >
                    Place Order
                  </Button>
                </form>
              </div>
            </section>
          </>
        ) : (
          // Membership Payment Page Variant
          <>
            <h1 className="pt-16 text-center text-3xl font-medium text-white">
              Subscription Summary
            </h1>
            <section className="mt-6 flex h-[40rem] w-[40rem] flex-col justify-between place-self-center rounded-2xl bg-cardwhite">
              <div className="">
                <h3 className="ml-5 mt-3 text-2xl font-medium">
                  Order Summary
                </h3>
                {/* Item Table */}
                <div className="flex flex-row justify-between pt-[30rem]">
                  <p className="w-5 pl-5">Membership Subscription</p>
                  <p className="pr-5">$10.00 per month</p>
                </div>
              </div>
              <table>
                <tbody>
                  <tr className="border-t-2 border-darkblue">
                    <td>
                      <h3 className="pb-5 pl-5 pt-2 text-left text-xl font-bold">
                        Total
                      </h3>
                    </td>
                    <td className="pr-5 text-right text-xl font-bold">
                      {'$10.00'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section className="mt-6 h-[30rem] w-[40rem] place-self-center rounded-2xl bg-cardwhite">
              <h3 className="ml-5 mt-5 text-2xl font-medium">
                Payment Details
              </h3>

              {/* Name Fields */}
              <div className="flex flex-col items-center ">
                <form className="flex w-full flex-col gap-0 pt-5">
                  <div className="self-center">
                    <h3 className=" pl-5 text-lg font-semibold text-darkblue">
                      Card Number
                    </h3>
                    <input
                      className="mx-4 h-10 w-[30rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                      type="text"
                      placeholder="e.g. 1234 5678 9012 3456"
                      name="cardNumber"
                    />
                    <h3 className="pl-5 pt-2 text-lg font-semibold text-darkblue">
                      Name on Card
                    </h3>
                    <input
                      className="mx-4 h-10 w-[30rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                      type="text"
                      placeholder="e.g. John Doe"
                      name="cardName"
                    ></input>
                  </div>
                  <div className="flex w-[30rem] flex-row gap-0 self-center">
                    <div>
                      <h3 className="pl-5 pt-2 text-lg font-semibold text-darkblue">
                        Expiration Date
                      </h3>
                      <input
                        className="ml-4 h-10 w-[15rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                        type="text"
                        placeholder="MM/YY"
                        name="expirationDate"
                      ></input>
                    </div>
                    <div className="">
                      <h3 className="pl-2 pt-2 text-left text-lg font-semibold text-darkblue">
                        CVC
                      </h3>
                      <input
                        className="ml-2 h-10 w-[12.5rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                        type="text"
                        placeholder="CVC"
                        name="cvc"
                      ></input>
                    </div>
                  </div>
                  <Button
                    className="ml-4 mr-4 mt-5 self-center bg-slate-500 px-44 py-6 hover:bg-slate-600"
                    size="lg"
                    type="submit"
                  >
                    Place Order
                  </Button>
                </form>
              </div>
            </section>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default payment;
