import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import { FaHome } from "react-icons/fa";

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { logout, userName, authToken, fotoUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo mr-5">
          <img src="images/logo-ukk.png" className="mr-2" />
        </a>
        <a className="navbar-brand brand-logo-mini" >
          <img src="images/logo-ukk-1.png" />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          onClick={onToggleSidebar}
          data-toggle="minimize"
        >
          <span className="icon-menu"></span>
        </button>

        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile dropdown">
            <a className="nav-link dropdown-toggle" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userName}</span>
                <img src={`http://localhost:8000/files/` + fotoUser} className="mr-2 img-profile rounded-circle" alt="profile" />
             </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
              <a className="dropdown-item" href="/home">
                <i className="text-primary">
                    <FaHome />
                </i>
                Home
              </a>
              <button type="button" className="dropdown-item" onClick={handleLogout}>
                <i className="ti-power-off text-primary"></i>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
