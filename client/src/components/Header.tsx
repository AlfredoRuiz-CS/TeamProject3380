import { Button } from "./ui/button.tsx";

interface HeaderProps {
  loggedIn?: boolean;
  user?: string;
  cart?: number;
}

const Header = (props: HeaderProps) => {
  return (
    <>
      <div className="flex h-16 w-full justify-between bg-transparent font-poppins text-white">
        {/* Logo */}
        <div className="pl-10 pt-5">
          <a href="/home">
            <img src="./logos/logo_full_white.svg" alt="ShastaMart Logo" />
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

            <li className="flex items-center justify-center">
              <Button
                asChild
                variant="outline"
                className="bg-transparent text-white"
              >
                <a href="/login">Login</a>
              </Button>
            </li>

            <li className="flex items-center justify-center">
              <Button asChild className="">
                <a href="/register">Register</a>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
