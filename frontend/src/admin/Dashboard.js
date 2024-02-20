import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

const Dashboard = () => {
    const [kategori, setKategori] = useState([]);
    const [gambar, setGambar] = useState([]);
    const { Id } = useAuth();

    useEffect(() => {
        fetchKategori();
        fetchGambar();
    }, []);

    const fetchKategori = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/kategori');
            setKategori(response.data.length); // Sesuaikan dengan struktur respons yang sesuai
        } catch (error) {
            console.error('Error fetching kategori:', error.message);
        }
    };

    const fetchGambar = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/gambar?id_user=' + Id);
            setGambar(response.data.length); // Sesuaikan dengan struktur respons yang sesuai
        } catch (error) {
            console.error('Error fetching gambar:', error.message);
        }
    };
    return (
        <div className="container-fluid" style={{ marginTop: '80px' }}>

            {/*  <!-- Content Row --> */}
            <div className="row">

                {/*  <!-- Earnings (Monthly) Card Example --> */}
                <div className="col-md-6 mb-4 stretch-card transparent">
                <div className="card card-dark-blue">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="mb-4">Jumlah Kategori</p>
                                    <p className="fs-30 mb-2">{kategori}</p>
                                    <p>Jumlah Album Saat Ini</p>
                                </div>
                                <div>
                                    <i className="bi bi-journal-album fs-3 text-white-900"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/*  <!-- Earnings (Monthly) Card Example --> */}
                <div className="col-md-6 mb-4 stretch-card transparent">
                    <div className="card card-tale" style={{ color: '#fff' }}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="mb-4">Jumlah Gambar</p>
                                         <p className="fs-30 mb-2">{gambar}</p>
                                         <p>Jumlah Gambar Yang Anda Unggah</p>
                                    </div>
                                    <div>
                                        <i className="bi bi-image fs-3 text-white-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                {/*  <!-- Earnings (Monthly) Card Example --> */}
                
            </div>

            {/*  <!-- Content Row --> */}

            

        </div>
    );
};

export default Dashboard;
