import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { useState } from 'react';
import { Button } from "../components/ui/button.tsx";

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [message] = useTypewriter({
    words: ['Great finds, Great buys'],
    loop: true
  });

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-poppins text-black">
      <Header />
      <form className="flex flex-col items-center w-full gap-5 py-5">
          <h1 className="text-8xl font-jua mb-6">Register</h1>
          <a href="/login" className="font-jua text-5xl mb-6 text-darkblue">Already have an account?</a>
          <input className="w-full max-w-md h-10 px-4 mx-4 rounded-md border border-gray-300 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <input className="w-full max-w-md h-10 px-4 mx-4 rounded-md border border-gray-300 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <input className="w-full max-w-md h-10 px-4 mx-4 rounded-md border border-gray-300 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input className="w-full max-w-md h-10 px-4 mx-4 rounded-md border border-gray-300 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <input className="w-full max-w-md h-10 px-4 mx-4 rounded-md border border-gray-300 focus:border-logoblue focus:ring-logoblue"
            type="tel"
            placeholder="Phone number"
            onChange={(e) => {
              if(e.target.value.match(/^\d*$/)){
                setPhone(e.target.value)
              }
            }}
            value={phone}
          />
          <input className="w-full max-w-md h-10 px-4 mx-4 rounded-md border border-gray-300 focus:border-logoblue focus:ring-logoblue"
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button asChild className="my-4" size="lg">
            <p>Register</p>
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

export default Register;
