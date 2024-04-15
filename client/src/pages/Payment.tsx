import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import PaymentMethodCard from '@/components/PaymentMethodCard';
import toast from 'react-hot-toast';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
// import { productItem } from '@/components/store';
import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import useUserStore from '@/components/store';
import { PaymentMethod } from '@/pages/Profile';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface paymentProps {
  type: 'cart' | 'membership';
}

const payment = (props: paymentProps) => {
  const store = useUserStore();
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [paymentMethodSelected, setPaymentMethodSelected] =
    useState<PaymentMethod | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usingExistingPaymentMethod, setUsingExistingPaymentMethod] = useState(false);
  const navigate = useNavigate();

  const subtotal = store.cartItems.reduce(
    (acc, product, index) => acc + product.price * store.quantity[index],
    0
  );
  const shipping = 10;

  function paymentMethodSelectedToast(p: PaymentMethod) {
    toast.success(
      'Payment method ending in ' + p.cardnumber.slice(-4) + ' selected.',
      {
        position: 'bottom-right',
        className: 'font-bold text-black',
      }
    );
  }

  function handleSelectPaymentMethod(p: PaymentMethod) {
    setPaymentMethodSelected(p);
    setUsingExistingPaymentMethod(true);
    paymentMethodSelectedToast(p);
    console.log('Selected Payment Method');
  }

  function handleDeletePaymentMethod() {
    console.log('Deleted Payment Method');
  }
  console.log('Rendered Payment Page', props.type);

  const handlePaymentInputChange = () => {
    setUsingExistingPaymentMethod(false); 
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!paymentMethodSelected) {
      console.error("No payment method selected");
      return;
    }

    let paymentMethod;

    if (usingExistingPaymentMethod && paymentMethodSelected) {
      paymentMethod = `${paymentMethodSelected?.cardnumber} ${paymentMethodSelected?.cardtype}`;
    } else {
      const formData = new FormData(event.currentTarget);
      const cardNumber = formData.get('cardNumber');
      const cardtype = formData.get('cardType');
      paymentMethod = `${cardNumber} ${cardtype}`;
    }

    if (props.type === 'cart') {
      const cartOrderDetails = {
        items: store.cartItems.map((item, index) => ({
          productID: item.productId,
          productName: item.name,
          productQuantity: store.quantity[index],
          productPrice: item.price,
        })),
        paymentMethod: paymentMethod,
      };

      console.log(cartOrderDetails);

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post("https://shastamart-api-deploy.vercel.app/api/orders/processOrder", cartOrderDetails, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        navigate("/orders/summary");
      } catch (error) {
        console.log(error);
      }

    } else if (props.type === 'membership') {
      const data = {
        email: store.email,
      };
      console.log(data);
    }
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://shastamart-api-deploy.vercel.app/api/users/payments',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        const paymentData = await response.data;
        const transformedPayments = paymentData.map(
          (paymentMethod: PaymentMethod) => ({
            nameOnCard: paymentMethod.nameOnCard,
            cardnumber: paymentMethod.cardnumber,
            expiration: paymentMethod.expiration,
            cvv: paymentMethod.cvv,
          })
        );
        console.log(transformedPayments);
        setPaymentMethods(transformedPayments);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPayments();
  }, [setPaymentMethods]);

  useEffect(() => {
    if (store.accountType === 'customer' && !store.isAdmin) {
      if (paymentMethods.length > 0) {
        setPaymentMethodSelected(paymentMethods[0]);
        return;
      }
    }
  }, [paymentMethods, setPaymentMethods, isLoading]);

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
            <section className="mt-6 flex h-auto w-[40rem] flex-col justify-between place-self-center rounded-2xl bg-cardwhite">
              <div className="">
                <h3 className="ml-5 mt-3 text-2xl font-medium">
                  Order Summary
                </h3>
                {/* Item Table */}
                <table className="mb-5 mt-2 w-full">
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
                    <tr>
                      <td className="pl-5">
                        Shipping
                      </td>
                      <td className="pr-5 text-right">
                        {!store.isMember && subtotal > 0
                          ? shipping.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            })
                          : store.isMember && subtotal > 0 
                          ? "$0.00" 
                          : '--'}
                      </td>
                      </tr>
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
            <section className="mb-[20rem] mt-6 flex h-auto w-[40rem] flex-col items-center place-self-center rounded-2xl bg-cardwhite py-6">
              <h3 className="mt-5 flex flex-row justify-center text-2xl font-medium">
                Select A Previous Payment Method
              </h3>
              {/* Payment Method Component Map */}
              <div className="flex flex-col pt-5">
                <Collapsible
                  className="flex w-72 flex-grow flex-col gap-2 place-self-center"
                  open={collapsibleOpen}
                  onOpenChange={setCollapsibleOpen}>
                  {!isLoading ? (
                    paymentMethods.length > 0 ? (
                      <div className="flex w-auto flex-grow items-center justify-between space-x-4 rounded-lg bg-slate-300 px-4 text-black">
                        <h4 className="flex w-auto flex-grow text-center text-sm font-semibold">
                          {'Card Name: ' +
                            paymentMethodSelected?.nameOnCard +
                            '\nLast 4 digits: ' +
                            paymentMethodSelected?.cardnumber.slice(-4)}
                        </h4>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-white/50">
                            <CaretSortIcon className="h-6 w-6" />
                            <span className="sr-only">Toggle</span>
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    ) : (
                      <div className="flex w-auto items-center justify-between space-x-4 rounded-lg bg-cardwhite px-4 text-black">
                        {' '}
                        No Previous Payment Methods
                      </div>
                    )
                  ) : (
                    <div className="mx-auto flex w-auto items-center justify-between space-x-4 rounded-lg bg-cardwhite px-4 text-black">
                      Loading payment methods...
                    </div>
                  )}
                  {paymentMethods.map((paymentMethod, index) => (
                    <CollapsibleContent key={index} className="">
                      <PaymentMethodCard
                        key={index}
                        cardId={index + 1}
                        passedPaymentMethod={paymentMethod}
                        variant="payment"
                        onDelete={handleDeletePaymentMethod}
                        onSelect={handleSelectPaymentMethod}
                      />
                    </CollapsibleContent>
                  ))}
                </Collapsible>
              </div>

              <h3 className="mt-5 flex flex-row justify-center text-2xl font-medium">
                New Payment Details
              </h3>

              {/* Name Fields */}
              <div className="flex flex-col items-center ">
                <form
                  className="flex w-full flex-col gap-0 pt-5"
                  onSubmit={handleSubmit}>
                  <div className="self-center">
                    <h3 className=" pl-5 text-lg font-semibold text-darkblue">
                      Card Number
                    </h3>
                    <input
                      className="mx-4 h-10 w-[30rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                      type="text"
                      placeholder="e.g. 1234 5678 9012 3456"
                      name="cardNumber"
                      onChange={handlePaymentInputChange}
                    />
                    <h3 className="pl-5 pt-2 text-lg font-semibold text-darkblue">
                      Name on Card
                    </h3>
                    <input
                      className="mx-4 h-10 w-[30rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                      type="text"
                      placeholder="e.g. John Doe"
                      name="cardName"
                      onChange={handlePaymentInputChange}
                    />
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
                        onChange={handlePaymentInputChange}
                      />
                    </div>
                    <div className="">
                      <h3 className="pl-2 pt-2 text-left text-lg font-semibold text-darkblue">
                        CVV
                      </h3>
                      <input
                        className="ml-2 h-10 w-[12.5rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                        type="text"
                        placeholder="CVV"
                        name="cvv"
                        onChange={handlePaymentInputChange}
                      />
                    </div>
                  </div>
                  <Button
                    className="ml-4 mr-4 mt-5 self-center bg-blue-400 px-44 py-6 hover:bg-slate-600"
                    size="lg"
                    type="submit">
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
                <form
                  className="flex w-full flex-col gap-0 pt-5"
                  onSubmit={handleSubmit}>
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
                      name="cardName"></input>
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
                        name="expirationDate"></input>
                    </div>
                    <div className="">
                      <h3 className="pl-2 pt-2 text-left text-lg font-semibold text-darkblue">
                        CVC
                      </h3>
                      <input
                        className="ml-2 h-10 w-[12.5rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                        type="text"
                        placeholder="CVC"
                        name="cvc"></input>
                    </div>
                  </div>
                  <Button
                    className="ml-4 mr-4 mt-5 self-center bg-slate-500 px-44 py-6 hover:bg-slate-600"
                    size="lg"
                    type="submit">
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
