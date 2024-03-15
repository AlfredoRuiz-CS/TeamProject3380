import { Button } from "./ui/button.tsx";

const Header = () => {
  return (
    <>
      <div className="flex h-16 w-full justify-between bg-bgwhite font-poppins">
        {/* Logo */}
        <div className="pl-10 pt-5">
          <a href="/home">
            <img src="./logos/logo_full_blue.svg" alt="ShastaMart Logo" />
          </a>
        </div>

        {/* Links */}
        <div className="flex h-16 w-[20rem] items-center justify-between pr-10">
          <ul className="flex flex-row justify-center gap-5 text-center">
            <li>
              <a href="/">Home</a>
            </li>

            <li>
              <a href="/products">Products</a>
            </li>

            <li>
              <a href="/login">Login</a>
            </li>

            <li>
              <Button asChild>
                <a>Register</a>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
