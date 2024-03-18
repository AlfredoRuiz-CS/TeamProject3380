import Header from '../components/Header';
import Footer from '../components/Footer';
import ErrorText from '../components/ErrorText';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import React, { ReactEventHandler, useState } from 'react';
import { Button } from '../components/ui/button.tsx';
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string().matches(/^\d*$/, "Phone number is not valid").required("Password is required").max(10),
});

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phone: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
      <div className="font-poppins flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite text-black">
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
            placeholder="Address"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
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
            type={isPasswordVisible ? "text" : "password"}
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
