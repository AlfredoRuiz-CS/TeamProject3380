import { productItem } from './store';
import { FaTrashCan } from 'react-icons/fa6';
import useUserStore from './store';

interface CartItemProps {
  product: productItem;
  quantity: number;
}

const CartItem = (props: CartItemProps) => {
  const store = useUserStore();

  function handleRemoveItem(e: React.MouseEvent/*, product: productItem*/) {
    e.preventDefault();
    // store.removeFromCart(product);
  }

  function handleSubtractQuantity(e: React.MouseEvent) {
    e.preventDefault();
    store.changeQuantity(props.product, props.quantity - 1);
  }

  function handleAddQuantity(e: React.MouseEvent) {
    e.preventDefault();
    store.changeQuantity(props.product, props.quantity + 1);
  }

  return (
    <>
      <div className="flex h-[8rem] w-[45rem] flex-row items-center rounded-lg bg-cardwhite">
        {/* Item Delete Button */}
        <button onClick={(e) => handleRemoveItem(e/*, props.product*/)}>
          <FaTrashCan className="mx-5 h-8 w-8 text-darkblue" />
        </button>
        <img
          src={props.product.image}
          alt={props.product.name}
          className="mr-2 h-20 w-20 rounded-lg object-cover"
        />
        {/* Product Description and Price */}
        <div className="ml-2 flex flex-col">
          <h2 className="text-lg">{props.product.name}</h2>
          <p className="text-sm">{props.product.description[0]}</p>
          <p className="text-sm">
            {props.product.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            }) +
              ' per ' +
              props.product.portion}
          </p>
        </div>

        {/* Quantity Selector */}

        <div className="ml-[3rem] flex flex-row gap-1">
          <button
            className=" h-[3rem] w-[3.2rem] rounded-full  bg-xanthousyellow text-center text-3xl text-black"
            onClick={(e) => handleSubtractQuantity(e)}
          >
            -
          </button>
          <div className="h-[3rem] w-[9rem] rounded-3xl bg-zinc-300">
            <p className="pr-2 pt-3 text-center text-black">{props.quantity}</p>
          </div>
          <button
            className=" h-[3rem] w-[3.2rem] rounded-full bg-xanthousyellow text-center text-3xl text-black"
            onClick={(e) => handleAddQuantity(e)}
          >
            +
          </button>
        </div>
        <p className=" mx-auto text-3xl">
          {(props.product.price * props.product.price).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </p>
      </div>
    </>
  );
};

export default CartItem;
