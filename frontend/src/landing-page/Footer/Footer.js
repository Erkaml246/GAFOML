import React from 'react';
import './Footer.css';
import Logo from './foto/project-img3.png'

const Footer = () => {
  return (
    <div className="container-fluid text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s" style={{ backgroundColor: '#071952' }}>
      <div className="container">
        <div className="copyright">
          <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <img src={Logo} alt="Logo" style={{ height: '40px', width: '40px', marginRight: '10px' }} />
            &copy; GAFOML, All Right Reserved.
          </div>
            <div className="col-md-6 text-center text-md-end mb-3 mb-md-0">
              <div className="footer-menu ">
                <a href="/">Home</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
