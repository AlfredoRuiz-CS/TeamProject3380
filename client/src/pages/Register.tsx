import Header from '../components/Header';
import Footer from '../components/Footer';
// import ErrorText from '../components/ErrorText';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import React, { useState, useEffect } from 'react'; // reacteventhandler removed from imports
// import { Button } from '../components/ui/button.tsx';
import { useFormik } from 'formik'; // error message removed from imports
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
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object({
  fName: Yup.string().required('First name is required'),
  lName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  streetAddress: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipcode: Yup.string().required('Zipcode is required'),
  phoneNumber: Yup.string().matches(/^\d*$/, 'Phone number is not valid').required('Phone number is required').max(10),
  password: Yup.string().required('Password is required')
});

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const store = useUserStore();
  const setUserDetails = useUserStore((state) => state.setUserDetails);
  const navigate = useNavigate();


  const states = [
    "AL",
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
      email: '',
      fName: '',
      lName: '',
      phoneNumber: '',
      streetAddress: '',
      city: '',
      state: '',
      zipcode: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('Form submitted:', values);
      try {
        const response = await axios.post('http://localhost:4000/register', values);
        const userData = await response.data;
        setUserDetails({
          loggedIn: true,
          fname: userData.fName,
          lname: userData.lName,
          email: userData.email,
          phone: userData.phoneNumber,
          address: { 
            street: userData.streetAddress,
            city: userData.city,
            state: userData.state,
            zip: userData.zipcode,
          }
        });
        // navigate('/profile');
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    },
    // },
  });

  useEffect(() => {
    if (store.loggedIn) {
        console.log('User is loggin in...redirecting')
        navigate('/products');
    }
}, [store.loggedIn, navigate]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.match(/^\d*$/)) {
      formik.setFieldValue('phoneNumber', value);
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
        <form className="flex w-full flex-col items-center gap-5 py-5" onSubmit={formik.handleSubmit}>
          <h1 className="mb-5 font-jua text-8xl">Register</h1>
          <Link to="/login" className="mb-5 font-jua text-5xl text-darkblue">
            Already have an account?
          </Link>
          <input
            className="mx-4 h-10 w-full max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="First name"
            name="fName"
            onChange={formik.handleChange}
            value={formik.values.fName}
          />
          <input
            className="mx-4 h-10 w-full max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="Last name"
            name="lName"
            onChange={formik.handleChange}
            value={formik.values.lName}
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
            name="streetAddress"
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
            onValueChange={(value) => formik.setFieldValue('state', value)}
            defaultValue={store.address.state}
            name="state"
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
            name="phoneNumber"
            onChange={handlePhoneChange}
            value={formik.values.phoneNumber}
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
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 select-none" type="submit">
            <p>Register</p>
          </button>
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
