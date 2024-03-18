import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { productItem } from '@/components/store';
interface ProductCardProps {
  product: productItem;
}

const ProductCard = (props: ProductCardProps) => {
  // Funcitonality to toggle the quantity dropdown
  const [QuantityEnabled, setQuantityEnabled] = useState(false);
  const [quantity, setQuantity] = useState(1);

  function quantityDropdownToggle() {
    setQuantityEnabled(!QuantityEnabled);
  }

  function handleAddToList() {
    console.log('Added ', quantity, ' ', props.product.name, 'to List');
  }

  function handleAddToCart() {
    console.log('Added ', quantity, ' ', props.product.name, 'to Cart');
  }

  return (
    <>
      <div className="flex h-[30rem] w-[25rem] flex-col rounded-2xl bg-cardwhite">
        {/* Product Image / Link to individual Item Page */}
        <a href={`/product/${props.product.name}`}>
          <img
            src={props.product.image}
            className="mx-auto mt-8 h-[15rem] w-[20rem] rounded-xl object-cover"
          ></img>
        </a>
        {/* Product Name */}
        <h2 className="ml-6 mr-auto pt-4 text-left font-jua text-xl hover:underline hover:underline-offset-4">
          <a href={`/product/${props.product.name}`}>{props.product.name}</a>
        </h2>
        {/* Short Product Info */}
        <ul className="ml-10 list-disc text-left text-sm">
          {props.product.description.map((item, index) => (
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
        {/* Quantity Button */}
        <div className="mt-10 flex flex-row justify-center gap-3 px-3">
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
              className="text-md w-14 rounded-lg bg-[#48C9E5] py-5 font-jua text-black hover:bg-[#48C9E5]/85"
              onClick={quantityDropdownToggle}
            >
              Qty.
            </Button>
          )}

          {/* Add To List Button */}
          <Button
            className="text-md flex-grow rounded-lg bg-[#4874E5] py-5 font-jua text-black hover:bg-[#4874E5]/90"
            onClick={handleAddToList}
          >
            Add to List
          </Button>
          {/* Add to Cart Button */}
          <Button
            className="text-md flex-grow rounded-lg bg-[#F53E3E] py-5 font-jua text-black hover:bg-[#F53E3E]/85"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
