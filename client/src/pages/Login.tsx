import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { useState } from 'react';
import { Button } from "../components/ui/button.tsx";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message] = useTypewriter({
    words: ['Always Fresh, just for you'],
    loop: true
  });

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-poppins text-black">
      <Header />
      <form className="flex flex-col items-center w-full gap-5 py-5">
          <h1 className="text-8xl font-jua mb-8">Login</h1>
          <p className="font-jua text-5xl mb-8">Don't have an account? <a href="/register" className="text-darkblue">Create One</a></p>
          <input className="w-full max-w-md h-10 px-4 mx-4 rounded-md border border-gray-300 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input className="w-full max-w-md h-10 px-4 mx-4 rounded-md border border-gray-300 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button asChild className="my-4" size="lg">
            <p>Log in</p>
          </Button>
      </form>
      <h2 className="flex items-center justify-center font-jua text-[64px]"> {message}
          <span className="">
              <Cursor />
          </span>
      </h2>
      <Footer />
    </div>
  )
};

export default Login;
