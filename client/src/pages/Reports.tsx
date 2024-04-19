import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from '@/components/ui/sheet';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { Label } from '@/components/ui/label';

interface SalesData {
  totalPurchases?: number;
  totalRefund?: number;
  totalPayout?: number;
  netAmount?: number;
}

interface InventoryData {
  productID?: number;
  productName?: string;
  totalQuantitySold?: number;
  totalGain?: number;
}

interface CustomerInsight {
  email?: string;
  fName?: string;
  lName?: string;
  numberOfOrder?: number;
  totalPurchaseValue?: number;
}

type ReportType = 'Sales' | 'Inventory' | 'CustomerInsight';
type SalesReport = 'Net Sales' | 'Best Sold Products' | 'Refunded Products' | 'Daily Gross Sales' | 'Weekly Gross Sales' | 'Monthly Gross Sales'
| 'Custom Gross Sales';
type InventoryReport = 'TotalInventory' | 'DailyInventory' | 'WeeklyInventory' | 'MonthlyInventory';
type CustomerInsightReport = 'AveragePurchaseValue' | 'MostPurchases' | 'LeastPurchases';

type EndpointMap = {
  [key in ReportType]: {
    [key in SalesReport | InventoryReport | CustomerInsightReport]?: string;
  };
};

const Reports = () => {
  // * VARIABLES SECTION * //
  // ? Data Report Type Selector
  const [selectedType, setSelectedType] = useState<ReportType | ''>('');
  const [selectedReport, setSelectedReport] = useState<SalesReport | InventoryReport | CustomerInsightReport | ''>('');
  const [isDateFilterVisible, setDateFilterVisible] = useState(false);
  const [salesReport, setSalesReport] = useState<SalesData[]>([]);
  const [inventoryReport, setInventoryReport] = useState<InventoryData[]>([]);
  const [customerInsightReport, setCustomerInsightReport] = useState<CustomerInsight[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  

  // ? Inventory Variables
  const [filteredInventory, setFilteredInventory] = useState([]);

  // ? Sales Variables

  // ? Customer Insight Variables

  // * FUNCTIONS SECTION * //
  // ? Inventory Functions
  // function selectInventoryHandler(e: any) {
  //   console.log('Inventory Selected', e);
  // }

  // ? Sales Functions

  // ? Customer Insight Functions

  // * USEEFFECT SECTION * //
  // ? Data Report Type Selector UseEffect
  useEffect(() => {}, [selectedType]);

  // ? Inventory UseEffect

  // ? Sales UseEffect

  // ? Customer Insight UseEffect

  // useEffect(() => {
  //   async function fetchData() {
  //     if (selectedType === 'Sales'){
  //       const salesData = await fetchSalesData();
  //       setSalesReport(salesData);
  //     } else if (selectedType === 'Inventory') {
  //       const inventoryData = await fetchInventoryData();
  //       setInventoryReport(inventoryData);
  //     } else if (selectedType === 'CustomerInsight') {
  //       const customerData = await fetchCustomerInsightData();
  //       setCustomerInsightReport(customerData);
  //     }
  //   }

  //   fetchData();
  // }, [selectedType, selectedReport])

  const handleTypeChange = (e: any) => {
    const value = e as ReportType;
    setSelectedType(value);
  };

  const handleSalesReportChange = (e: any) => {
    const value = e as SalesReport;
    setSelectedReport(value);
  }

  const handleInventoryReportChange = (e: any) => {
    const value = e as InventoryReport;
    setSelectedReport(value);
  }

  const handleCustomerInsightReportChange = (e: any) => {
    const value = e as CustomerInsightReport;
    setSelectedReport(value);
  }

  const endpointMap : EndpointMap = {
    Sales: {
      "Net Sales": "https://shastamart-api-deploy.vercel.app/api/reports/netSaleCustomD",
      "Best Sold Products": "https://shastamart-api-deploy.vercel.app/api/reports/bestSoldItems",
      "Refunded Products":"https://shastamart-api-deploy.vercel.app/reports/refundCustomD",
      "Daily Gross Sales": "https://shastamart-api-deploy.vercel.app/api/reports/grossSaleD",
      "Weekly Gross Sales": "https://shastamart-api-deploy.vercel.app/api/reports/grossSaleW",
      "Monthly Gross Sales": "https://shastamart-api-deploy.vercel.app/api/reports/grossSaleM",
      "Custom Gross Sales": "https://shastamart-api-deploy.vercel.app/api/reports/grossSaleCustomD",
    },
    Inventory: {
      "TotalInventory": "https://shastamart-api-deploy.vercel.app/api/reports/",
      "DailyInventory": "https://shastamart-api-deploy.vercel.app/api/reports/",
      "WeeklyInventory": "https://shastamart-api-deploy.vercel.app/api/reports/",
      "MonthlyInventory": "https://shastamart-api-deploy.vercel.app/api/reports/"
    },
    CustomerInsight: {
      "AveragePurchaseValue": "https://shastamart-api-deploy.vercel.app/api/reports/avgValueCustomD",
      "MostPurchases": "https://shastamart-api-deploy.vercel.app/api/reports/mostPurchaseCustomD",
      "LeastPurchases": "https://shastamart-api-deploy.vercel.app/api/reports/leastPurchaseCustomD"
    }
  };

  const generateReport = async () => {
    const endpoint = selectedType && selectedReport
  ? (endpointMap[selectedType] as Record<string, string>)[selectedReport]
  : undefined;

    if (!endpoint) {
      console.error('No endpoint found for the selected report.');
      return;
    }
    console.log(startDate, endDate);

    try {
      const response = await axios.post(endpoint, {
        startDate: startDate,
        endDate: endDate,
      });
      console.log(response.data);
      switch (selectedType) {
        case 'Sales':
          setSalesReport(response.data);
          break;
        case 'Inventory':
          setInventoryReport(response.data);
          break;
        case 'CustomerInsight':
          setCustomerInsightReport(response.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function renderReport(e: any) {
    switch (e) {
      //   * SAMPLE PAGE FOR THE REPORTS, EACH ONE NEEDS TO BE CUSTOMIZED
      case 'Inventory':
        return (
          <>
            <Table className="max-w-screen ml-0 rounded-lg bg-gray-50">
              <TableHeader>
                <TableRow>
                  <TableHead className="max-w-6 pl-6 text-gray-700">
                    Order Number
                  </TableHead>
                  <TableHead className="max-w-5 text-gray-700">Date</TableHead>
                  <TableHead className="max-w-5 text-gray-700">
                    Payment Method
                  </TableHead>
                  <TableHead className="max-w-5 text-gray-700">
                    Total Paid
                  </TableHead>
                  <TableHead className="max-w-5 text-gray-700">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={() => setFilteredInventory(item)}>
                    <TableCell className="max-w-6 pl-6">
                      {/* {item.orderID} */}
                    </TableCell>
                    <TableCell className="max-w-6">
                      {/* {item.orderDate} */}
                    </TableCell>
                    <TableCell className="max-w-6">
                      {/* {item.paymentMethod} */}
                    </TableCell>
                    <TableCell className="max-w-6">
                      {/* {item.total.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })} */}
                    </TableCell>
                    <TableCell className="max-w-6">
                      <span className="text-green-500">Paid</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        );
      case 'Sales':
        return <></>;
      case 'CustomerInsight':
        return <></>;
      default:
        return <></>;
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite font-inter text-black">
        <Header color="blue" />
        <div className="flex w-screen flex-col">
          <h1 className="ml-16 pt-14 font-inter text-5xl font-medium text-black">
            Data Report
          </h1>
          {/* Report Type Functionality */}
          <div className="mt-5 flex gap-2 place-self-start pb-5">
            <h3 className="ml-16 items-center place-self-center font-inter text-lg font-medium">
              Type:{' '}
            </h3>
            {/* Report dropdown */}
            <Select onValueChange={(e: ReportType) => setSelectedType(e)}>
              <SelectTrigger className="h-10 w-[10rem] bg-white text-black">
                <SelectValue placeholder="Select A Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sales">Sales Reports</SelectItem>
                <SelectItem value="Inventory">Inventory</SelectItem>
                <SelectItem value="CustomerInsight">Customer Insights</SelectItem>
              </SelectContent>
            </Select>
            {selectedType === 'Sales' ? (
              <>
                <h3 className="ml-10 items-center place-self-center font-inter text-lg font-medium">
                  Report:{' '}
                </h3>
                {/* Report dropdown */}
                <Select onValueChange={handleSalesReportChange}>
                  <SelectTrigger className="h-10 w-[10rem] bg-white text-black">
                    <SelectValue placeholder="Select A Report" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Net Sales">Net Sales</SelectItem>
                    <SelectItem value="Best Sold Products">Best Sold Products</SelectItem>
                    <SelectItem value="Refunded Products">Refunded Products</SelectItem>
                    <SelectItem value="Daily Gross Sales">Daily Gross Sales</SelectItem>
                    <SelectItem value="Weekly Gross Sales">Weekly Gross Sales</SelectItem>
                    <SelectItem value="Monthly Gross Sales">Monthly Gross Sales</SelectItem>
                    <SelectItem value="Custom Gross Sales">Custom Gross Sales</SelectItem>
                    <SelectItem value="Daily Gross Sales">Daily Gross Sales</SelectItem>
                    <SelectItem value="Daily Membership Sales">Daily Membership Sales</SelectItem>
                    <SelectItem value="Weekly Membership Sales">Weekly Membership Sales</SelectItem>
                    <SelectItem value="Monthly Membership Sales">Monthly Membership Sales</SelectItem>
                    <SelectItem value="Daily Refunds">Daily Refunds</SelectItem>
                    <SelectItem value="Weekly Refunds">Weekly Refunds</SelectItem>
                    <SelectItem value="Monthly Refunds">Monthly Refunds</SelectItem>
                  </SelectContent>
                </Select>
              </>
              ) : selectedType === 'Inventory' ? (
                <>
                <h3 className="ml-10 items-center place-self-center font-inter text-lg font-medium">
                  Report:{' '}
                </h3>
                {/* Report dropdown */}
                <Select onValueChange={handleInventoryReportChange}>
                  <SelectTrigger className="h-10 w-[10rem] bg-white text-black">
                    <SelectValue placeholder="Select A Report" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TotalInventory">Total Inventory</SelectItem>
                    <SelectItem value="DailyInventory">Daily Inventory</SelectItem>
                    <SelectItem value="WeeklyInventory">Weekly Inventory</SelectItem>
                    <SelectItem value="MonthlyInventory">Monthly Inventory</SelectItem>
                  </SelectContent>
                </Select>
              </>
              ) : selectedType === 'CustomerInsight' ? (
                <>
                <h3 className="ml-10 items-center place-self-center font-inter text-lg font-medium">
                  Report:{' '}
                </h3>
                {/* Report dropdown */}
                <Select onValueChange={handleCustomerInsightReportChange}>
                  <SelectTrigger className="h-10 w-[10rem] bg-white text-black">
                    <SelectValue placeholder="Select A Report" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AveragePurchaseValue">Average Purchase Value</SelectItem>
                    <SelectItem value="MostPurchases">Most Purchases</SelectItem>
                    <SelectItem value="LeastPurchases">Least Purchases</SelectItem>
                  </SelectContent>
                </Select>
              </>
              ) : <></>
            }
          </div>
          {selectedType !== '' ? (
            <> 
              <div className="mt-1 flex gap-2 place-self-start pb-5">
                <label htmlFor="start-date" className="ml-16 items-center place-self-center font-inter text-lg font-medium">Start Date:</label>
                <input
                  className="h-10 w-[10rem] bg-white text-black rounded-md border-2 border-solid"
                  type="date"
                  id="start-date"
                  name="start-date"
                  value={startDate}
                  onChange={(e) => {setStartDate(e.target.value)}}
                />

                <label htmlFor="end-date" className="ml-16 items-center place-self-center font-inter text-lg font-medium">End Date:</label>
                <input
                  className="h-10 w-[10rem] bg-white text-black rounded-md border-2 border-solid"
                  type="date"
                  id="end-date"
                  name="end-date"
                  value={endDate}
                  onChange={(e) => {setEndDate(e.target.value)}}
                />
                {selectedReport === ''}
                <Button
                    className="ml-5 self-center bg-blue-400 px-4 py-4 hover:bg-slate-600"
                    size="lg"
                    onClick={generateReport}>
                    Generate Report
                </Button>
              </div>
              {renderReport(selectedType)}
            </>
          ) : (
            <h1 className="text-center text-3xl font-medium">
              Please Select A Report
            </h1>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
  {
    /*             
          {sheetOpen ? (
            <div>
              <Sheet defaultOpen={true} onOpenChange={sheetCloseHandler}>
                <SheetContent side="right" className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Order #{selectedOrder}</SheetTitle>
                  </SheetHeader>
                  <SheetDescription asChild className="mb-3">
                    <div>
                      <div>Order Date: {orderToDisplay?.orderDate}</div>
                      <div>Payment Method: {orderToDisplay?.paymentMethod}</div>
                      <div>Order Status:</div>
                    </div>
                  </SheetDescription>
                  <Table className="ml-0 max-w-full rounded-lg bg-gray-50">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="max-w-6 pl-6 text-gray-700">
                          Product
                        </TableHead>
                        <TableHead className="max-w-5 text-gray-700">
                          Quantity
                        </TableHead>
                        <TableHead className="max-w-5 text-gray-700">
                          Price
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {orderToDisplay &&
                        orderToDisplay.items.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell className="max-w-6 pl-6">
                              {product.productName}
                            </TableCell>
                            <TableCell className="max-w-5">
                              {product.quantity}
                            </TableCell>
                            <TableCell className="max-w-5">
                              {product.totalAmount.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                      <Separator />
                      <TableRow>
                        <TableCell className="max-w-6 pl-6">Total</TableCell>
                        <TableCell
                          className=" max-w-9 p-0 pr-9 text-right"
                          colSpan={2}>
                          {orderToDisplay?.total.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <></>
          )} */
  }
};

export default Reports;
