// UI Imports
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { MdOutlinePersonOutline } from 'react-icons/md';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Functionality Imports
import useUserStore from '@/components/store';
import { useState } from 'react';

const Profile = () => {
  const store = useUserStore();
  // const [state, setState] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  console.log(store);

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

  // function handleStateSelect() {
  //   console.log('State Selected: ', state);
  // }

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
          <div className="z-10 mx-auto flex h-16 w-2/5 flex-row rounded-2xl bg-xanthousyellow">
            <MdOutlinePersonOutline className="ml-2 mt-1 flex h-14 w-14 self-start" />
            <h2 className="self-center pl-2 font-inter text-xl font-semibold">
              {store.email}
            </h2>
          </div>
          <div className="z-0 mx-auto -mt-8 mb-[20rem] h-[45rem] w-2/5 rounded-3xl bg-darkblue">
            <div className="flex flex-row gap-32 pt-4">
              <section className="flex flex-col">
                {/* Name, Phone Number, Address Fields */}
                <div className="flex flex-row">
                  {/* Name Fields */}
                  <div className="flex flex-col items-start">
                    <form className="flex w-1/2 flex-col gap-0 pt-10">
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
                    <form className="flex flex-col gap-3 pt-10">
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
                    <form className="flex flex-col gap-3 pt-10">
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
                            name="phone"
                          ></input>
                          <Select
                            // onValueChange={(e) => setState(e)}
                            defaultValue={store.address.state}
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
                            type="city"
                            placeholder={
                              store.address.zip ? store.address.zip : 'City'
                            }
                            name="city"
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
                <form className=" flex w-1/2 flex-col pt-10">
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
                <form className="flex w-1/2 flex-col pt-5">
                  <h3 className="mt-2 pl-4 text-lg font-semibold text-white">
                    Password
                  </h3>

                  <input
                    className="mx-4 h-10 w-[15rem] max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder={
                      '*'.repeat(10)
                    }
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
                      className="select-none text-white"
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
