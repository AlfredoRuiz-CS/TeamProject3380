import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { useState } from 'react';
import { Button } from '../components/ui/button.tsx';

// Imports for state management
import userStore from '@/components/store.ts';
import type {} from '@redux-devtools/extension'; // required for devtools typing
// import { devtools, persist } from "zustand/middleware";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [message] = useTypewriter({
    words: ['Always Fresh, just for you'],
    loop: true,
  });

  // ? State management for login with Zustand
  // const { login } = useStore(userStore);
  // function loginHandler(e: any) {
  //   login(email);
  //   setEmail(e.target.value);
  // }
  const store = userStore();

  function updateUserInfo() {
    store.setUserName(email);
    store.login();
    // console.log(store.name, store.loggedIn);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Add calls to backend to check if user exists
    // TODO: If user exists, then update the userStore
    updateUserInfo();
  }

  // console.log(store.name);
  return (
    <>
      <div className="font-poppins flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite text-black">
        <Header />
        <form
          className="flex w-full flex-col items-center gap-5 py-5"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-10 font-jua text-8xl">Login</h1>
          <p className="mb-10 font-jua text-5xl">
            Don't have an account?{' '}
            <a href="/register" className="text-darkblue">
              Create One
            </a>
          </p>
          <input
            className="mx-4 h-10 w-full max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="mx-4 h-10 w-full max-w-md rounded-md border border-gray-300 px-4 focus:border-logoblue focus:ring-logoblue"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
          <Button className="my-6" size="lg" type="submit">
            Log in
          </Button>
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
