import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SingleProduct = () => {
  const product = {
    name: 'Fresh Strawberries',
    price: 3.97,
    description:
      "Enjoy the light, refreshing taste of fresh strawberries. Full of sweet,\
       juicy flavor, they're a healthy snack or sweet addition to your favorite desserts.\
       Strawberries are also a good source of Vitamin C, fiber and potassium.",
    nutritionFacts: {
      servingSize: '8.00 medium',
      calories: 50,
      totalFat: '0g',
      sodium: '0mg',
      totalCarbohydrates: '11g',
      dietaryFiber: '2g',
      sugars: '8g',
      protein: '1g',
      potassium: '170mg',
      vitaminA: '0%',
      vitaminC: '160%',
      calcium: '2%',
      iron: '2%',
    },
    shippingDetails:
      'Estimated ship dimensions: 7.38 inches length x 6.38 inches width x 2.3\
       inches height. Estimated ship weight: 14 ounces.',
    returnDetails:
      'This item can be returned to any ShastaMart store. This item must be\
       returned within the same day of purchase in store. Returned items must have not been\
        opened, and remains in its original packaging.',
  };
  return (
    <>
      <div className="font-poppins flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite text-black">
        <Header />

        <div className="flex flex-col items-center gap-[5px] overflow-auto p-[0px]">
          <div className="flex items-center gap-5 ">
            <img
              className="w-22 h-auto"
              src={'../assets/strawberry.png'}
              alt="Strawberry"
            />
            <div className="flex flex-col items-start gap-2">
              <div className="font-jua text-[32px]">{product.name}</div>
              <div className="font-jua text-[32px]">1 lb</div>
              <div className="font-jua text-[32px]">${product.price} each</div>
              <div className=" flex gap-2">
                <div className="relative flex h-[46px] w-[95px] items-center justify-center overflow-hidden rounded-[10px] bg-cyan-400">
                  <select className="h-full w-full cursor-pointer appearance-none rounded-[10px] bg-cyan-400 p-[10px] text-center font-jua text-[16px] text-black">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <button className="flex h-[46px] w-[323px] items-center justify-center rounded-[10px] bg-red-500 px-[25px]">
                  <div className="font-jua text-[32px]">Add to cart</div>
                </button>
              </div>
              <button className="mt-2 flex h-[46px] w-[428px] items-center justify-center rounded-[10px] bg-blue-500 px-[25px]">
                <div className="font-jua text-[32px]">Add to list</div>
              </button>
            </div>
          </div>
          <div className="mt-10 w-full max-w-[1086px] px-4">
            <div className="my-10 font-jua text-[32px]">Description</div>
            <p className="font-junge my-10 text-[24px]">
              {product.description}
            </p>
            <ul className="font-junge my-10 text-[24px]">
              <li>1 lb fresh strawberries</li>
              <li>Full of sweet,juicy flavor</li>
              <li>Good source of Vitamin C, fiber and potassium</li>
            </ul>
          </div>
          <div className="mt-10 w-full max-w-[786px] rounded-[10px] bg-stone-200 p-5">
            <div className="my-10 font-jua text-[32px]">Nutrition Facts</div>
            <div className="font-junge text-[24px]">
              1 serving per containers
            </div>
            <div className="flex justify-between">
              <div className="font-jua text-[28px] text-black">
                Serving Size
              </div>
              <div className="font-jua text-[28px] text-black">8.00 medium</div>
            </div>
            <div className="pt-3 font-jua text-2xl font-normal text-black">
              Amount Per Serving
            </div>
            <div className="flex justify-between">
              <div className="font-jua text-[40px] text-black">Calories</div>
              <div className="font-jua text-[40px] text-black">50</div>
            </div>
            <div className="flex justify-between">
              <div className="font-jua text-[28px] text-black">
                Total Fat 0g
              </div>
              <div className="font-jua text-[28px] text-black">0%</div>
            </div>
            <div className="flex justify-between">
              <div className="font-jua text-[28px] text-black">Sodium 0mg</div>
              <div className="font-jua text-[28px] text-black">0%</div>
            </div>
            <div className="flex justify-between">
              <div className="font-jua text-[28px] text-black">
                Total Cabohydrate 11g
              </div>
              <div className="font-jua text-[28px] text-black">4%</div>
            </div>
            <div className="flex justify-between">
              <div className="font-jua text-[28px] text-black">
                Dietary Fiber 2g
              </div>
              <div className="font-jua text-[28px] text-black">8%</div>
            </div>
            <div className="flex justify-between">
              <div className="font-jua text-[28px] text-black">Sugar 8g</div>
            </div>
            <div className="font-jua text-[28px] text-black">Protein 1g</div>
            <div className="flex justify-between ">
              <div className="font-jua text-[28px] text-black">
                Potassium 170mg
              </div>
              <div className="font-jua text-[28px] text-black">5%</div>
            </div>
            <div className="flex justify-between">
              <div className="font-jua text-[28px] text-black">Vitamin A 0</div>
              <div className="font-jua text-[28px] text-black">0%</div>
            </div>
            <div className="flex justify-between">
              <div className="font-jua text-[28px] text-black">Calcium 0</div>
              <div className="font-jua text-[28px] text-black">2%</div>
            </div>
            <div className="flex justify-between">
              <div className="font-jua text-[28px] text-black">Vitamin C 0</div>
              <div className="font-jua text-[28px] text-black">160%</div>
            </div>
            <div className="flex justify-between">
              <div className="font-jua text-[28px] text-black">Iron 0</div>
              <div className="font-jua text-[28px] text-black">2%</div>
            </div>
            <div className="font-jua text-base font-normal text-black">
              *The %Daily Value (DV) tells you how much a nutrient in a serving
              of food contributes to a daily diet. 2,000 calories a day is used
              for general nutrition advice.
            </div>
          </div>
          <div className="mt-10 font-jua text-[32px] font-normal text-black">
            Shipping & Returns
          </div>
          <div className="mt-3 flex w-full max-w-[1086px] flex-col gap-10 md:flex-row">
            <div className="flex-1 rounded-[10px] bg-stone-200 p-5">
              <div className="mb-3 font-jua text-[28px]">Shipping details</div>
              <div className="font-junge text-xl">
                Estimated ship dimensions: 7.38 inches length x 6.38 inches
                width x 2.3 inches height.<br></br> Estimated ship weight: 14
                ounces.
              </div>
            </div>
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
