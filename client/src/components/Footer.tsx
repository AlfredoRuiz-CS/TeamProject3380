const Footer = () => {
  return (
    <>
      <div className="flex min-h-20 w-screen flex-col items-center gap-5 overflow-y-hidden border-t bg-bgwhite pb-5">
        {/* Logo */}
        <div className="pl-10 pt-5">
          <a href="/home">
            <img src="./logos/logo_full_blue.svg" alt="ShastaMart Logo" />
          </a>
        </div>
        <div className="font-inter">
          Built and Designed by{" "}
          <span className="font-medium underline">Sage Turner</span>
          {", "}
          <span className="font-medium underline">Alfredo Ruiz</span>
          {", "}
          <span className="font-medium underline">Jamie Yanga</span>
          {", "}
          <span className="font-medium underline">Thinh Pham</span>
          {", and "}
          <span className="font-medium underline">Chinedu Okafor</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
