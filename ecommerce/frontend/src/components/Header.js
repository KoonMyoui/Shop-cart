import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="brand">
        <button onclick="openMenu()">
          &#9776;
        </button>
        <Link to="/">amazona</Link>
      </div>
      <div className="header-links">
        <a ><Link to="/cart">cart</Link></a>
        <a href="https://www.youtube.com/watch?v=z3Pzfi476HI">Sign In</a>
      </div>
    </header>
  );
}

export default Header;
