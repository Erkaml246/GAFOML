import { Card, Col, Row} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Comment.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";
import { useAuth } from '../../auth/AuthContext';
import Topbar from '../Topbar/Topbar';
import Footer from '../Footer/Footer';

const Comment = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState([]);
  const navigate = useNavigate();
  const { authToken, Id } = useAuth();

  const [formData, setFormData] = useState({
    isi_comment: '',
    id_gambar: id,
    id_user: Id
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await axios.post('http://127.0.0.1:8000/api/comment', formData,
        {   
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${authToken}`,
              },
            }
        );
        console.log('berhasil');
        fetchData();
        setFormData({
          isi_comment: '',
        });
    } catch (error) {
        console.error('Error:', error.response.data);        
    } finally {
        setLoading(false);
    }
};

  const fetchData = async () => {
    try {
      const responseImages = await axios.get(`http://127.0.0.1:8000/api/gambar/${id}`);
      const dataImages = responseImages.data;

      const responseComments = await axios.get(`http://127.0.0.1:8000/api/comment/${id}`);
      const dataComments = responseComments.data;
      
      setComment(dataComments);
      setImages(dataImages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Topbar />
    <div className="container">
      <div className="back-button-container">
        <Link to="/" className="back-button">
          <FaArrowLeft style={{ fontSize: '26px' }} />
        </Link>
      </div>
      <div className="fotodetail-container">
        <div className="photo-details">
          <div  className="foto-box" >
                <img
                  src={`http://localhost:8000/files/` + images.gambar}
                  alt="gambar"
                />
          </div>
          <div className="details-comment-box">
              <h3>{images.nama_gambar}</h3>
              <p style={{ marginTop:'10px' }}>{images.deskripsi}</p>
            <Col xs={12} md={16} className='comments-container'>komentar
              <Card className='h-100 comment-card'>
                <Card.Body>
                  <div className="comment-container">
                    {comment.map((comments) => {
                      // Mengonversi created_at menjadi objek Date
                      const createdAtDate = new Date(comments.created_at);

                      // Mendapatkan tanggal, bulan, dan tahun
                      const formatDate = createdAtDate.toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      });

                      return (
                        <div className="comment-box" key={comments.id}>
                          <div className="comment-content">
                            <p className="comment-text">{comments.isi_comment}</p>
                            <span className="comment-username">{comments.name}</span>
                          </div>
                          <div className="comment-date">
                            <p>{formatDate}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
              <Row className='justify-content-center'>
                <Col xs={12} md={16}>
                  <div className="new-comment-container">
                    <form onSubmit={handleSubmit} className="position-relative">
                      <div className="chat-input-container">
                        <input
                          type="text"
                          name='isi_comment'
                          className='chat-input no-border'
                          placeholder="Tambahkan Komentar..."
                          onChange={handleChange}
                          value={formData.isi_comment}
                        />
                        <button type="submit" className="btn btn-primary btn-sm chat-send-btn" style={{ cursor: "pointer" }}>
                          <FaPaperPlane style={{ alignItems: "center" }} />
                        </button>
                      </div>
                    </form>
                  </div>
                </Col>
              </Row>

            </Col>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
  
}

export default Comment;
