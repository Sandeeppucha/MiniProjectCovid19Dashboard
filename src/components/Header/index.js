import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <div className="main-container">
    <nav className="navbar-container">
      <h1>
        <Link to="/" className="covid-logo">
          COVID19<span className="india">INDIA</span>
        </Link>
      </h1>
      <div className="nav-container">
        <Link to="/" className="home-nav-item">
          Home
        </Link>
        <Link to="/about" className="about-nav-item">
          About
        </Link>
      </div>
    </nav>
  </div>
)

export default Header
