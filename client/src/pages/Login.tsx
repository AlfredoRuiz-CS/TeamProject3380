import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
      <div>
        <Header />
        <form className="">
            <h1>Login</h1>
            <input className=""
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input className=""
              type="text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
        </form>
        <Footer />
      </div>
  );
};

export default Login;
