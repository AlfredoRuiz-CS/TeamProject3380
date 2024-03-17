const GITHUB = {
  SAGE: "https://github.com/SageCT",
  ALFREDO: "https://github.com/AlfredoRuiz-CS",
  JAMIE: "https://github.com/pinkcowdev",
  THINH: "https://github.com/TylerP2405",
  CHINEDU: "https://github.com/Matrix1463",
};

const Footer = () => {
  return (
    <>
      <div className="flex min-h-20  flex-col items-center gap-5 overflow-x-hidden border-t bg-bgwhite pb-5">
        {/* Logo */}
        <div className="pl-10 pt-5">
          <a href="/home">
            <img src="./logos/logo_full_blue.svg" alt="ShastaMart Logo" />
          </a>
        </div>
        <div className="font-inter ">
          Built and Designed by{" "}
          <span className="font-medium underline">
            <a href={GITHUB.SAGE}>Sage Turner</a>
          </span>
          {", "}
          <span className="font-medium underline">
            <a href={GITHUB.ALFREDO}>Alfredo Ruiz</a>
          </span>
          {", "}
          <span className="font-medium underline">
            <a href={GITHUB.JAMIE}>Jamie Yanga</a>
          </span>
          {", "}
          <span className="font-medium underline">
            <a href={GITHUB.THINH}>Thinh Pham</a>
          </span>
          {", and "}
          <span className="font-medium underline">
            <a href={GITHUB.CHINEDU}>Chinedu Okafor</a>
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
