import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Sonner } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Imports for state management
import useUserStore from '@/components/store';
import type {} from '@redux-devtools/extension'; // required for devtools typing
// import { Toaster } from 'sonner';
// import { devtools, persist } from "zustand/middleware";

// const validationSchema = Yup.object({
//   email: Yup.string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   password: Yup.string().required('Password is required'),
// });

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const setUserDetails = useUserStore((state) => state.setUserDetails);

  const [message] = useTypewriter({
    words: ['Always Fresh, just for you'],
    loop: true,
  });

  // ? State management for login with Zustand
  const store = useUserStore();
  const navigate = useNavigate();

  // function updateUserInfo() {
  //   store.setUserDetails();
  //   store.login();
  //   console.log(store);
  // }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('Form submitted:', values);
      try {
        const response = await axios.post('https://shastamart-api-deploy.vercel.app/api/users/login',values);
        const userData = await response.data;
        console.log(userData);
        store.login(userData.accountType === 'employee');
        setUserDetails({
          fname: userData.fName,
          lname: userData.lName,
          email: userData.email,
          phone: userData.phoneNumber,
          address: {
            street: userData.streetAddress,
            city: userData.city,
            state: userData.state,
            zip: userData.zipcode,
          },
          accountType: userData.accountType
        });
        // navigate('/profile');
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    },
    // },
  });
  // function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   // TODO: Add calls to backend to check if user exists
  //   // TODO: If user exists, then update the userStore
  //   updateUserInfo();
  //   navigate('/profile');
  // }

  useEffect(() => {
    if (store.loggedIn) {
      console.log('User is loggin in...redirecting');
      navigate('/products');
    }
  }, [store.loggedIn, navigate]);

  // console.log(store.name);
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
        <Header />
        <form
          className="flex w-full flex-col items-center gap-5 py-5"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="mb-10 font-jua text-8xl">Login</h1>
          <p className="mb-10 font-jua text-5xl">
            Don't have an account?{' '}
            <Link to="/register" className="text-darkblue">
              Create One
            </Link>
          </p>
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
            <label htmlFor="show-password" className="select-none text-[16px]">
              Show Password
            </label>
          </div>
          <button
            className="inline-flex h-10 select-none items-center justify-center whitespace-nowrap rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            type="submit"
          >
            <p>Log in</p>
          </button>
        </form>

        <h2 className="mb-32 flex items-center justify-center font-jua text-[64px]">
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

export default Login;
