import Header from '../components/Header';
import Footer from '../components/Footer';
import ErrorText from '../components/ErrorText';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import React, { ReactEventHandler, useState } from 'react';
import { Button } from '../components/ui/button.tsx';
import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useUserStore from '../components/store.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string().required('Phone number is required'),
  password: Yup.string()
    .matches(/^\d*$/, 'Phone number is not valid')
    .required('Password is required')
    .max(10),
});

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const setUserDetails = useUserStore((state) => state.setUserDetails);

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

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      streetAddress: '',
      city: '',
      state: '',
      zipcode: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post('/register', values)
      .then(response => {
        const userData = response.data;
        setUserDetails({
          loggedIn: true,
          fname: `${userData.fName}`,
          lname: `${userData.lName}`,
          email: `${userData.email}`,
          phone: `${userData.phoneNumber}`,
          address: { 
            street: `${userData.street}`,
            city: `${userData.city}`,
            state: `${userData.state}`,
            zip: `${userData.zipcode}`,
          }
        });
      });
    },
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.match(/^\d*$/)) {
      formik.setFieldValue('phone', value);
    }
  };

  const [message] = useTypewriter({
    words: ['Great finds, Great buys'],
    loop: true,
  });

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
        <Header />
        <form className="flex w-full flex-col items-center gap-5 py-5">
          <h1 className="mb-5 font-jua text-8xl">Register</h1>
          <a href="/login" className="mb-5 font-jua text-5xl text-darkblue">
            Already have an account?
          </a>
          <input
            className="mx-4 h-10 w-full max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="First name"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          <input
            className="mx-4 h-10 w-full max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          <input
            className="mx-4 h-10 w-full max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <input
            className="mx-4 h-10 w-full max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="Street address"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.streetAddress}
          />
          <input
            className="mx-4 h-10 w-full max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="City"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          <Select
            onValueChange={formik.handleChange}
            // defaultValue={store.address.state}
          >
            <SelectTrigger className="h-10 w-full max-w-md border bg-white border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue">
              <SelectValue
                // placeholder={store.address.state}
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
          {/* <input
            className="mx-4 h-10 w-full max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="State"
            name="state"
            onChange={formik.handleChange}
            value={formik.values.state}
          /> */}
          <input
            className="mx-4 h-10 w-full max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="Zipcode"
            name="zipcode"
            onChange={formik.handleChange}
            value={formik.values.zipcode}
          />
          <input
            className="mx-4 h-10 w-full max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
            type="tel"
            placeholder="Phone number"
            name="phone"
            onChange={handlePhoneChange}
            value={formik.values.phone}
          />
          {/* <ErrorMessage name="phone" component={ErrorText} /> */}
          <input
            className="mx-4 h-10 w-full max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <div className="mr-[310px] mt-[-14px] flex items-center">
            <input
              id="show-password"
              type="checkbox"
              className="mr-2"
              onChange={(e) => setIsPasswordVisible(e.target.checked)}
              checked={isPasswordVisible}
            />
            <label htmlFor="show-password" className="select-none">
              Show Password
            </label>
          </div>
          <Button asChild className="" size="lg">
            <p>Register</p>
          </Button>
        </form>
        <h2 className="flex items-center justify-center font-jua text-[64px]">
          {' '}
          {message}
          <span className="">
            <Cursor />
          </span>
        </h2>
      </div>
      <Footer />
    </>
  );
};

export default Register;
