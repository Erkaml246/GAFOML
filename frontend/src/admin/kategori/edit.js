// KategoriEdit.j
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';

const KategoriEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { authToken } = useAuth();
  const [formData, setFormData] = useState({
    nama_kategori: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/kategori/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setFormData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching kategori:', error.response.data);
      }
    };

    fetchKategori();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Sedang menyimpan data...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/kategori-update/${id}`, formData,
        {   
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Berhasil memperbarui data.',
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate('/admin/kategori');
      }, 1000);
    } catch (error) {
      console.error('Error updating kategori:', error.response.data);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Terjadi kesalahan dalam memperbarui data!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-12 grid-margin stretch-card" style={{ marginTop: '80px' }}>
  <div className="card">
    <div className="card-body">
      <h4 className="card-title">Edit Kategori</h4>
      <p className="card-description">Edit data kategori</p>
      <form className="forms-sample">
        <div className="form-group">
          <label htmlFor="exampleInputName1" className="fw-bold">
            Nama Kategori
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            placeholder="Nama Kategori"
            name="nama_kategori"
            onChange={handleChange}
            value={formData.nama_kategori}
          />
        </div>
        <div className="form-group">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => navigate('/admin/kategori')}
          >
            <i className="bi bi-arrow-bar-left"></i>
            <span> Kembali</span>
          </button>
          <button
            type="button"
            className="btn btn-success ml-2"
            onClick={handleSubmit}
            disabled={loading}
            style={{ backgroundColor: "#071952", color: "#fff" }}
          >
            <i className="bi bi-file-earmark-check"></i>
            <span> Simpan</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default KategoriEdit;
