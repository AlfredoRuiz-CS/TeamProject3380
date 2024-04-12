import { useEffect } from 'react';
import { Button } from './ui/button.tsx';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { IoMdCart } from 'react-icons/io';
import { IoNotifications } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Imports for state management
import useUserStore from '@/components/store';
// import { devtools, persist } from "zustand/middleware";
import type {} from '@redux-devtools/extension'; // required for devtools typing

interface HeaderProps {
  color?: 'blue' | 'white';
}

const Header = (props: HeaderProps) => {
  const user = useUserStore();
  const navigate = useNavigate();
  // ! ADD BACKEND CALL TO DISPLAY THE NUMBER OF NOTIFICATIONS
  const notifNumber = 5;
  useEffect(() => {}, [user.loggedIn]);
  useEffect(() => {}, [user.cartItemsNumber]);

  let textColor = 'text-white';
  let borderColor = 'border-white';
  // Sets the default to white, unless the color props is set to blue
  if (props.color === 'blue') {
    textColor = 'text-primary';
    borderColor = 'border-primary';
  }

  function logoutHandler() {
    user.logout();
    logoutToast(() => navigate('/home'));
  }

  function logoutToast(onClose: () => void) {
    toast.success('You have been logged out successfully...', {
      position: 'bottom-right',
      className: 'font-bold text-black',
      autoClose: 1000,
      onClose: onClose,
    });
  }

  return (
    <>
      <div
        className={
          'flex h-16 w-full justify-between overflow-x-hidden bg-transparent font-inter ' +
          textColor
        }
      >
        {/* Logo */}
        <div className="pl-10 pt-5">
          <Link to="/">
            {props.color === 'blue' ? (
              <img src="/logos/logo_full_blue.svg" alt="ShastaMart Logo" />
            ) : (
              <img src="/logos/logo_full_white.svg" alt="ShastaMart Logo" />
            )}
          </Link>
        </div>

        {/* Links */}
        <div className="mr-10 flex h-full items-center justify-between text-center">
          <ul className="flex min-h-full flex-row justify-center gap-6 text-center">
            <li className="flex items-center justify-center">
              <Link to="/">Home</Link>
            </li>
            {/* If NOT a member display Membership link */}
            {!user.loggedIn ? (
              <li className="flex items-center justify-center">
                <Link to="/membership">Membership</Link>
              </li>
            ) : !user.isMember ? (
              <li className="flex items-center justify-center">
                <Link to="/membership">Membership</Link>
              </li>
            ) : user.loggedIn && user.accountType === 'employee' ? (
              <li className="flex items-center justify-center">
                <Link to="/admin">Dashboard</Link>
              </li>
            ) : (
              <></>
            )}

            <li className="flex items-center justify-center">
              <Link to="/products">Products</Link>
            </li>

            {/* If logged in display name and cart along with dropdown for dashboard*/}
            {user.loggedIn ? (
              <li className="flex items-center justify-center">
                {textColor === 'text-white' ? (
                  user.accountType === 'employee' ? (
                    // TODO: Add notification dropdown that links to the low supply sheet
                    <Link to="/admin" className="flex flex-row gap-1">
                      <p className="">{notifNumber}</p>
                      <IoNotifications size={20} color="white" />
                    </Link>
                  ) : (
                    <Link to="/cart" className="flex flex-row gap-1">
                      <p className="">{user.cartItemsNumber}</p>
                      <IoMdCart size={20} color="white" />
                    </Link>
                  )
                ) : user.accountType === 'employee' ? (
                  <Link to="/admin" className="flex flex-row gap-1">
                    <p className="">{notifNumber}</p>
                    <IoNotifications size={20} color="primary" />
                  </Link>
                ) : (
                  <Link to="/cart" className="flex flex-row gap-1">
                    <p className="">{user.cartItemsNumber}</p>
                    <IoMdCart size={20} color="primary" />
                  </Link>
                )}
              </li>
            ) : (
              <li className="flex items-center justify-center">
                <Button
                  asChild
                  variant="outline"
                  className={'bg-transparent ' + textColor + ' ' + borderColor}
                >
                  <Link to="/login">Login</Link>
                </Button>
              </li>
            )}
            {/* If User is logged in, display dropdown menu */}
            {user.loggedIn && !user.isAdmin ? (
              <li className="flex items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="focus-visible:ring-0">
                    <Button
                      variant="link"
                      size="sm"
                      className={
                        'p-0 text-[16px] font-normal focus-visible:ring-0 ' +
                        textColor
                      }
                    >
                      {user.fname}
                      <IoIosArrowDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link to="/orders">Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/list">My List</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <Link to="/profile">Profile</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logoutHandler}>
                      <Link to="/home">Logout</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : user.loggedIn && user.isAdmin ? (
              <li className="flex items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="focus-visible:ring-0">
                    <Button
                      variant="link"
                      size="sm"
                      className={
                        'p-0 text-[16px] font-normal focus-visible:ring-0 ' +
                        textColor
                      }
                    >
                      {user.fname}
                      <IoIosArrowDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link to="/orders">Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/suppliers">Suppliers</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <Link to="/profile">Profile</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logoutHandler}>
                      <Link to="/home">Logout</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : (
              <li className="flex items-center justify-center">
                <Button asChild className="">
                  <Link to="/register">Register</Link>
                </Button>
              </li>
            )}
          </ul>
          {/* <ToastContainer /> */}
        </div>
      </div>
    </>
  );
};

export default Header;
