import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { FaTrashCan } from 'react-icons/fa6';

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

import useUserStore from '@/components/store';
import { Link } from 'react-router-dom';

const Cart = () => {
  const store = useUserStore();
  const shipping = 10;

  const subtotal = store.cartItems.reduce(
    (acc, product, index) => acc + product.price * store.quantity[index],
    0
  );

  // ! REPLACE POPULAR ITEMS WITH USER LIST

  // const popularItem1 = dummyProducts.reduce((lowest, product) => {
  //   return lowest.supplierStock < product.supplierStock ? lowest : product;
  // }, dummyProducts[0]);
  // const updatedProducts = dummyProducts.filter(
  //   (product) => product !== popularItem1
  // );
  // const popularItem2 = updatedProducts.reduce((lowest, product) => {
  //   return lowest.supplierStock < product.supplierStock ? lowest : product;
  // }, dummyProducts[0]);

  function emptyCart() {
    store.resetCart();
    toast.success('Cart has been emptied!', {
      position: 'bottom-right',
      className: 'font-bold text-black',
      duration: 2000,
    });
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
              {/* Alert to confirm cart deletion */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border border-darkblue bg-transparent text-darkblue hover:bg-darkblue hover:text-bgwhite">
                    <FaTrashCan className="mr-2 h-4 w-4" />
                    Empty Cart
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will clear every item in your cart.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={emptyCart}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            {/* Item Card Section */}
            <div className="">
              <ul className="flex flex-col gap-2">
                {store.cartItems.map((product, index) => (
                  <li key={index} className="">
                    <CartItem
                      key={index}
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
                        {subtotal > 0
                          ? subtotal.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            })
                          : '--'}
                      </td>
                    </tr>
                    <tr className="border-b-2 border-darkblue">
                      <td className="py-3 text-left text-2xl">
                        Estimated Shipping
                      </td>
                      <td className="pr-2 text-right text-xl">
                        {subtotal > 0
                          ? shipping.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            })
                          : '--'}
                      </td>
                    </tr>

                    <tr className="">
                      <td className="pb-3 pt-5 text-left text-2xl">
                        Estimated Total
                      </td>
                      <td className="pr-2 text-right text-xl">
                        {subtotal > 0
                          ? (subtotal + shipping).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            })
                          : '--'}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {store.cartItemsNumber > 0 ? (
                  <Button className="mt-10 h-[3rem] w-[12rem] self-center border-darkblue text-white hover:bg-darkblue hover:text-bgwhite">
                    <Link to="/payment">Proceed to Checkout</Link>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    disabled
                    className="mt-10 h-[3rem] w-[12rem] self-center border-darkblue bg-gray-600 text-white hover:bg-gray-600 hover:text-white">
                    Proceed to Checkout
                  </Button>
                )}
              </div>
            </div>
            {/* My List Section */}
            <div className="mb-10 mt-10 h-[20rem] w-[30rem] rounded-lg bg-cardwhite">
              <p className="pt-5 text-center text-3xl text-darkblue">My List</p>
              <div className="flex flex-row gap-5 pl-12">
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-5">
                    <ul className="disc-none">
                      {store.List.map((product, index) => (
                        <li key={index}>
                          <div className="flex flex-row gap-5">
                            <div className="h-[5rem] w-[5rem] overflow-hidden rounded-[10px]">
                              <img
                                className="h-full w-full object-contain"
                                src={`../${product.image.replace(/\.(jpg|jpeg)$/, '.png')}`}></img>
                            </div>
                            <div className="flex flex-col">
                              <h1 className="flex flex-row self-center pt-5 text-3xl">
                                {product.name}
                              </h1>
                              {product.price.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                              }) +
                                ' per ' +
                                product.portion}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
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
