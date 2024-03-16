import { Button } from "./ui/button.tsx";
import { IoMdCart } from "react-icons/io";
// Imports for state management
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface HeaderProps {
  loggedIn?: boolean;
  user?: string;
  cart?: number;
  color?: "blue" | "white";
}

const Header = (props: HeaderProps) => {
  return (
    <>
      <div className="font-poppins flex h-16 w-full justify-between overflow-x-hidden bg-transparent text-white">
        {/* Logo */}
        <div className="pl-10 pt-5">
          <a href="/home">
            {props.color === "blue" ? (
              <img src="./logos/logo_full_blue.svg" alt="ShastaMart Logo" />
            ) : (
              <img src="./logos/logo_full_white.svg" alt="ShastaMart Logo" />
            )}
          </a>
        </div>

        {/* Links */}
        <div className="flex h-full w-[22rem] items-center justify-between text-center">
          <ul className="flex min-h-full flex-row justify-center gap-6 text-center">
            <li className="flex items-center justify-center">
              <a href="/">Home</a>
            </li>

            <li className="flex items-center justify-center">
              <a href="/products">Products</a>
            </li>
            {/* If logged in display name and cart */}
            {props.loggedIn ? (
              <li className="flex items-center justify-center">
                <IoMdCart size={20} />
              </li>
            ) : (
              <li className="flex items-center justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent text-white"
                >
                  <a href="/login">Login</a>
                </Button>
              </li>
            )}
            {props.loggedIn ? (
              <li className="flex items-center justify-center">
                Hi, {props.user}!
              </li>
            ) : (
              <li className="flex items-center justify-center">
                <Button asChild className="">
                  <a href="/register">Register</a>
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
