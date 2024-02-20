import './Topbar.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Image, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Logo from '../Footer/foto/project-img3.png';
import { FaRightFromBracket, FaGear } from "react-icons/fa6";

import '../../admin/css/sb-admin-2.css';
import '../../admin/css/sb-admin-2.min.css';

const Topbar = () => {
  const navigate = useNavigate();
  const { logout, authToken, userName, fotoUser } = useAuth();

  const handleLogout = async () => {
      try {
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: {
          Authorization: `Bearer ${authToken}`,
          },
      });

      logout(); // Call the logout function from AuthContext
      navigate('/home'); // Redirect to /login on successful logout
      } catch (error) {
      console.error('Error during logout:', error);
      }
  };

  return (
    <div className=' mb-5'>
      <nav className="navbar sticy-top navbar-expand-lg navbar-dark" style={{ backgroundColor: '#071952' }}>
        <div className="container">
          <div className="navbar-brand d-flex align-items-center">
              <img src={Logo} alt="Logo" style={{ height: '55px', marginRight: '15px' }} />
              <div>
                  <h3 className="m-0">GAFOML</h3>
              </div>
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-center d-flex justify-content-center align-items-center" fixed="top">
              {authToken ? (
                <Dropdown>
                  <Dropdown.Toggle variant="white" size="sm" id="userDropdown" className="text-dark fw-bold text-decoration-none border-0">
                    <span className='text-white mr-2'>{userName}</span>
                    <Image className="img-profile rounded-circle mr-2" width={32} height={32} src={`http://localhost:8000/files/` + fotoUser} alt="profile" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/admin" className='text-dark text-decoration-none'>
                      <FaGear className="mr-2"/>Settings
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout} className='text-dark text-decoration-none'>
                      <FaRightFromBracket className="mr-2"/> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link to="/login" className='text-white text-decoration-none border-0'>
                  Login
                </Link>

              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </nav>
      
    </div>
  )
}

export default Topbar