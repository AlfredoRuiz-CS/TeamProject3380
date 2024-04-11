import { Button } from '@/components/ui/button';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { productItem } from '@/components/store';
import { Link } from 'react-router-dom';
import useUserStore from '@/components/store';
interface ProductCardProps {
  product: productItem;
  list?: boolean;
  removeList?: boolean;
}

const ProductCard = (props: ProductCardProps) => {
  // Impoting the product from dynamic URL
  const user = useUserStore();

  // Funcitonality to toggle the quantity dropdown
  const [QuantityEnabled, setQuantityEnabled] = useState(false);
  const [quantity, setQuantity] = useState(1);

  function quantityDropdownToggle() {
    setQuantityEnabled(!QuantityEnabled);
  }

  function handleAddToList() {
    if (user.loggedIn && !user.isAdmin) {
      listConfirmToast();
      console.log('Added ', quantity, ' ', props.product.name, 'to List');
      user.addToList(props.product);
    }
  }

  function handleRemoveFromList() {
    console.log('Removed ', quantity, ' ', props.product.name, 'from List');
    if (user.loggedIn) {
      user.removeFromList(props.product);
    }
  }

  function handleAddToCart() {
    if (user.loggedIn && !user.isAdmin){
      cartConfirmToast();
      console.log('Added ', quantity, ' ', props.product.name, 'to Cart');
      user.addToCart(props.product, quantity);
    }
  }

  const cartConfirmToast = () =>
    toast.success(
      'Added ' + quantity + ' ' + props.product.name + ' to Cart!',
      {
        position: 'bottom-right',
        className: 'font-bold text-black',
        autoClose: 2000,
      }
    );
  const listConfirmToast = () =>
    toast.success(
      'Added ' + quantity + ' ' + props.product.name + ' to List!',
      {
        position: 'bottom-right',
        className: 'font-bold text-black',
      }
    );

  return (
    <>
      <div className="flex h-[30rem] w-[25rem] flex-col rounded-2xl bg-cardwhite">
        {/* Product Image / Link to individual Item Page */}
        <Link to={`/product/${props.product.productId}`}>
          <img
            src={props.product.image}
            className="mx-auto mt-8 h-[15rem] w-[20rem] rounded-xl object-cover"
          ></img>
        </Link>
        {/* Product Name */}
        <h2 className="ml-6 mr-auto pt-4 text-left font-jua text-xl hover:underline hover:underline-offset-4">
          <Link to={`/product/${props.product.name}`}>
            {props.product.name}
          </Link>
        </h2>
        {/* Short Product Info */}
        <ul className="ml-10 list-disc text-left text-sm">
          {props.product.description.slice(0, 2).map((item, index) => (
            <li className="" key={index}>
              {item}
            </li>
          ))}
        </ul>
        {/* Price */}
        <h1 className="mr-5 text-right font-jua text-xl">
          {props.product.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }) +
            ' per ' +
            props.product.portion}
        </h1>
        {/* Buttons section */}
        <section className="mb-3 mt-auto flex flex-row justify-center gap-3 px-3">
          {/* Quantity Button */}
          {QuantityEnabled ? (
            <div className="flex flex-row gap-2">
              <Button
                className="text-md w-14 rounded-lg bg-[#48C9E5] py-5 font-jua text-black hover:bg-[#48C9E5]/85"
                onClick={quantityDropdownToggle}
              >
                Qty.
              </Button>
              <Select
                defaultValue="1"
                onValueChange={(e) => setQuantity(parseInt(e))}
              >
                <SelectTrigger className="h-10 w-[3rem] flex-grow border border-black bg-gray-200">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent side="bottom">
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <Button
              className="text-md w-14 rounded-lg bg-quantityblue py-5 font-jua text-black hover:bg-quantityblue/85"
              onClick={quantityDropdownToggle}
            >
              Qty.
            </Button>
          )}

          {/* Add To List Button */}
          {props.list ? (
            <Button
              className="text-md flex-grow rounded-lg bg-blue-500 py-5 font-jua text-black hover:bg-blue-500/90"
              onClick={handleAddToList}
            >
              Add to List
            </Button>
          ) : (
            <></>
          )}
          {/* Remove From List Button */}
          {props.removeList ? (
            <Button
              className="text-md hover:bg-blueß-500/90 flex-grow rounded-lg bg-blue-500 py-5 font-jua text-black"
              onClick={handleRemoveFromList}
            >
              Remove from List
            </Button>
          ) : (
            <></>
          )}

          {/* Add to Cart Button */}
          <Button
            className="text-md flex-grow rounded-lg bg-red-500 py-5 font-jua text-black hover:bg-red-500/85"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </section>
      </div>
    </>
  );
};

export default ProductCard;
