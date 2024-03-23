import { Link } from 'react-router-dom';
const GITHUB = {
  SAGE: 'https://github.com/SageCT',
  ALFREDO: 'https://github.com/AlfredoRuiz-CS',
  JAMIE: 'https://github.com/pinkcowdev',
  THINH: 'https://github.com/TylerP2405',
  CHINEDU: 'https://github.com/Matrix1463',
};

const Footer = () => {
  return (
    <>
      <div className="flex min-h-20  flex-col items-center gap-5 overflow-x-hidden border-t bg-bgwhite pb-5">
        {/* Logo */}
        <div className="pl-10 pt-5">
          <Link to="/home">
            <img src="/logos/logo_full_blue.svg" alt="ShastaMart Logo" />
          </Link>
        </div>
        <div className="font-inter">
          Built and Designed by{' '}
          <span className="font-medium underline">
            <Link to={GITHUB.SAGE}>Sage Turner</Link>
          </span>
          {', '}
          <span className="font-medium underline">
            <Link to={GITHUB.ALFREDO}>Alfredo Ruiz</Link>
          </span>
          {', '}
          <span className="font-medium underline">
            <Link to={GITHUB.THINH}>Thinh Pham</Link>
          </span>
          {', '}
          <span className="font-medium underline">
            <Link to={GITHUB.CHINEDU}>Chinedu Okafor</Link>
          </span>
          {', and '}
          <span className="font-medium underline">
            <Link to={GITHUB.JAMIE}>Jamie Yanga</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
