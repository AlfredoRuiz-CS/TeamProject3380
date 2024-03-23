import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { productItem } from '@/components/store';
import ProductCard from '@/components/ProductCard.tsx';
import { useState, useEffect } from 'react';
import useUserStore from '@/components/store';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const dummyProduct: productItem = {
  productId: 12345,
  name: 'Fresh Strawberries',
  price: 3.97,
  image: '/assets/strawberries.jpg',
  stock: 10,
  supplier: 'Berry Farms',
  supplierStock: 100,
  portion: 'lb.',
  category: 'produce',
  description: [
    'Organic, locally-sourced strawberries',
    'Grown in Gary, Indiana',
    'good source of Vitamin C, fiber and potassium',
  ],
  shippingDetails: {
    dimensions: {
      length: '7.38 inches',
      width: '6.38 inches',
      height: '2.3 inches',
    },
    weight: '14 ounces',
  },
  nutritionFacts: {
    servingSize: '8 medium strawberries',
    servingsPerContainer: '1.5',
    calories: 50,
    totalFat: '0',
    sodium: '0',
    totalCarbohydrates: '11 g',
    dietaryFiber: '2 g',
    sugars: '8 g',
    protein: '1 g',
    potassium: '170 mg',
    vitaminA: '1 mg',
    vitaminC: '144 mg',
    calcium: '24 mg',
    iron: '0.6 mg',
  },
};

export const dummyProducts: productItem[] = Array(20)
  .fill({})
  .map(() => ({ ...dummyProduct }));

const Products = () => {
  const store = useUserStore();
  let [valueSortOrder, setValueSortOrder] = useState('Price Desc.');
  let [catSortOrder, setCatSortOrder] = useState('All');
  // ! CHANGE TO DATABASE CALL FOR FINAL VERSION!!
  const [products, setProducts] = useState<productItem[]>(
    sortProducts(dummyProducts)
  );

  useEffect(() => {
    let sorted = sortProducts(products);
    setProducts(sorted);
  }, [catSortOrder, valueSortOrder]);

  function sortProducts(products: productItem[]) {
    if (catSortOrder !== 'All') {
      products = products.filter(
        (product) => product.category === catSortOrder
      );
    }

    switch (valueSortOrder) {
      case 'Price Desc.':
        return products.sort((a, b) => b.price - a.price);
      case 'Price Asc.':
        return products.sort((a, b) => a.price - b.price);
      case 'Alpha Desc.':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'Alpha Asc.':
        return products.sort((a, b) => b.name.localeCompare(a.name));
      case 'In List':
      case 'In List':
        return [
          ...store.List,
          ...products.filter((product) => !store.List.includes(product)),
        ];
      default:
        return products;
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
        <Header />

        <div className="flex flex-col items-center text-center">
          <h1 className="mb-5 pt-[5rem] font-jua text-7xl">
            Browse All Products
          </h1>
          {/* Dropdown for sorting */}
          <div className="flex gap-2 place-self-start pb-5">
            <h3 className="items-center place-self-center pl-10 font-inter text-lg font-medium">
              Category:{' '}
            </h3>

            {/* Sort Dropdown for category */}
            <Select
              defaultValue="All"
              onValueChange={(e) => setCatSortOrder(e)}
            >
              <SelectTrigger className="h-10 w-[8rem] bg-white text-black ">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Produce">Produce</SelectItem>
                <SelectItem value="Meat">Meat</SelectItem>
                <SelectItem value="Fish">Fish</SelectItem>
                <SelectItem value="Dairy">Dairy</SelectItem>
                <SelectItem value="Snacks">Snacks</SelectItem>
              </SelectContent>
            </Select>

            <h3 className="items-center place-self-center pl-2 font-inter text-lg font-medium">
              Sort by:{' '}
            </h3>

            {/* Select Dropdown for sorting products by value */}
            <Select
              defaultValue="Price Desc."
              onValueChange={(e) => setValueSortOrder(e)}
            >
              <SelectTrigger className="h-10 w-[10rem] bg-white text-black ">
                <SelectValue placeholder="Price Desc." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Price Desc.">Price Desc.</SelectItem>
                <SelectItem value="Price Asc.">Price Asc.</SelectItem>
                <SelectItem value="Alpha Desc.">Alphabetical Desc.</SelectItem>
                <SelectItem value="Alpha Asc.">Alphabetical Asc.</SelectItem>
                <SelectItem value="In List">In List</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* List of Product Items */}
          <div className="mx-[10rem] flex flex-row flex-wrap gap-7">
            {products.map((product, index) => (
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
