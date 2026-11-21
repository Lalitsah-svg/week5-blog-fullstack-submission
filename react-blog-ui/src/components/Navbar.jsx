import { NavLink } from "react-router";
function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="logo">
          <span className="logo-mark">B</span>
          <span>Briefly</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </nav>

        <div className="nav-status">
          <span className="status-dot"></span>
          Fresh stories
        </div>
      </div>
    </header>
  );
}

export default Navbar;
