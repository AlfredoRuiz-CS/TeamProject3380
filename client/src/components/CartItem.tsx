import { productItem } from './store';

interface CartItemProps {
  product: productItem;
}

const CartItem = (props: CartItemProps) => {
  return (
    <>
      <div className="h-[10rem] bg-cardwhite"></div>
    </>
  );
};

export default CartItem;
