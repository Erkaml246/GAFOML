import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../auth/AuthContext";

const Kategori = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      Swal.fire({
        title: "Sabarr...",
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch("http://127.0.0.1:8000/api/kategori");
      const data = await response.json();
      Swal.close();

      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      Swal.close();
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    const result = await Swal.fire({
      title: "Apakah Anda Yakin?",
      text: "Data ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    });

    if (result.isConfirmed) {
      try {
        const deleteUrl = `http://127.0.0.1:8000/api/kategori-delete/${categoryId}`;

        await fetch(deleteUrl, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== categoryId)
        );

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Berhasil memperbarui data.",
          showConfirmButton: false,
        });

        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Respon tidak sesuai format yang diharapkan.",
        });
      }
    }
  };

  return (
    <div
      className="col-lg-12 grid-margin stretch-card"
      style={{ marginTop: "80px" }}
    >
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="card-title">Data Kategori</h4>
            <Link to="tambah" className="btn btn-dark btn-rounded btn-fw">
              <i className="fas fa-fw fa-plus"></i>
              <span> Tambah Data</span>
            </Link>
          </div>
          <br />
          <div className="table-responsive">
            {!loading ? (
              <table className="table table-hover">
                <thead className="table-primary">
                  <tr>
                    <th className="text-center">No</th>
                    <th>Nama Kategori</th>
                    <th>Tanggal Dibuat</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={`category-${index}`}>
                      <td className="text-center">{index + 1}</td>
                      <td>{category.nama_kategori}</td>
                      <td>
                        {new Date(category.created_at).toLocaleDateString()}
                      </td>
                      <td className="text-center">
                        <NavLink
                          to={`edit/${category.id_kategori}`}
                          className="mr-3"
                        >
                          <i className="bi bi-pen-fill text-warning"></i>
                        </NavLink>
                        |
                        <a
                          role="button"
                          className="ml-3"
                          onClick={() => handleDelete(category.id_kategori)}
                        >
                          <i className="bi bi-trash3-fill text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kategori;
