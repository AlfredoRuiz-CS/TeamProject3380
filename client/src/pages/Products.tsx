import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { productItem } from '@/components/ProductCard.tsx';
import ProductCard from '@/components/ProductCard.tsx';
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface productProps {
  products: productItem[];
}

let dummyProduct: productItem = {
  name: 'Fresh Strawberries, 1 lb.',
  price: 10.99,
  description: [
    'Organic, locally-sourced strawberries',
    'Grown in Gary, Indiana',
  ],
  image: '/assets/strawberries.jpg',
  stock: 10,
  portion: 'lb.',
};

let dummyProducts: productItem[] = Array(10)
  .fill({})
  .map(() => ({ ...dummyProduct }));

const Products = (props: productProps) => {
  let [sortOrder, setSortOrder] = useState('Price Desc.');

  return (
    <>
      <div className="font-poppins flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite text-black">
        <Header />

        <div className="flex flex-col items-center text-center">
          <h1 className="mb-5 pt-[5rem] font-jua text-7xl">
            Browse All Products
          </h1>
          {/* Dropdown for sorting */}
          <div className="flex gap-2 place-self-start pb-5">
            <h3 className="items-center place-self-center pl-10 font-inter text-lg font-medium">
              Sort by:{' '}
            </h3>

            {/* Select Dropdown for sorting products by value */}
            <Select
              defaultValue="Price Desc."
              onValueChange={(e) => setSortOrder(e)}
            >
              <SelectTrigger className="h-10 w-[8rem] bg-white text-black ">
                <SelectValue placeholder="Price Desc." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Price Desc.">Price Desc.</SelectItem>
                <SelectItem value="Price Asc.">Price Asc.</SelectItem>
                <SelectItem value="Alpha">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* List of Product Items */}
          <div className="mx-[10rem] flex flex-row flex-wrap gap-10">
            {dummyProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
