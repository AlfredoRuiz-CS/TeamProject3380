import { Button } from "./ui/button.tsx";
import { IoMdCart } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu.tsx";

// Imports for state management
import { useStore, StoreApi } from "zustand";
import { UserState } from "./store.ts";
import { userStore } from "./store.ts";
// import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface HeaderProps {
  loggedIn?: boolean;
  user?: string;
  cart?: number;
  color?: "blue" | "white";
}

const Header = (props: HeaderProps) => {
  let textColor = "text-white";
  let borderColor = "border-white";
  // Sets the default to white, unless the color props is set to blue
  if (props.color === "blue") {
    textColor = "text-primary";
    borderColor = "border-primary";
  }

  if (userStore((state) => state.name) != "") {
    props.loggedIn = true;
    props.user = userStore((state) => state.name);
    props.cart = userStore((state) => state.cartItemsNumber);
  }

  function logoutHandler() {
    userStore((state) => state.logout);
  }

  return (
    <>
      <div
        className={
          "font-poppins flex h-16 w-full justify-between overflow-x-hidden bg-transparent " +
          textColor
        }
      >
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

            {/* If logged in display name and cart along with dropdown for dashboard*/}
            {props.loggedIn ? (
              <li className="flex items-center justify-center">
                {textColor === "text-white" ? (
                  <a href="/cart">
                    <IoMdCart size={20} color="white" />
                  </a>
                ) : (
                  <a href="/cart">
                    <IoMdCart size={20} color="primary" />
                  </a>
                )}
              </li>
            ) : (
              <li className="flex items-center justify-center">
                <Button
                  asChild
                  variant="outline"
                  className={"bg-transparent " + textColor + " " + borderColor}
                >
                  <a href="/login">Login</a>
                </Button>
              </li>
            )}
            {props.loggedIn ? (
              <li className="flex items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="focus-visible:ring-0">
                    <Button
                      variant="link"
                      size="sm"
                      className={
                        "p-0 text-[16px] font-normal focus-visible:ring-0 " +
                        textColor
                      }
                    >
                      {props.user}
                      <IoIosArrowDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <a href="/orders">Orders</a>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <a href="/list">My List</a>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <a href="/profile">Profile</a>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <a onClick={logoutHandler}>Logout</a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
