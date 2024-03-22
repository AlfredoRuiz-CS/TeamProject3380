import { productItem } from './store';
import { FaTrashCan } from 'react-icons/fa6';
import useUserStore from './store';

interface CartItemProps {
  product: productItem;
}

const CartItem = (props: CartItemProps) => {
  const store = useUserStore();

  function handleRemoveItem(e: React.MouseEvent, product: productItem) {
    store.removeFromCart(product);
  }

  return (
    <>
      <div className="flex h-[8rem] flex-row items-center rounded-lg bg-cardwhite">
        <button onClick={(e) => handleRemoveItem(e, props.product)}>
          <FaTrashCan className="ml-5 h-8 w-8 text-darkblue" />
        </button>
      </div>
    </>
  );
};

export default CartItem;
