import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    no_telpon: "",
    password: "",
    confirm_password: "",
    alamat: "",
    foto_user: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "foto_user") {
      const file = e.target.files[0];
      setSelectedImage(file);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const { password, confirm_password } = formData;
    if (e.target.name === "confirm_password" && password !== e.target.value) {
      setPasswordError("Password tidak cocok");
    } else {
      setPasswordError("");
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Sedang menyimpan data...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setLoading(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("username", formData.username);
      formDataObj.append("email", formData.email);
      formDataObj.append("no_telpon", formData.no_telpon);
      formDataObj.append("password", formData.password);
      formDataObj.append("confirm_password", formData.confirm_password);
      formDataObj.append("alamat", formData.alamat);
      formDataObj.append("foto_user", selectedImage);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil Register!",
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan dalam melakukan register!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src="images/logo-ukk.png" alt="logo" />
                </div>
                <h4>Daftar?</h4>
                <h6 className="font-weight-light">Isi beberapa form dibawah</h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                      className="form-control form-control-lg"
                      id="exampleInputUsername1"
                      placeholder="Nama"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      value={formData.username}
                      className="form-control form-control-lg"
                      id="exampleInputUsername1"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      name="no_telpon"
                      onChange={handleChange}
                      value={formData.no_telpon}
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="No Telpon"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handlePasswordChange}
                      value={formData.password}
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="confirm_password"
                      onChange={handlePasswordChange}
                      value={formData.confirm_password}
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Ulangi Password"
                      required
                    />
                    {passwordError && (
                      <span className="text-danger">{passwordError}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="alamat"
                      onChange={handleChange}
                      value={formData.alamat}
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Alamat"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Foto User</label>
                    <input
                      type="file"
                      name="foto_user"
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      required
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="btn btn-block btn-lg font-weight-medium auth-form-btn"
                      style={{ backgroundColor: "#071952", color: "white" }}
                    >
                      Register
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Sudah Punya Akun?{" "}
                    <Link to="/login" className="text-primary">
                      Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
