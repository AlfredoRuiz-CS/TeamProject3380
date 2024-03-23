import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button.tsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { productItem } from '@/components/store';
// import useUserStore from '@/components/store';

const dummyProduct: productItem = {
  productId: 12345,
  name: 'Fresh Strawberries',
  price: 3.97,
  image: '/assets/strawberries.jpg',
  stock: 10,
  category: 'produce',
  portion: 'lb.',
  supplier: 'Bury Farms',
  supplierStock: 100,
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
const dummyProducts: productItem[] = Array(20)
  .fill({})
  .map(() => ({
    ...dummyProduct,
  }));
dummyProducts[4].stock = 2;
dummyProducts[4].supplierStock = 0;
dummyProducts[6].stock = 0;
dummyProducts[6].supplierStock = 20;

const AdminDashboard = () => {
  const popularItem1 = dummyProducts.reduce((lowest, product) => {
    return lowest.supplierStock < product.supplierStock ? lowest : product;
  }, dummyProducts[0]);
  const updatedProducts = dummyProducts.filter(
    (product) => product !== popularItem1
  );
  const popularItem2 = updatedProducts.reduce((lowest, product) => {
    return lowest.supplierStock < product.supplierStock ? lowest : product;
  }, dummyProducts[0]);

  // function handleSubmitOrder(event: React.FormEvent<HTMLFormElement>) {
  //   console.log('Order Submitted');
  // }

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
        <Header />
        <div className="mt-16 flex flex-row gap-10">
          {/* Individual Item Stock Table */}
          <div className="ml-20 flex flex-grow flex-col pb-10">
            <h1 className="mb-4 text-4xl text-white">Individual Item Stock</h1>
            <Table className="min-h-[20rem] rounded-xl bg-cardwhite ">
              <TableHeader>
                <TableRow>
                  <TableHead className="max-w-6">Name</TableHead>
                  <TableHead className="max-w-6">Store Stock</TableHead>

                  <TableHead className="max-w-7">Store Stock Status</TableHead>
                  <TableHead className="max-w-6">Value In Inventory</TableHead>
                  <TableHead className="max-w-6">Supplier Name</TableHead>
                  <TableHead className="max-w-6">Supplier Stock</TableHead>
                  <TableHead className="max-w-7">
                    Supplier Stock Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="max-w-7">{product.name}</TableCell>
                    <TableCell className="max-w-6">{product.stock}</TableCell>
                    <TableCell className="max-w-6">
                      {product.stock > 3 ? (
                        <p className="text-lg text-green-400">Good</p>
                      ) : product.stock > 0 ? (
                        <p className="text-lg text-yellow-500">Low</p>
                      ) : (
                        <p className="text-lg text-red-400">Bad</p>
                      )}
                    </TableCell>
                    <TableCell className="max-w-6">
                      {(product.stock * product.price).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </TableCell>
                    <TableCell className="max-w-6">
                      {product.supplier}
                    </TableCell>

                    <TableCell className="max-w-6">
                      {product.supplierStock}
                    </TableCell>
                    <TableCell className="max-w-7">
                      {product.supplierStock > 30 ? (
                        <p className="text-lg text-green-400">Good</p>
                      ) : product.supplierStock > 10 ? (
                        <p className="text-lg text-yellow-500">Low</p>
                      ) : (
                        <p className="text-lg text-red-400">Bad</p>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Overall Stock and Popular Items */}
          <div className="flex flex-col">
            <h1 className="mb-4 text-4xl text-white">Overall Stock</h1>
            <div className="mr-10 flex h-[30rem] min-w-[40rem] max-w-[50rem] flex-col rounded-xl bg-cardwhite">
              <div className="flex flex-row">
                <div className="ml-10 mt-10 flex flex-col gap-10">
                  <div className="flex w-full flex-row justify-between gap-[10rem]">
                    <h1 className="flex text-4xl text-darkblue">
                      Total Supply
                    </h1>
                    <h1 className="text-right text-4xl text-darkblue">
                      {Object.values(dummyProducts).reduce(
                        (total, product) => total + product.stock,
                        0
                      )}
                    </h1>
                  </div>
                  {/* BACKEND CALL TO CHECK IF THERE ARE < 5 OUT OF STOCK PRODUCTS IN THE DB */}
                  <div className="flex w-full flex-row justify-between gap-[10rem]">
                    <h1 className="text-4xl text-darkblue">Total Value</h1>
                    <h1 className="text-right text-4xl text-darkblue">
                      {Object.values(dummyProducts)
                        .reduce(
                          (total, product) =>
                            total + product.price * product.stock,
                          0
                        )
                        .toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                    </h1>
                  </div>
                  <div className="flex w-full flex-row justify-between gap-[10rem]">
                    <h1 className="pb-14 text-4xl text-darkblue">
                      Total Costs
                    </h1>
                    <h1 className="text-right text-4xl text-darkblue">
                      {Object.values(dummyProducts)
                        .reduce(
                          (total, product) =>
                            total + product.price * product.stock,
                          0
                        )
                        .toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                    </h1>
                  </div>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex h-[4rem] w-[8rem] flex-row self-center bg-darkblue text-lg">
                    Order Stock?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-3xl">Order Stock</DialogTitle>
                    <DialogDescription className="text-lg">
                      Enter Product Name and Quantity below to submit order.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Product Name
                      </Label>
                      <Input
                        id="productName"
                        placeholder="e.g. Fresh Strawberries"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Quantity
                      </Label>
                      <Input
                        id="quantity"
                        placeholder="e.g. 10"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Submit Order</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Popular Items */}
            <div className="">
              <div className="mr-10 mt-10 flex min-h-[20rem] min-w-14 flex-col gap-5 rounded-lg bg-cardwhite pt-5">
                <h1 className="text-center text-3xl font-medium">
                  Popular Items
                </h1>
                <div className="flex flex-row gap-5 pl-28">
                  <div>
                    <img
                      className=" h-[5rem] w-[5rem] rounded-lg object-cover"
                      src={popularItem1.image}
                    ></img>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="flex flex-row self-center pt-5 text-3xl">
                      {popularItem1.name}
                    </h1>
                    {popularItem1.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }) +
                      ' per ' +
                      popularItem1.portion}
                  </div>
                  <div className="flex flex-col"></div>
                </div>
                <div className="flex flex-row gap-5 pl-28">
                  <div className="pt-5">
                    <img
                      className="h-[5rem] w-[5rem] rounded-lg object-cover"
                      src={popularItem2.image}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="flex flex-row self-center pt-10 text-3xl">
                      {popularItem2.name}
                    </h1>
                    {popularItem2.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }) +
                      ' per ' +
                      popularItem2.portion}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
