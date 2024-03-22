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
import useUserStore from '@/components/store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Cart = () => {
  const store = useUserStore();
  const navigate = useNavigate();
  const shipping = 10;

  const [quantity, setQuantity] = useState(1);

  // ! REPLACE POPULAR ITEMS WITH USER LIST

  const popularItem1 = dummyProducts.reduce((lowest, product) => {
    return lowest.supplierStock < product.supplierStock ? lowest : product;
  }, dummyProducts[0]);
  const updatedProducts = dummyProducts.filter(
    (product) => product !== popularItem1
  );
  const popularItem2 = updatedProducts.reduce((lowest, product) => {
    return lowest.supplierStock < product.supplierStock ? lowest : product;
  }, dummyProducts[0]);

  function handleCheckout() {
    navigate('/payment:cart');
  }

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
                {store.cartItems.map((product, index) => (
                  <li key={index} className="">
                    <CartItem
                      product={product}
                      quantity={store.quantity[index]}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Order Summary Section */}
          <section className="flex w-2/5 flex-col items-center pt-[6rem]">
            <div className="flex flex-col">
              <h1 className="pb-4 text-3xl text-white">Order Summary</h1>
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
                      <td className="py-3 text-left text-2xl">
                        Estimated Shipping
                      </td>
                      <td className="pr-2 text-right text-xl">
                        {shipping.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </td>
                    </tr>

                    <tr className="">
                      <td className="pb-3 pt-5 text-left text-2xl">
                        Estimated Total
                      </td>
                      <td className="pr-2 text-right text-xl">
                        {(dummyProducts[0].price + shipping).toLocaleString(
                          'en-US',
                          {
                            style: 'currency',
                            currency: 'USD',
                          }
                        )}
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
            <div className="mt-10 h-[20rem] w-[30rem] rounded-lg bg-cardwhite ">
              <p className="pt-5 text-center text-3xl text-darkblue">My List</p>
              <div className="flex flex-row gap-5 pl-12">
                <div className="flex flex-col gap-10">
                  <div className="flex flex-row gap-5">
                    <div>
                      <img
                        className=" h-[5rem] w-[5rem] rounded-lg object-cover"
                        src={popularItem1.image}
                      ></img>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="flex flex-row self-center pt-5 text-3xl">
                        {popularItem1.name}
                      </h1>
                      {popularItem1.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }) +
                        ' per ' +
                        popularItem1.portion}
                    </div>
                  </div>
                  <div className="flex flex-row gap-5">
                    <div>
                      <img
                        className=" h-[5rem] w-[5rem] rounded-lg object-cover"
                        src={popularItem1.image}
                      ></img>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="flex flex-row self-center pt-5 text-3xl">
                        {popularItem1.name}
                      </h1>
                      {popularItem1.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }) +
                        ' per ' +
                        popularItem1.portion}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
