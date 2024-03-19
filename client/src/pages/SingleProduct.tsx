import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { productItem } from '@/components/store';
import { dummyProducts } from './Products';
// interface productProps {
//   product: productItem;
// }

const dummyProduct: productItem = {
  productId: 12345,
  name: 'Fresh Strawberries',
  price: 3.97,
  image: '/assets/strawberries.jpg',
  stock: 10,
  portion: 'lb.',
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
    totalFat: '0g',
    sodium: '0mg',
    totalCarbohydrates: '11g',
    dietaryFiber: '2g',
    sugars: '8g',
    protein: '1g',
    potassium: '170mg',
    vitaminA: '100mg',
    vitaminC: '50mg',
    calcium: '10mg',
    iron: '10mg',
  },
};

const SingleProduct = () => {
  // ! REMOVE DUMMYPRODUCT FOR FINAL VERSION !!
  const product = dummyProduct;
  const test = useParams();

  console.log(test);
  // Funcitonality to toggle the quantity dropdown
  const [QuantityEnabled, setQuantityEnabled] = useState(false);
  const [quantity, setQuantity] = useState(1);

  function quantityDropdownToggle() {
    setQuantityEnabled(!QuantityEnabled);
  }

  // function handleAddToList() {
  //   console.log('Added ', quantity, ' ', product.name, 'to List');
  // }

  // function handleAddToCart() {
  //   console.log('Added ', quantity, ' ', product.name, 'to Cart');
  // }

  return (
    <>
      <div className="font-poppins flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite pb-10 text-black">
        <Header />

        <div className="flex flex-col items-center gap-[5px]">
          <div className="flex items-center gap-5">
            <img
              className="h-[22rem] w-[22rem] rounded-[10px] object-cover pr-5"
              src="../assets/strawberry.png"
              alt="Strawberry"
            />
            <div className="flex flex-col items-start gap-2 font-jua">
              <div className="text-[32px]">{product.name}</div>
              <div className="text-[32px]"></div>
              <div className="text-[32px]">
                {product.price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}{' '}
                per {product.portion}
              </div>
              <div className="mt-10 flex flex-row justify-center gap-3">
                {QuantityEnabled ? (
                  <div className="flex gap-2">
                    <Button
                      className="flex h-12 flex-grow rounded-lg bg-quantityblue px-3 py-2 font-jua text-3xl text-black hover:bg-quantityblue/85"
                      onClick={quantityDropdownToggle}
                    >
                      Qty.
                    </Button>
                    <Select
                      defaultValue="1"
                      onValueChange={(e) => setQuantity(parseInt(e))}
                    >
                      <SelectTrigger className="h-12 w-[3rem] flex-grow border border-black bg-gray-200">
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
                    className="flex h-12 rounded-lg bg-quantityblue px-3 py-2 font-jua text-3xl text-black hover:bg-quantityblue/85"
                    onClick={quantityDropdownToggle}
                  >
                    Qty.
                  </Button>
                )}

                <button className="flex h-12 flex-grow items-center justify-center place-self-end rounded-lg bg-blue-500 px-2 py-3">
                  <div className="text-[32px]">Add to list</div>
                </button>
              </div>
              <button className="flex h-12 w-full flex-grow items-center justify-center rounded-lg bg-red-500 px-2 py-3">
                <div className="text-[32px]">Add to cart</div>
              </button>
            </div>
          </div>
          <div className=" w-full max-w-[1086px] px-4">
            {/* Description of Product */}
            <div className="font-jua text-[32px]">Description</div>
            <ul className="font-junge mb-2 ml-6 list-disc text-[24px]">
              {product.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Nutrition Facts Table */}
          <div className="mt-10 w-full max-w-[786px] rounded-[10px] bg-stone-200 p-5 font-jua text-black">
            <div className="my-10 text-[32px]">Nutrition Facts</div>
            {product.nutritionFacts?.servingsPerContainer ? (
              <div className="text-[24px]">
                {product.nutritionFacts.servingsPerContainer} serving(s) per
                contianer
              </div>
            ) : (
              <div></div>
            )}
            {/* TODO: IMPLEMENT PERCENTAGE CALCULATORS FOR DAILY VALUE PERCENTAGE */}
            <div className="flex justify-between">
              <div className="text-[28px]">Serving Size</div>
              <div className="text-[28px]">
                {product.nutritionFacts?.servingSize}
              </div>
            </div>
            <div className="pt-3 text-2xl font-normal">Amount Per Serving</div>
            <div className="flex justify-between">
              <div className="text-[40px]">Calories</div>
              <div className="text-[40px]">
                {product.nutritionFacts?.calories}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-[28px]">
                Total Fat {product.nutritionFacts?.totalFat}
              </div>
              <div className="text-[28px]">0%</div>
            </div>
            <div className="flex justify-between">
              <div className="text-[28px]">
                Sodium {product.nutritionFacts?.sodium}
              </div>
              <div className="text-[28px]">0%</div>
            </div>
            <div className="flex justify-between">
              <div className="text-[28px]">
                Total Cabohydrate {product.nutritionFacts?.totalCarbohydrates}
              </div>
              <div className="text-[28px]">4%</div>
            </div>
            <div className="flex justify-between">
              <div className="text-[28px]">
                Dietary Fiber {product.nutritionFacts?.dietaryFiber}
              </div>
              <div className="text-[28px]">8%</div>
            </div>
            <div className="flex justify-between">
              <div className="text-[28px]">
                Sugar {product.nutritionFacts?.sugars}
              </div>
              <div className="text-[28px]">8%</div>
            </div>
            <div className="flex justify-between">
              <div className="text-[28px]">
                Protein {product.nutritionFacts?.protein}
              </div>
              <div className="text-[28px]">8%</div>
            </div>

            <div className="flex justify-between ">
              <div className="text-[28px]">
                Potassium {product.nutritionFacts?.potassium}
              </div>
              <div className="text-[28px]">5%</div>
            </div>
            <div className="flex justify-between">
              <div className="text-[28px]">
                Vitamin A {product.nutritionFacts?.vitaminA}
              </div>
              <div className="text-[28px]">0%</div>
            </div>
            <div className="flex justify-between">
              <div className="text-[28px]">
                Calcium {product.nutritionFacts?.calcium}
              </div>
              <div className="text-[28px]">2%</div>
            </div>
            <div className="flex justify-between">
              <div className="text-[28px]">
                Vitamin C {product.nutritionFacts?.vitaminC}
              </div>
              <div className="text-[28px]">160%</div>
            </div>
            <div className="flex justify-between">
              <div className="text-[28px]">
                Iron {product.nutritionFacts?.iron}
              </div>
              <div className="text-[28px]">2%</div>
            </div>
            <div className="text-base font-normal">
              *The %Daily Value (DV) tells you how much a nutrient in a serving
              of food contributes to a daily diet. 2,000 calories a day is used
              for general nutrition advice.
            </div>
          </div>
          <div className="mt-10 font-jua text-[32px] font-normal">
            Shipping & Returns
          </div>
          <div className="mt-3 flex w-full max-w-[1086px] flex-col gap-10 md:flex-row">
            <div className="flex-1 rounded-[10px] bg-stone-200 p-5">
              <div className="mb-3 font-jua text-[28px]">Shipping details</div>
              <div className="font-junge text-xl">
                Estimated ship dimensions:{' '}
                {'Length ' +
                  product.shippingDetails?.dimensions.length +
                  ' x Width ' +
                  product.shippingDetails?.dimensions.width +
                  ' x Height ' +
                  product.shippingDetails?.dimensions.height}
              </div>
            </div>
            {/* This should be the same for all items, so hardcoding is fine */}
            <div className="flex-1 rounded-[10px] bg-stone-200 p-5">
              <div className="mb-3 font-jua text-[28px]">Return details</div>
              <div className="font-junge text-xl">
                This item can be returned to any ShastaMart store. This item
                must be returned within the same day of purchase in store.
                Returned items must have not been opened, and remains in its
                original packaging.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
