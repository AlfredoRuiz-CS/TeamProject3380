import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { FaTrashCan } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { productItem } from '@/components/store';
import { dummyProducts } from './Products';

const Cart = () => {
  const tax = 0.0825;
  function handleCheckout() {}

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
        <Header />

        <div className="flex flex-row justify-around">
          {/* Review Cart Section */}
          <section className="flex w-[50%] flex-col pl-[5rem] pt-[6rem]">
            <div className="flex flex-row justify-between pb-4">
              <h1 className="pl-4 text-3xl text-white ">Review Cart</h1>
              <Button
                variant="outline"
                className="border border-darkblue bg-transparent text-darkblue hover:bg-darkblue hover:text-bgwhite"
              >
                <FaTrashCan className="mr-2 h-4 w-4" />
                Empty Cart
              </Button>
            </div>
            {/* CARD COMPONENT HERE * NUMBER OF ITEMS IN CART */}
            <div className="">
              <ul className="flex flex-col gap-2">
                {dummyProducts.map((product: productItem, index: number) => (
                  <li key={index} className="">
                    <CartItem product={product} />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Order Summary Section */}
          <section className="flex w-2/5 flex-col items-center pt-[3rem]">
            <div className="flex flex-col">
              <h1 className="text-3xl text-white">Order Summary</h1>
              <div className="flex h-[20rem] w-[30rem] flex-grow flex-col rounded-lg bg-cardwhite px-2">
                {/* Order Summary Information Table */}
                <table>
                  <tbody className="">
                    <tr className="">
                      <td className="py-3 text-left text-2xl">Subtotal</td>
                      <td className="pr-2 text-right text-xl">
                        {dummyProducts[0].price.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </td>
                    </tr>
                    <tr className="border-b-2 border-darkblue">
                      <td className="pb-3 text-left text-2xl">Estimated Tax</td>
                      <td className="pr-2 text-right text-xl">
                        {(tax * dummyProducts[0].price).toLocaleString(
                          'en-US',
                          {
                            style: 'currency',
                            currency: 'USD',
                          }
                        )}
                      </td>
                    </tr>
                    <tr className="">
                      <td className="pb-3 pt-5 text-left text-2xl">
                        Estimated Total
                      </td>
                      <td className="pr-2 text-right text-xl">
                        {(
                          dummyProducts[0].price +
                          tax * dummyProducts[0].price
                        ).toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <Button
                  className="mt-10 h-[3rem] w-[12rem] self-center border-darkblue text-white hover:bg-darkblue hover:text-bgwhite"
                  onClick={handleCheckout}
                >
                  <Link to="/payment">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
            {/* My List Section */}
            <div className=""></div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
