// UI Imports
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PaymentMethod from '@/components/PaymentMethod';
import { Button } from '@/components/ui/button';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { MdOutlinePayments } from 'react-icons/md';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

// Functionality Imports
import useUserStore from '@/components/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type ProfileSection = 'name' | 'email' | 'password' | 'phone' | 'address';

type ProfileData =
  | { currentEmail?: string; firstName: string; lastName: string }
  | { currentEmail?: string; email: string }
  | { currentEmail?: string; password: string }
  | { currentEmail?: string; phone: string }
  | {
      currentEmail?: string;
      street: string;
      city: string;
      state: string;
      zip: string;
    };
type PaymentMethod = {
  cardId?: number;
  nameOnCard: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardtype?: string;
};

const Profile = () => {
  const store = useUserStore();
  // const [state, setState] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const navigate = useNavigate();

  const dummyPaymentMethods: PaymentMethod[] = Array(5).fill({
    cardId: 1,
    nameOnCard: 'John Doe',
    cardNumber: '1234 5678 9012 3456',
    expirationDate: '01/23',
    cvv: '123',
  });
  dummyPaymentMethods[1] = {
    cardId: 2,
    nameOnCard: 'Jane Doe',
    cardNumber: '9876 5432 1098 7654',
    expirationDate: '12/34',
    cvv: '321',
  };
  dummyPaymentMethods[2] = {
    cardId: 3,
    nameOnCard: 'Philip Doe',
    cardNumber: '1234 5678 9012 3454',
    expirationDate: '01/23',
    cvv: '123',
  };
  const  [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const [paymentMethodSelected, setPaymentMethodSelected] =
    useState<PaymentMethod | null>(paymentMethods[0] || null);

  const states = [
    'AL',
    'AK',
    'AS',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FM',
    'FL',
    'GA',
    'GU',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MH',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'MP',
    'OH',
    'OK',
    'OR',
    'PW',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VI',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  const paymentForms = ['Debit', 'Credit'];

  function updateProfile(section: ProfileSection, data: ProfileData) {
    const endpointMap: { [K in ProfileSection]: string } = {
      name: 'https://shastamart-api-deploy.vercel.app/api/users/update_name',
      email: 'https://shastamart-api-deploy.vercel.app/api/users/update_email',
      password:
        'https://shastamart-api-deploy.vercel.app/api/users/update_password',
      phone: 'https://shastamart-api-deploy.vercel.app/api/users/update_phone',
      address:
        'https://shastamart-api-deploy.vercel.app/api/users/update_address',
    };

    const endpoint = endpointMap[section];
    if (endpoint) {
      // data.currentEmail = store.email;
      const token = localStorage.getItem('token');
      console.log(data);
      axios
        .post(endpoint, data, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          console.log(response.data);
          switch (section) {
            case 'name':
              store.setUserDetails({
                fname: response.data.fName,
                lname: response.data.lName,
              });
              break;
            case 'email':
              store.setUserDetails({
                email: response.data.email,
              });
              break;
            case 'phone':
              store.setUserDetails({
                phone: response.data.phone,
              });
              break;
            case 'address':
              store.setUserDetails({
                address: {
                  street: response.data.street,
                  city: response.data.city,
                  state: response.data.state,
                  zip: response.data.zipcode,
                },
              });
              break;
            default:
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleNameChange(firstName: string, lastName: string) {
    updateProfile('name', { firstName, lastName });
  }

  function handleEmailChange(email: string) {
    updateProfile('email', { email });
  }

  function handlePasswordChange(password: string) {
    updateProfile('password', { password });
  }

  function handlePhoneChange(phone: string) {
    updateProfile('phone', { phone });
  }

  function handleAddressChange(
    street: string,
    city: string,
    state: string,
    zip: string
  ) {
    updateProfile('address', { street, city, state, zip });
  }

  async function handleNewPayment(cardNumber: string, expirationDate: string, cvv: string, cardType: string){
    const data = {
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvv: parseInt(cvv, 10),
      cardType: cardType
    }
    const token = localStorage.getItem('token');
    console.log(data);
    const response = await axios.post('https://shastamart-api-deploy.vercel.app/api/users/set_card', data, { 
      headers: { Authorization: `Bearer ${token}` } })
    console.log(response.data);
  }

  function handleCollapsibleSelection(paymentMethod: PaymentMethod) {
    setPaymentMethodSelected(paymentMethod);
    setCollapsibleOpen(false);
  }

  function paymentMethodChanged() {
    toast.success(
      'Payment method ending in ' +
        paymentMethodSelected?.cardNumber.slice(-4) +
        ' selected.',
      {
        position: 'bottom-right',
        className: 'font-bold text-black',
      }
    );
  }

  // const accessFail = (onClose: () => void) =>
  //   toast.error('Please create an account or login.', {
  //     position: 'bottom-right',
  //     className: 'font-bold text-black',
  //     onClose: onClose,
  // });

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(
            'https://shastamart-api-deploy.vercel.app/api/users/verifySession',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log(response.data);
        } catch (error) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } else {
        navigate('/register');
      }
    };
    verifySession();
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("https://shastamart-api-deploy.vercel.app/api/users/payments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        const paymentData = await response.data;
        const transformedPayments = paymentData.map(
          (paymentMethod: PaymentMethod) => ({
            nameOnCard: store.fname + " " + store.lname,
            cardNumber: paymentMethod.cardNumber,
            expirationDate: paymentMethod.expirationDate,
            cvv: paymentMethod.cvv
        }))
        setPaymentMethods(transformedPayments);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPayments();
  }, [setPaymentMethods]);

  useEffect(() => {
    paymentMethodChanged();
  }, [paymentMethodSelected]);
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
        <Header />
        <div className="flex flex-grow flex-col items-center">
          <h1 className="flex flex-row self-center pt-28 font-jua text-6xl">
            {store.accountType.charAt(0).toUpperCase() +
              store.accountType.slice(1)}{' '}
            Profile
          </h1>
          <BsFillPersonLinesFill className="h-[20rem] w-[20rem]" />
          <div className=" pt-2 font-jua text-6xl">{store.fname}</div>

          {/* Member Since: AccountCreatedDate */}
          <div className="pb-6 pt-4 font-inter text-3xl">
            Member Since:{' '}
            {new Date(store.accountCreatedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          {/* Forms for Updating User Information */}
          <div className="z-10 mx-auto flex h-16 w-3/5 flex-row rounded-2xl bg-xanthousyellow">
            <MdOutlinePersonOutline className="ml-2 mt-1 flex h-14 w-14 self-start" />
            <h2 className="self-center pl-2 font-inter text-xl font-semibold">
              {store.email}
            </h2>
          </div>
          <div className="z-0 mx-auto -mt-8 mb-20 h-[45rem] w-3/5 rounded-3xl bg-darkblue">
            <div className="flex flex-row justify-around pt-4">
              <section className="flex flex-col">
                {/* Name, Phone Number, Address Fields */}
                <div className="flex flex-row">
                  {/* Name Fields */}
                  <div className="flex flex-col items-start">
                    <form
                      className="flex w-1/2 flex-col gap-0 pt-10"
                      onSubmit={(event) => {
                        event.preventDefault();
                        const form = event.target as HTMLFormElement;
                        const firstName = form.elements.namedItem(
                          'firstName'
                        ) as HTMLInputElement;
                        const lastName = form.elements.namedItem(
                          'lastName'
                        ) as HTMLInputElement;
                        handleNameChange(firstName.value, lastName.value);
                      }}
                    >
                      <h3 className="pl-4 text-lg font-semibold text-white">
                        First Name
                      </h3>
                      <input
                        className="mx-4 h-10 w-[15rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                        type="text"
                        placeholder={store.fname}
                        name="firstName"
                      />
                      <h3 className="pl-4 pt-2 text-lg font-semibold text-white">
                        Last Name
                      </h3>
                      <input
                        className="mx-4 h-10 w-[15rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                        type="text"
                        placeholder={store.lname}
                        name="lastName"
                      ></input>
                      <Button
                        className="ml-4 mt-3 self-start bg-slate-500 hover:bg-slate-600"
                        size="lg"
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </form>

                    {/* Phone Number Field */}
                    <form
                      className="flex flex-col gap-3 pt-10"
                      onSubmit={(event) => {
                        event.preventDefault();
                        const form = event.target as HTMLFormElement;
                        const phone = form.elements.namedItem(
                          'phone'
                        ) as HTMLInputElement;
                        handlePhoneChange(phone.value);
                      }}
                    >
                      <div className="flex flex-col items-start">
                        <h3 className="w-full pl-4 text-lg font-semibold text-white">
                          Phone Number
                        </h3>
                        <input
                          className="mx-4 h-10 w-[15rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                          type="tel"
                          placeholder={store.phone}
                          name="phone"
                        ></input>
                        <Button
                          className="ml-4 mt-3 self-start bg-slate-500 hover:bg-slate-600"
                          size="lg"
                          type="submit"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>

                    {/* Address Fields */}
                    <form
                      className="flex flex-col gap-3 pt-10"
                      onSubmit={(event) => {
                        event.preventDefault();
                        const form = event.target as HTMLFormElement;
                        const street = form.elements.namedItem(
                          'street'
                        ) as HTMLInputElement;
                        const city = form.elements.namedItem(
                          'city'
                        ) as HTMLInputElement;
                        const state = form.elements.namedItem(
                          'state'
                        ) as HTMLInputElement;
                        const zipcode = form.elements.namedItem(
                          'zipcode'
                        ) as HTMLInputElement;
                        handleAddressChange(
                          street.value,
                          city.value,
                          state.value,
                          zipcode.value
                        );
                      }}
                    >
                      <div className="flex flex-col items-start">
                        <h3 className="w-full pl-4 text-lg font-semibold text-white">
                          Address
                        </h3>
                        <div className="flex flex-row gap-2">
                          <input
                            className="ml-4 h-10 w-[15rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                            type="street"
                            placeholder={
                              store.address.street
                                ? store.address.street
                                : 'Address'
                            }
                            name="street"
                          ></input>
                          <Select
                            // onValueChange={(e) => setState(e)}
                            defaultValue={store.address.state}
                            name="state"
                          >
                            <SelectTrigger className="h-10 w-[5rem] flex-grow border-none bg-gray-200 text-gray-500">
                              <SelectValue
                                placeholder={store.address.state}
                                className="text-gray-200"
                              />
                            </SelectTrigger>
                            <SelectContent side="bottom">
                              {states.map((state, index) => (
                                <SelectItem key={index} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-row gap-2">
                          <input
                            className="ml-4 mt-2 h-10 w-[8rem] rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                            type="city"
                            placeholder={
                              store.address.city ? store.address.city : 'City'
                            }
                            name="city"
                          ></input>
                          <input
                            className="mt-2 h-10 w-[6.5rem] rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                            type="zipcode"
                            placeholder={
                              store.address.zip ? store.address.zip : 'Zip Code'
                            }
                            name="zipcode"
                          ></input>
                        </div>
                        <Button
                          className="ml-4 mt-3 self-start bg-slate-500 hover:bg-slate-600"
                          size="lg"
                          type="submit"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
              <section className="flex flex-col">
                <form
                  className=" flex w-1/2 flex-col pt-10"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const form = event.target as HTMLFormElement;
                    const email = form.elements.namedItem(
                      'email'
                    ) as HTMLInputElement;
                    handleEmailChange(email.value);
                  }}
                >
                  <h3 className="pl-4 text-lg font-semibold text-white">
                    Email
                  </h3>
                  <input
                    className="mx-4 h-10 w-[15rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                    type="text"
                    placeholder={store.email ? store.email : 'Email'}
                    name="email"
                  />
                  <Button
                    className="ml-4 mt-3 self-start bg-slate-500 hover:bg-slate-600"
                    size="lg"
                    type="submit"
                  >
                    Change Email
                  </Button>
                </form>
                <form
                  className="flex w-full flex-col pt-5"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const form = event.target as HTMLFormElement;
                    const password = form.elements.namedItem(
                      'password'
                    ) as HTMLInputElement;
                    handlePasswordChange(password.value);
                  }}
                >
                  <h3 className="mt-2 pl-4 text-lg font-semibold text-white">
                    Password
                  </h3>

                  <input
                    className="mx-4 h-10 w-[15rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder={'*'.repeat(10)}
                    name="password"
                  />
                  <div className="ml-4 flex w-full flex-row">
                    <input
                      id="show-password"
                      type="checkbox"
                      className="mr-2"
                      onChange={(e) => setIsPasswordVisible(e.target.checked)}
                      checked={isPasswordVisible}
                    />
                    <label
                      htmlFor="show-password"
                      className="w-full select-none text-white"
                    >
                      Show Password
                    </label>
                  </div>

                  <Button
                    className="ml-4 mt-3 self-start bg-slate-500 hover:bg-slate-600"
                    size="lg"
                    type="submit"
                  >
                    Change Password
                  </Button>
                </form>
              </section>
            </div>
          </div>
          {/* Payment Methods saved on profile */}

          {store.accountType === 'customer' && !store.isAdmin ? (
            <>
              <div className="z-10 mx-auto flex h-16 w-3/5 flex-row rounded-2xl bg-xanthousyellow">
                <MdOutlinePayments className="ml-4 mt-1 flex h-14 w-14 self-start" />
                <h2 className="self-center pl-2 font-inter text-xl font-semibold">
                  Payment Methods
                </h2>
              </div>
              <h2 className="self-center pl-2 font-inter text-xl font-semibold">
                OR
              </h2>
              <div className="z-0 mx-auto -mt-16 mb-[10rem] h-auto w-3/5 rounded-3xl bg-darkblue pb-10 pt-14">
                <div className="mx-auto w-full pt-5 text-center">
                  <section className="flex flex-col items-center">
                    <div className="flex flex-col">
                      <h3 className="pb-5 pl-4 text-lg font-semibold text-white">
                        Choose Existing Payment Method
                      </h3>
                      {/* Payment Method Component Map */}
                      <Collapsible
                        className="flex w-64 flex-col gap-2 place-self-center"
                        open={collapsibleOpen}
                        onOpenChange={setCollapsibleOpen}
                      >
                        <div className="flex w-auto items-center justify-between space-x-4 rounded-lg bg-cardwhite px-4 text-black">
                          <h4 className="h-10 text-sm font-semibold">
                            {'Card Name: ' +
                              paymentMethodSelected?.nameOnCard +
                              '\nLast 4 digits: ' +
                              paymentMethodSelected?.cardNumber.slice(-4)}
                          </h4>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-white/50"
                            >
                              <CaretSortIcon className="h-6 w-6 " />
                              <span className="sr-only">Toggle</span>
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        {paymentMethods.map((paymentMethod, index) => (
                          <CollapsibleContent
                            key={index}
                            className="space-y-2 duration-300 ease-in-out"
                            onClick={() =>
                              handleCollapsibleSelection(paymentMethod)
                            }
                          >
                            <PaymentMethod
                              key={index}
                              cardId={index + 1}
                              nameOnCard={paymentMethod.nameOnCard}
                              cardNumber={paymentMethod.cardNumber}
                              expirationDate={paymentMethod.expirationDate}
                            />
                          </CollapsibleContent>
                        ))}

                        <CollapsibleContent className="space-y-2"></CollapsibleContent>
                      </Collapsible>
                    </div>
                    <h3 className="my-2 pl-4 text-lg font-semibold text-white">
                      OR
                    </h3>
                    <form onSubmit={(event) => {
                      event.preventDefault();
                      const form = event.target as HTMLFormElement;
                      const cardNumber = form.elements.namedItem('cardNumber') as HTMLInputElement;
                      const expirationDate = form.elements.namedItem('expirationDate') as HTMLInputElement;
                      const cvv = form.elements.namedItem('cvv') as HTMLInputElement;
                      const cardType = form.elements.namedItem('cardType') as HTMLInputElement;
                      handleNewPayment(cardNumber.value, expirationDate.value, cvv.value, cardType.value)
                    }}>
                      <div className="flex flex-col items-start">
                        <h3 className="pl-4 text-lg font-semibold text-white">
                          Use New Payment Method
                        </h3>
                        <input
                          className="mx-4 h-10 w-[15rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                          type="text"
                          placeholder="Card Number"
                          name="cardNumber"
                        />
                        <input
                          className="mx-4 mt-2 h-10 w-[15rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                          type="text"
                          placeholder="Expiration Date"
                          name="expirationDate"
                        />
                        <input
                          className="mx-4 mt-2 h-10 w-[15rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                          type="text"
                          placeholder="CVV"
                          name="cvv"
                        />
                        <Select
                              defaultValue="Debit"
                              name="cardType"
                            >
                              <SelectTrigger className="mx-4 mt-2 h-10 w-[15rem] max-w-md rounded-md border bg-white border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue">
                                <SelectValue
                                  placeholder={"Card Type"}
                                  className="text-gray-200"
                                />
                              </SelectTrigger>
                              <SelectContent side="bottom">
                                {paymentForms.map((type, index) => (
                                  <SelectItem key={index} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                        <Button
                          className="ml-4 mt-3 self-start bg-slate-500 hover:bg-slate-600"
                          size="lg"
                          type="submit"
                        >
                          Add New Payment Method
                        </Button>
                      </div>
                    </form>
                  </section>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
