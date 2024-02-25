import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isToggled, onToggleSidebar }) => {
    const sidebarClass = isToggled
        ? "sidebar sidebar-offcanvas toggled"
        : "sidebar sidebar-offcanvas";

    return (
        <nav className={sidebarClass} id="sidebar" style={{ marginTop: '50px' }} >
            <ul className="nav">
                <li className="nav-item">
                    <Link to="/admin" className="nav-link">
                        <i className="bi bi-speedometer2 menu-icon"></i>
                        <span className="menu-title">Dashboard</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to="kategori"
                        className="nav-link"
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="ui-basic"
                    >
                        <i className="bi bi-clipboard menu-icon"></i>
                        <span className="menu-title">Kategori</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to="gambar"
                        className="nav-link"
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="tables"
                    >
                        <i className="bi bi-image menu-icon"></i>
                        <span className="menu-title">Gambar</span>
                    </Link>
                </li>
            </ul>
      </nav>
    );
};

export default Sidebar;
