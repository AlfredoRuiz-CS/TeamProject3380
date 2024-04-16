import Header from '@/components/Header';
import Footer from '@/components/Footer';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button.tsx';
import { states } from '@/pages/Profile';

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
  DialogClose,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { useProductsStore } from '@/components/store';
import { mapCategory, ProductApiResponse } from './Products';

const AdminDashboard = () => {
  const { setProducts } = useProductsStore();
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [portion, setPortion] = useState('lb.');
  const [selectedCategory, setSelectedCategory] = useState('produce');
  const [selectedState, setSelectedState] = useState('TX');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://shastamart-api-deploy.vercel.app/api/products/getAllProducts'
        );
        const productsData = await response.data;
        const transformedProducts = productsData.map(
          (product: ProductApiResponse) => ({
            productId: product.productID,
            name: product.productName,
            description: product.productDesc.split('. '),
            price: parseFloat(product.productPrice),
            stock: product.stockQuantity,
            category: mapCategory(product.categoryID),
            image: product.image,
            supplier: product.supplier,
            supplierStock: product.supplierStock,
            portion: product.portion,
            supplierPrice: product.supplierPrice,
            nutritionFacts: {
              servingSize: product.servingSize,
              servingsPerContainer: product.servingsPerContainer,
              calories: product.calories,
              totalFat: product.totalFat,
              cholesterol: product.cholesterol,
              sodium: product.sodium,
              totalCarbohydrates: product.totalCarbohydrates,
              dietaryFiber: product.dietaryFiber,
              sugars: product.sugars,
              protein: product.protein,
              potassium: product.potassium,
              vitaminA: product.vitaminA,
              vitaminC: product.vitaminC,
              vitaminD: product.vitaminD,
              vitaminE: product.vitaminE,
              calcium: product.calcium,
              iron: product.iron,
            },
            shippingDetails: {
              dimensions: {
                length: product.dimensionsLength,
                width: product.dimensionsWidth,
                height: product.dimensionsHeight,
              },
              weight: product.weight,
            },
          })
        );
        setProducts(transformedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [setProducts, reloadTrigger]);

  const products = useProductsStore((state) => state.products);
  const navigate = useNavigate();
  const popularItem1 = products.reduce((lowest, product) => {
    return lowest.supplierStock < product.supplierStock ? lowest : product;
  }, products[0]);
  const updatedProducts = products.filter(
    (product) => product !== popularItem1
  );
  const popularItem2 = updatedProducts.reduce((lowest, product) => {
    return lowest.supplierStock < product.supplierStock ? lowest : product;
  }, products[0]);

  function itemSelectHandler(productId: number) {
    console.log(
      'Selected Item: ',
      products.find((p) => p.productId === productId)
    );
    navigate('/suppliers');
  }

  function orderSuccessToast(productName: string, quantity: string) {
    toast.success(
      'Order for ' + quantity + ' ' + productName + ' ' + 'Submitted!',
      {
        position: 'bottom-right',
        className: 'font-bold text-black',
        duration: 2000,
      }
    );
  }

  function supplierSuccessToast(supplierName: string) {
    toast.success('Added ' + supplierName + ' to Suppliers!', {
      position: 'bottom-right',
      className: 'font-bold text-black',
      duration: 2000,
    });
  }

  function addProductToast(productName: string, quantity: string) {
    toast.success(
      'Added ' + quantity + ' ' + productName + ' ' + 'to Inventory!',
      {
        position: 'bottom-right',
        className: 'font-bold text-black',
        duration: 2000,
      }
    );
  }

  async function handleSubmitNewSupplier(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    let supplierName = (
      document.getElementById('suppliername') as HTMLInputElement
    ).value;
    let phoneNumber = (
      document.getElementById('supplierphone') as HTMLInputElement
    ).value;
    let streetAddress = (
      document.getElementById('streetaddress') as HTMLInputElement
    ).value;
    let city = (document.getElementById('city') as HTMLInputElement).value;
    let state = selectedState;
    let zipcode = (document.getElementById('zipcode') as HTMLInputElement)
      .value;

    const data = {
      name: supplierName,
      phoneNumber: phoneNumber,
      streetAddress: streetAddress,
      city: city,
      state: state,
      zipcode: zipcode,
    };

    try {
      const response = await axios.post(
        'https://shastamart-api-deploy.vercel.app/api/suppliers/insertSupplier',
        data
      );
      supplierSuccessToast(supplierName);
      console.log(response);
      console.log('Supplier Submitted for ', supplierName);
      setReloadTrigger((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let productName = (
      document.getElementById('productname') as HTMLInputElement
    ).value;

    const data = {
      productName: productName,
    };

    try {
      const response = await axios.post(
        'https://shastamart-api-deploy.vercel.app/api/products/deleteProduct',
        data
      );

      if (response.status === 200) {
        toast.success('Product Removed!', {
          position: 'bottom-right',
          className: 'font-bold text-black',
          duration: 2000,
        });
      }
      console.log('Product Removed for ', productName);
      setReloadTrigger((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }

  function handleRemoveSupplier(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let supplierName = (
      document.getElementById('suppliername') as HTMLInputElement
    ).value;

    const data = {
      supplierName: supplierName,
    };

    try {
      const response = axios.post(
        'https://shastamart-api-deploy.vercel.app/api/suppliers/deleteSupplier',
        data
      );
      console.log(response);
      console.log('Supplier Removed for ', supplierName);
      setReloadTrigger((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let productName = (
      document.getElementById('productName') as HTMLInputElement
    ).value;
    let quantity = (document.getElementById('quantity') as HTMLInputElement)
      .value;

    const data = {
      productName: productName,
      quantity: quantity,
    };

    try {
      const response = await axios.post(
        'https://shastamart-api-deploy.vercel.app/api/orders/insertStock',
        data
      );
      console.log(response);
      orderSuccessToast(productName, quantity);
      console.log('Order Submitted for ', productName, ' ', quantity);
      setReloadTrigger((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitNewItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let description = (
      document.getElementById('productdescription') as HTMLInputElement
    ).value;
    // For Toast Confirmation
    let productName = (
      document.getElementById('productName') as HTMLInputElement
    ).value;
    let quantity = (
      document.getElementById('stockquantity') as HTMLInputElement
    ).value;

    const data = {
      productInfo: {
        productName: (
          document.getElementById('productName') as HTMLInputElement
        ).value,
        productDesc: description,
        productPrice: (document.getElementById('price') as HTMLInputElement)
          .value,
        stockQuantity: parseInt(
          (document.getElementById('stockquantity') as HTMLInputElement).value
        ),
        categoryID:
          selectedCategory == 'produce'
            ? 1
            : selectedCategory == 'meat'
              ? 2
              : selectedCategory == 'fish'
                ? 3
                : selectedCategory == 'dairy'
                  ? 4
                  : 5,

        image: '/assets/default.jpg',
        supplier: (document.getElementById('suppliername') as HTMLInputElement)
          .value,
        supplierStock: parseInt(
          (document.getElementById('supplierstock') as HTMLInputElement).value
        ),
        supplierPrice: (
          document.getElementById('supplierprice') as HTMLInputElement
        ).value,
        portion: portion as 'lb.' | 'oz.' | 'item' | 'gal.',
      },
      nutritionFacts: {
        servingSize: (
          document.getElementById('servingsize') as HTMLInputElement
        ).value,
        servingsPerContainer: (
          document.getElementById('servingspercontainer') as HTMLInputElement
        ).value,
        calories: parseInt(
          (document.getElementById('calories') as HTMLInputElement).value
        ),
        totalFat: '0g',
        cholesterol: '0mg',
        sodium: '0mg',
        totalCarbohydrates: '0g',
        dietaryFiber: '0g',
        sugars: '0g',
        protein: '0g',
        potassium: '0mg',
        vitaminA: '0%',
        vitaminC: '0%',
        vitaminD: '0%',
        vitaminE: '0%',
        calcium: '0%',
        iron: '0%',
      },

      shippingDetails: {
        dimensionsLength: '7.38 inches',
        dimensionsWidth: '6.38 inches',
        dimensionsHeight: '2.3 inches',
        weight: '14 ounces',
      },
    };

    try {
      const response = await axios.post(
        'https://shastamart-api-deploy.vercel.app/api/products/insertProduct',
        data
      );
      console.log(response);
      addProductToast(productName, quantity);
      console.log('Order Submitted for ', productName, ' ', quantity);
      setReloadTrigger((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log('Component has re-rendered');
  }, [reloadTrigger]);
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
            <Table className="min-h-[20rem] min-w-[40rem] rounded-xl bg-cardwhite">
              <TableHeader>
                <TableRow>
                  <TableHead className="max-w-6">Name</TableHead>
                  <TableHead className="max-w-6">Store Stock</TableHead>

                  <TableHead className="max-w-7">Store Stock Status</TableHead>
                  <TableHead className="max-w-6">Value In Inventory</TableHead>
                  <TableHead className="max-w-6">Supplier Name</TableHead>
                  <TableHead className="max-w-6">Supplier Price</TableHead>
                  <TableHead className="max-w-7">
                    Supplier Stock Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow
                    key={index}
                    onClick={() => itemSelectHandler(product.productId)}>
                    <TableCell className="max-w-7">{product.name}</TableCell>
                    <TableCell className="max-w-6">{product.stock}</TableCell>
                    <TableCell className="max-w-6">
                      {product.stock > 10 ? (
                        <p className="text-lg text-green-400">Good</p>
                      ) : product.stock > 5 ? (
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
                      {product.supplierPrice.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
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
            <div className="mr-10 flex h-auto min-w-[40rem] max-w-[50rem] flex-col rounded-xl bg-cardwhite pb-10">
              <div className="flex flex-row">
                <div className="ml-10 mt-10 flex flex-col gap-10">
                  <div className="flex w-full flex-row justify-between gap-[10rem]">
                    <h1 className="flex text-4xl text-darkblue">
                      Total Supply
                    </h1>
                    <h1 className="text-right text-4xl text-darkblue">
                      {Object.values(products).reduce(
                        (total, product) => total + product.stock,
                        0
                      )}
                    </h1>
                  </div>
                  {/* BACKEND CALL TO CHECK IF THERE ARE < 5 OUT OF STOCK PRODUCTS IN THE DB */}
                  <div className="flex w-full flex-row justify-between gap-[10rem]">
                    <h1 className="text-4xl text-darkblue">Total Value</h1>
                    <h1 className="text-right text-4xl text-darkblue">
                      {Object.values(products)
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
                      {Object.values(products)
                        .reduce(
                          (total, product) =>
                            total + product.supplierPrice * product.stock,
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
                  <Button className=" flex h-[4rem] w-[30rem] flex-row self-center bg-darkblue text-lg">
                    Order Stock?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmitOrder}>
                    <DialogHeader>
                      <DialogTitle className="text-3xl">
                        Order Stock
                      </DialogTitle>
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
                          name="productName"
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
                          name="quantity"
                          placeholder="e.g. 10"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="submit">Submit Order</Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Button/Modal for adding a new product item */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className=" mt-6 flex h-[4rem] w-[30rem] flex-row self-center bg-darkblue text-lg">
                    Add New Product Item?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmitNewItem}>
                    <DialogHeader>
                      <DialogTitle className="text-3xl">
                        Insert New Product
                      </DialogTitle>
                      <DialogDescription className="text-lg">
                        Enter Product Name, Price, Portions, and Quantity of
                        Product, etc...
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Product Name
                        </Label>
                        <Input
                          id="productName"
                          name="productName"
                          placeholder="e.g. Fresh Strawberries"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                          Product Price
                        </Label>
                        <Input
                          id="price"
                          name="price"
                          placeholder=" e.g. $23.48"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                          Category
                        </Label>
                        <Select onValueChange={(e) => setSelectedCategory(e)}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a category"></SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="produce">Produce</SelectItem>
                              <SelectItem value="meat">Meat</SelectItem>
                              <SelectItem value="fish">Fish</SelectItem>
                              <SelectItem value="dairy">Dairy</SelectItem>
                              <SelectItem value="snacks">Snacks</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="portions" className="text-right">
                          Portions
                        </Label>
                        <Select onValueChange={(e) => setPortion(e)}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a portion size"></SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="lb.">lb.</SelectItem>
                              <SelectItem value="oz.">oz.</SelectItem>
                              <SelectItem value="item">item</SelectItem>
                              <SelectItem value="gal.">gal.</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stockquantity" className="text-right">
                          Stock Quantity
                        </Label>
                        <Input
                          id="stockquantity"
                          name="stockquantity"
                          placeholder="e.g. 10"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="suppliername" className="text-right">
                          Supplier Name
                        </Label>
                        <Input
                          id="suppliername"
                          name="suppliername"
                          placeholder="e.g. Berry Farms"
                          className="col-span-3"
                        />
                      </div>
                      <Separator />

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="supplierprice" className="text-right">
                          Supplier Price
                        </Label>
                        <Input
                          id="supplierprice"
                          name="supplierprice"
                          placeholder="e.g. $23.48"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="supplierstock" className="text-right">
                          Supplier Stock Quantity
                        </Label>
                        <Input
                          id="supplierstock"
                          name="supplierstock"
                          placeholder="e.g. 10"
                          className="col-span-3"
                        />
                      </div>
                      <Separator />
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="servingsize" className="text-right">
                          Serving Size
                        </Label>
                        <Input
                          id="servingsize"
                          name="servingsize"
                          placeholder="e.g. 3"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="servingspercontainer"
                          className="text-right">
                          Servings Per Container
                        </Label>
                        <Input
                          id="servingspercontainer"
                          name="servingspercontainer"
                          placeholder="e.g. 3"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="calories" className="text-right">
                          Calories
                        </Label>
                        <Input
                          id="calories"
                          name="calories"
                          placeholder="e.g. 3"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="productdescription"
                          className="text-right">
                          Product Description
                        </Label>
                        <Input
                          id="productdescription"
                          name="productdescription"
                          placeholder="Use a period and a space to separate details"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="submit">Add New Product</Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Add New Supplier */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className=" mt-6 flex h-[4rem] w-[30rem] flex-row self-center bg-darkblue text-lg">
                    Add New Supplier?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmitNewSupplier}>
                    <DialogHeader>
                      <DialogTitle className="text-3xl">
                        Add New Supplier
                      </DialogTitle>
                      <DialogDescription className="text-lg">
                        Enter supplier name and contact information below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="suppliername" className="text-right">
                          Supplier Name
                        </Label>
                        <Input
                          id="suppliername"
                          name="suppliername"
                          placeholder="e.g. Berry Farms"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="supplierphone" className="text-right">
                          Supplier Phone Number
                        </Label>
                        <Input
                          id="supplierphone"
                          name="supplierphone"
                          placeholder="e.g. 713 129 4839"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="streetaddress" className="text-right">
                          Street Address
                        </Label>
                        <Input
                          id="streetaddress"
                          name="streetadress"
                          placeholder="e.g. 123 Board St."
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="city" className="text-right">
                          City
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="e.g. Houston"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="state" className="text-right">
                          State
                        </Label>
                        <Select onValueChange={(e) => setSelectedState(e)}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {states.map((state, index) => (
                                <SelectItem key={index} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="zipcode" className="text-right">
                          Zip Code
                        </Label>
                        <Input
                          id="zipcode"
                          name="zipcode"
                          placeholder="e.g. 74778"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="submit">Add New Supplier</Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className=" mt-6 flex h-[4rem] w-[30rem] flex-row self-center bg-red-500 text-lg hover:bg-red-500/90">
                    Remove Product Item?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleRemoveProduct}>
                    <DialogHeader>
                      <DialogTitle className="text-3xl">
                        Remove Product Item
                      </DialogTitle>
                      <DialogDescription className="text-lg">
                        Enter Product Name Below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="productname" className="text-right">
                          Product Name
                        </Label>
                        <Input
                          id="productname"
                          name="productname"
                          placeholder="e.g. Fresh Strawberries"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="bg-red-500 hover:bg-red-500/90">
                            Remove Product Item
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will remove the selected product from
                              the databse.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <DialogClose asChild>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-500/90"
                                type="submit">
                                Confirm
                              </AlertDialogAction>
                            </DialogClose>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className=" mt-6 flex h-[4rem] w-[30rem] flex-row self-center bg-red-500 text-lg hover:bg-red-500/90">
                    Remove Supplier?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleRemoveSupplier}>
                    <DialogHeader>
                      <DialogTitle className="text-3xl">
                        Remove Supplier
                      </DialogTitle>
                      <DialogDescription className="text-lg">
                        Enter Supplier Name Below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="suppliername" className="text-right">
                          Supplier Name
                        </Label>
                        <Input
                          id="suppliername"
                          name="suppliername"
                          placeholder="e.g. Berry Farms"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="bg-red-500 hover:bg-red-500/90">
                            Remove Supplier
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will remove the selected supplier from
                              the databse.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <DialogClose asChild>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-500/90"
                                type="submit">
                                Confirm
                              </AlertDialogAction>
                            </DialogClose>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Popular Items */}
            <div className="">
              <div className="mr-10 mt-10 flex min-h-[20rem] min-w-14 flex-col gap-5 rounded-lg bg-cardwhite pt-5">
                <h1 className="text-center text-3xl font-medium">
                  Popular Items
                </h1>
                <div className="flex flex-row gap-5 self-start pl-10">
                  <Link to={'/product/' + popularItem1.productId}>
                    <img
                      className=" h-[10rem] w-[15rem] place-self-start rounded-xl object-cover"
                      src={popularItem1.image}></img>
                  </Link>
                  <div className="flex flex-col self-center">
                    <h1 className="flex flex-row text-3xl">
                      {popularItem1.name}
                    </h1>
                    {popularItem1.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }) +
                      ' per ' +
                      popularItem1.portion}
                  </div>
                </div>
                <div className="flex flex-row gap-5 self-start pb-12 pl-10">
                  <Link to={'/product/' + popularItem2.productId}>
                    <img
                      className="h-[10rem] w-[15rem] place-self-start rounded-xl object-cover"
                      src={popularItem2.image}
                    />
                  </Link>
                  <div className="flex flex-col self-center">
                    <h1 className="flex flex-row text-3xl">
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
