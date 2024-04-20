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

type SalesData = {
  totalPurchases?: string;
  totalRefund?: string;
  totalPayout?: string;
  netAmount?: string;
  categName?: string;
  productName?: string;
  totalQuantityReturned?: number;
  totalQuantitySold?: number;
  totalLoss?: number;
  totalGain?: number;
  totalMember?: number;
  totalMembershipSale?: number;
  totalAmount?: number;
};

type CustomerInsight = {
  email?: string;
  fName?: string;
  lName?: string;
  NumberOfOrder?: number;
  TotalPurchaseValue?: String;
  AveragePurchaseValue?: String;
};

type ReportType = 'Sales' | 'CustomerInsight';
type SalesReport =
  | 'Net Sales'
  | 'Most Sold Products'
  | 'Refunded Products'
  | 'Custom Gross Sales'
  | 'Custom Membership Sales';

type CustomerInsightReport = 'AveragePurchaseValue' | 'MostPurchases' | 'LeastPurchases';

type EndpointMap = {
  [key in ReportType]: {
    [key in SalesReport | CustomerInsightReport]?: string;
  };
};

const Reports = () => {
  // * VARIABLES SECTION * //
  // ? Data Report Type Selector
  const [selectedType, setSelectedType] = useState<ReportType | ''>('');
  const [selectedReport, setSelectedReport] = useState<
    SalesReport | CustomerInsightReport | ''
  >('');
  const [salesReport, setSalesReport] = useState<SalesData[]>([]);
  const [customerInsightReport, setCustomerInsightReport] = useState<CustomerInsight[]>(
    []
  );
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  useEffect(() => {}, [selectedType]);

  function capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSalesReportChange = (e: any) => {
    const value = e as SalesReport;
    setSelectedReport(value);
  };

  const handleCustomerInsightReportChange = (e: any) => {
    const value = e as CustomerInsightReport;
    setSelectedReport(value);
  };

  const endpointMap: EndpointMap = {
    Sales: {
      'Net Sales': 'https://shastamart-api-deploy.vercel.app/api/reports/netSaleCustomD',
      'Most Sold Products':
        'https://shastamart-api-deploy.vercel.app/api/reports/bestSoldItems',
      'Refunded Products':
        'https://shastamart-api-deploy.vercel.app/api/reports/mostRefundedItems',
      'Custom Gross Sales':
        'https://shastamart-api-deploy.vercel.app/api/reports/grossSaleCustomD',
      'Custom Membership Sales':
        'https://shastamart-api-deploy.vercel.app/api/reports/memberSaleCustomDate',
    },
    CustomerInsight: {
      AveragePurchaseValue:
        'https://shastamart-api-deploy.vercel.app/api/reports/avgValueCustomD',
      MostPurchases:
        'https://shastamart-api-deploy.vercel.app/api/reports/mostPurchaseCustomD',
      LeastPurchases:
        'https://shastamart-api-deploy.vercel.app/api/reports/leastPurchaseCustomD',
    },
  };

  const generateReport = async () => {
    setLoading(true);
    setReportGenerated(false);
    const endpoint =
      selectedType && selectedReport
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
      const responseData = response.data.result;
      console.log(response.data);
      switch (selectedType) {
        case 'Sales':
          if (selectedReport === 'Net Sales') {
            const mappedData = responseData.map((data: SalesData) => ({
              totalPurchases: data.totalPurchases || '0',
              totalRefund: data.totalRefund,
              totalPayout: data.totalPayout,
              netAmount: data.netAmount,
            }));
            setSalesReport(mappedData);
          } else if (selectedReport === 'Most Sold Products') {
            const mappedData = responseData.map((data: SalesData) => ({
              categName: capitalizeFirstLetter(data.categName),
              productName: data.productName,
              totalQuantitySold: data.totalQuantitySold,
              totalGain: data.totalGain,
            }));
            setSalesReport(mappedData);
          } else if (selectedReport === 'Refunded Products') {
            const mappedData = responseData.map((data: SalesData) => ({
              categName: capitalizeFirstLetter(data.categName),
              productName: data.productName,
              totalQuantityReturned: data.totalQuantityReturned,
              totalLoss: data.totalLoss,
            }));
            setSalesReport(mappedData);
          } else if (selectedReport === 'Custom Gross Sales') {
            const mappedData = responseData.map((data: SalesData) => ({
              totalPurchases: data.totalPurchases || '0',
            }));
            setSalesReport(mappedData);
          } else if (selectedReport === 'Custom Membership Sales') {
            const mappedData = responseData.map((data: SalesData) => ({
              totalMember: data.totalMember,
              totalMembershipSale: data.totalMembershipSale,
              totalAmount: data.totalAmount,
            }));
            setSalesReport(mappedData);
          }
          break;
        case 'CustomerInsight':
          if (selectedReport === 'AveragePurchaseValue') {
            const mappedData = responseData.map((data: CustomerInsight) => ({
              AveragePurchaseValue: data.AveragePurchaseValue || '0',
              email: data.email,
              fName: data.fName,
              lName: data.lName,
            }));
            setCustomerInsightReport(mappedData);
          } else if (selectedReport === 'MostPurchases') {
            const mappedData = responseData.map((data: CustomerInsight) => ({
              email: data.email,
              fName: data.fName,
              lName: data.lName,
              NumberOfOrder: data.NumberOfOrder,
              TotalPurchaseValue: data.TotalPurchaseValue || '0',
            }));
            setCustomerInsightReport(mappedData);
          } else if (selectedReport === 'LeastPurchases') {
            const mappedData = responseData.map((data: CustomerInsight) => ({
              email: data.email,
              fName: data.fName,
              lName: data.lName,
              NumberOfOrder: data.NumberOfOrder,
              TotalPurchaseValue: data.TotalPurchaseValue || '0',
            }));
            setCustomerInsightReport(mappedData);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setReportGenerated(true);
  };

  function renderReport(e: any) {
    switch (e) {
      case 'Sales':
        return (
          <>
            {selectedReport === 'Net Sales' ? (
              <>
                <Table className="max-w-screen ml-0 rounded-lg bg-gray-50">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="max-w-5 pl-5 text-gray-700">
                        Total Purchases
                      </TableHead>
                      <TableHead className="max-w-5 text-gray-700">
                        Total Refund
                      </TableHead>
                      <TableHead className="max-w-5 text-gray-700">
                        Total Payout
                      </TableHead>
                      <TableHead className="max-w-5 text-gray-700">Net Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(salesReport) &&
                      salesReport.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="max-w-6 pl-6">
                            {item.totalPurchases}
                          </TableCell>
                          <TableCell className="max-w-6">{item.totalRefund}</TableCell>
                          <TableCell className="max-w-6">{item.totalPayout}</TableCell>
                          <TableCell className="max-w-6">{item.netAmount}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </>
            ) : selectedReport === 'Most Sold Products' ? (
              <>
                <Table className="max-w-screen ml-0 rounded-lg bg-gray-50">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="max-w-5 pl-5 text-gray-700">
                        Category Name
                      </TableHead>
                      <TableHead className="max-w-5 text-gray-700">
                        Product Name
                      </TableHead>
                      <TableHead className="max-w-5 text-gray-700">
                        Total Quantity Sold
                      </TableHead>
                      <TableHead className="max-w-5 text-gray-700">Total Gain</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(salesReport) &&
                      salesReport.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="max-w-6 pl-5">
                            {item.categName}
                          </TableCell>
                          <TableCell className="max-w-6">{item.productName}</TableCell>
                          <TableCell className="max-w-6">
                            {item.totalQuantitySold}
                          </TableCell>
                          <TableCell className="max-w-6">
                            {item.totalGain?.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </>
            ) : selectedReport === 'Refunded Products' ? (
              <>
                <Table className="max-w-screen ml-0 rounded-lg bg-gray-50">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="max-w-5 pl-5 text-gray-700">
                        Category Name
                      </TableHead>
                      <TableHead className="max-w-5 text-gray-700">
                        Product Name
                      </TableHead>
                      <TableHead className="max-w-5 text-gray-700">
                        Total Quantity Returned
                      </TableHead>
                      <TableHead className="max-w-5 text-gray-700">Total Loss</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(salesReport) &&
                      salesReport.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="max-w-6 pl-6">
                            {item.categName}
                          </TableCell>
                          <TableCell className="max-w-6">{item.productName}</TableCell>
                          <TableCell className="max-w-6">
                            {item.totalQuantityReturned}
                          </TableCell>
                          <TableCell className="max-w-6">
                            {item.totalLoss?.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </>
            ) : selectedReport === 'Custom Gross Sales' ? (
              <>
                <Table className="max-w-screen ml-0 rounded-lg bg-gray-50">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center max-w-5 pl-5 text-gray-700">
                        Total Revenue
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(salesReport) &&
                      salesReport.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-center max-w-6 pl-6">
                            {item.totalPurchases}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </>
            ) : selectedReport === 'Custom Membership Sales' ? (
              <>
                <Table className="max-w-screen ml-0 rounded-lg bg-gray-50">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="max-w-5 text-center text-gray-700">
                        Total Amount of Members
                      </TableHead>
                      <TableHead className="max-w-5 text-center text-gray-700">
                        Total Memberships Purchased
                      </TableHead>
                      <TableHead className="max-w-5 text-center text-gray-700">
                        Total Membership Revenue
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(salesReport) &&
                      salesReport.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="max-w-5 text-center">
                            {item.totalMember}
                          </TableCell>
                          <TableCell className="max-w-5 text-center">
                            {item.totalMembershipSale}
                          </TableCell>
                          <TableCell className="max-w-5 text-center">
                            {item.totalAmount}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </>
            ) : (
              <></>
            )}
          </>
        );
        case 'CustomerInsight':
          return (
            <>
            {selectedReport === 'AveragePurchaseValue' ? (
              <>
                <Table className="max-w-screen ml-0 rounded-lg bg-gray-50">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="max-w-5 pl-5 text-gray-700">
                        Customer Email
                      </TableHead>
                      <TableHead className="max-w-5 text-gray-700">First Name</TableHead>
                      <TableHead className="max-w-5 text-gray-700">Last Name</TableHead>
                      <TableHead className="max-w-5 text-gray-700">
                        Average Purchase Value
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(customerInsightReport) &&
                      customerInsightReport.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="max-w-6 pl-6">{item.email}</TableCell>
                          <TableCell className="max-w-6">{item.fName}</TableCell>
                          <TableCell className="max-w-6">{item.lName}</TableCell>
                          <TableCell className="max-w-6">{item.NumberOfOrder}</TableCell>
                          <TableCell className="max-w-6">
                            {item.AveragePurchaseValue}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </>
            ) : selectedReport === 'MostPurchases' ? (
              <>
                <Table className="max-w-screen ml-0 rounded-lg bg-gray-50">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="max-w-5 pl-5 text-gray-700">
                        Customer Email
                      </TableHead>
                      <TableHead className="max-w-5 text-gray-700">First Name</TableHead>
                      <TableHead className="max-w-5 text-gray-700">Last Name</TableHead>
                      <TableHead className="max-w-5 text-gray-700">
                        Number of Orders
                      </TableHead>
                      <TableHead className="max-w-5 text-gray-700">
                        Total Purchase Value
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(customerInsightReport) &&
                      customerInsightReport.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="max-w-6 pl-6">{item.email}</TableCell>
                          <TableCell className="max-w-6">{item.fName}</TableCell>
                          <TableCell className="max-w-6">{item.lName}</TableCell>
                          <TableCell className="max-w-6">{item.NumberOfOrder}</TableCell>
                          <TableCell className="max-w-6">
                            {item.TotalPurchaseValue}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </>
            ) : selectedReport === 'LeastPurchases' ? (
              <>
                <Table className="max-w-screen ml-0 rounded-lg bg-gray-50">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="max-w-5 pl-5 text-gray-700">
                        Customer Email
                      </TableHead>
                      <TableHead className="max-w-5 text-gray-700">First Name</TableHead>
                      <TableHead className="max-w-5 text-gray-700">Last Name</TableHead>
                      <TableHead className="max-w-5 text-gray-700">
                        Number of Orders
                      </TableHead>
                      <TableHead className="max-w-5 text-gray-700">
                        Total Purchase Value
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(customerInsightReport) &&
                      customerInsightReport.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="max-w-6 pl-6">{item.email}</TableCell>
                          <TableCell className="max-w-6">{item.fName}</TableCell>
                          <TableCell className="max-w-6">{item.lName}</TableCell>
                          <TableCell className="max-w-6">{item.NumberOfOrder}</TableCell>
                          <TableCell className="max-w-6">
                            {item.TotalPurchaseValue}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </>
            ) : (
              <></>
            )}
          </>
        );
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
                    <SelectItem value="Most Sold Products">Most Sold Products</SelectItem>
                    <SelectItem value="Refunded Products">Refunded Products</SelectItem>
                    {/* <SelectItem value="Daily Gross Sales">Daily Gross Sales</SelectItem> */}
                    {/* <SelectItem value="Weekly Gross Sales">Weekly Gross Sales</SelectItem> */}
                    {/* <SelectItem value="Monthly Gross Sales">Monthly Gross Sales</SelectItem> */}
                    <SelectItem value="Custom Gross Sales">Gross Sales</SelectItem>
                    {/* <SelectItem value="Daily Membership Sales">Daily Membership Sales</SelectItem>
                    <SelectItem value="Weekly Membership Sales">Weekly Membership Sales</SelectItem>
                    <SelectItem value="Monthly Membership Sales">Monthly Membership Sales</SelectItem> */}
                    <SelectItem value="Custom Membership Sales">
                      Membership Sales
                    </SelectItem>
                    {/* <SelectItem value="Daily Refunds">Daily Refunds</SelectItem> */}
                    {/* <SelectItem value="Weekly Refunds">Weekly Refunds</SelectItem> */}
                    {/* <SelectItem value="Monthly Refunds">Monthly Refunds</SelectItem> */}
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
                    <SelectItem value="AveragePurchaseValue">
                      Average Purchase Value
                    </SelectItem>
                    <SelectItem value="MostPurchases">Most Purchases</SelectItem>
                    <SelectItem value="LeastPurchases">Least Purchases</SelectItem>
                  </SelectContent>
                </Select>
              </>
            ) : (
              <></>
            )}
          </div>
          {selectedType !== '' ? (
            <>
              <div className="mt-1 flex gap-2 place-self-start pb-5">
                <label
                  htmlFor="start-date"
                  className="ml-16 items-center place-self-center font-inter text-lg font-medium">
                  Start Date:
                </label>
                {selectedReport !== '' ? (
                  <input
                    className="h-10 w-[10rem] rounded-md border-2 border-solid bg-white text-black"
                    type="date"
                    id="start-date"
                    name="start-date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                    }}
                  />
                ) : (
                  <input
                    className="h-10 w-[10rem] rounded-md border-2 border-solid bg-white text-slate-400"
                    disabled
                    type="date"
                  />
                )}

                <label
                  htmlFor="end-date"
                  className="ml-10 items-center place-self-center font-inter text-lg font-medium">
                  End Date:
                </label>

                {selectedReport !== '' ? (
                  <input
                    className="h-10 w-[10rem] rounded-md border-2 border-solid bg-white text-black"
                    type="date"
                    id="end-date"
                    name="end-date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                    }}
                  />
                ) : (
                  <input
                    className="h-10 w-[10rem] rounded-md border-2 border-solid bg-white text-slate-400"
                    disabled
                    type="date"
                  />
                )}
                {selectedReport === ''}
                {selectedReport !== '' ? (
                  <Button
                    className="ml-5 self-center bg-blue-400 px-10 py-4 hover:bg-slate-600"
                    size="lg"
                    onClick={generateReport}>
                    Generate Report
                  </Button>
                ) : (
                  <Button
                    className="ml-5 self-center bg-slate-600 px-10 py-4"
                    size="lg"
                    disabled>
                    Generate Report
                  </Button>
                )}
              </div>
              {!loading && reportGenerated ? renderReport(selectedType) : null}
            </>
          ) : (
            <h1 className="text-center text-3xl font-medium">Please Select A Report</h1>
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
