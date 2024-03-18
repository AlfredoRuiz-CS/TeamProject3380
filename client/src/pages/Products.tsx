import Header from "../components/Header";
import Footer from "../components/Footer";

const Products = () => {
  const product = {
    name: 'Fresh Strawberries',
    price: 3.97,
    description: 'Enjoy the light, refreshing taste of fresh strawberries. Full of sweet,\
     juicy flavor, they\'re a healthy snack or sweet addition to your favorite desserts.\
     Strawberries are also a good source of Vitamin C, fiber and potassium.',
    nutritionFacts:{
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
    shippingDetails: 'Estimated ship dimensions: 7.38 inches length x 6.38 inches width x 2.3\
     inches height. Estimated ship weight: 14 ounces.',
    returnDetails: 'This item can be returned to any ShastaMart store. This item must be\
     returned within the same day of purchase in store. Returned items must have not been\
      opened, and remains in its original packaging.'
  }
  return(
    <>
      <div className="flex h-screen flex-col overflow-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-poppins text-black">
        <Header/>
        
          <div className='flex flex-col p-[0px] gap-[5px] items-center overflow-auto'>
            <div className="flex items-center gap-5 ">
            <img className="w-22 h-auto" src={"./assets/strawberry.png"} alt="Strawberry"/>
              <div className="flex flex-col items-start gap-2">
                <div className="text-[32px] font-jua">{product.name}</div>
                <div className='text-[32px] font-jua'>1 lb</div>
                <div className="text-[32px] font-jua">${product.price} each</div>
                <div className=" flex gap-2">
                  <div className="relative w-[95px] h-[46px] bg-cyan-400 rounded-[10px] flex justify-center items-center overflow-hidden">
                    <select className="bg-cyan-400 text-black text-[16px] font-jua rounded-[10px] w-full h-full cursor-pointer p-[10px] appearance-none text-center">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <button className="w-[323px] h-[46px] px-[25px] bg-red-500 rounded-[10px] flex justify-center items-center">
                    <div className="text-[32px] font-jua">Add to cart</div>
                  </button>
                </div>
                <button className="w-[428px] h-[46px] px-[25px] bg-blue-500 rounded-[10px] flex justify-center items-center mt-2">
                  < div className="text-[32px] font-jua">Add to list</div>
                </button>
              </div>
            </div>
            <div className="w-full max-w-[1086px] mt-10 px-4">
              <div className="font-jua text-[32px] my-10">Description</div>
                <p className="text-[24px] font-junge my-10">{product.description}</p>
                <ul className="text-[24px] font-junge my-10">
                  <li>1 lb fresh strawberries</li>
                  <li>Full of sweet,juicy flavor</li>
                  <li>Good source of Vitamin C, fiber and potassium</li>
                </ul>
            </div>
            <div className="w-full max-w-[786px] mt-10 bg-stone-200 rounded-[10px] p-5">
              <div className="font-jua text-[32px] my-10">Nutrition Facts</div>
              <div className="text-[24px] font-junge">1 serving per containers</div>
              <div className="flex justify-between">
                <div className="text-black text-[28px] font-jua">Serving Size</div>
                <div className="text-black text-[28px] font-jua">8.00 medium</div>
              </div>
              <div className="pt-3 text-black text-2xl font-normal font-['Jua']">Amount Per Serving</div>
              <div className="flex justify-between">
                <div className="text-black text-[40px] font-jua">Calories</div>
                <div className="text-black text-[40px] font-jua">50</div>
              </div>
              <div className="flex justify-between">
                <div className="text-black text-[28px] font-jua">Total Fat 0g</div>
                <div className="text-black text-[28px] font-jua">0%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-black text-[28px] font-jua">Sodium 0mg</div>
                <div className="text-black text-[28px] font-jua">0%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-black text-[28px] font-jua">Total Cabohydrate 11g</div>
                <div className="text-black text-[28px] font-jua">4%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-black text-[28px] font-jua">Dietary Fiber 2g</div>
                <div className="text-black text-[28px] font-jua">8%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-black text-[28px] font-jua">Sugar 8g</div>
              </div>
              <div className="text-black text-[28px] font-jua">Protein 1g</div>
              <div className="flex justify-between ">
                <div className="text-black text-[28px] font-jua">Potassium 170mg</div>
                <div className="text-black text-[28px] font-jua">5%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-black text-[28px] font-jua">Vitamin A 0</div>
                <div className="text-black text-[28px] font-jua">0%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-black text-[28px] font-jua">Calcium 0</div>
                <div className="text-black text-[28px] font-jua">2%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-black text-[28px] font-jua">Vitamin C 0</div>
                <div className="text-black text-[28px] font-jua">160%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-black text-[28px] font-jua">Iron 0</div>
                <div className="text-black text-[28px] font-jua">2%</div>
              </div>
              <div className="text-black text-base font-normal font-['Jua']">*The %Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</div>
            </div>
            <div className="text-black text-[32px] font-normal font-['Jua'] mt-10">Shipping & Returns</div>
            <div className="w-full max-w-[1086px] mt-3 flex flex-col md:flex-row gap-10">
              <div className="flex-1 bg-stone-200 rounded-[10px] p-5">
                <div className="text-[28px] font-jua mb-3">Shipping details</div>
                <div className="text-xl font-junge">Estimated ship dimensions: 7.38 inches length x 6.38 inches width x 2.3 inches height.<br></br> Estimated ship weight: 14 ounces.</div>
              </div>
              <div className="flex-1 bg-stone-200 rounded-[10px] p-5">
                <div className="text-[28px] font-jua mb-3">Return details</div>
                <div className="text-xl font-junge">This item can be returned to any ShastaMart store. This item must be returned within the same day of purchase in store. Returned items must have not been opened, and remains in its original packaging.</div>
              </div>
            </div>
            <div className="w-full">
              <Footer />
            </div>
          </div>            
      </div>
    </>
  )
};
export default Products;