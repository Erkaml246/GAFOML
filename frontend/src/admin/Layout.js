import React from 'react';
import Navbar from './Navbar'; // Sesuaikan path ke komponen Navbar Anda
import Sidebar from './Sidebar'; // Sesuaikan path ke komponen Sidebar Anda

const Layout = ({ children, isSidebarToggled, onToggleSidebar }) => {
    return (
        <div className="container-fluid">
            <Navbar onToggleSidebar={onToggleSidebar} />
            <div className="row">
                <Sidebar isToggled={isSidebarToggled} />
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
