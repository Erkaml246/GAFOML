import React, { useState, useEffect } from 'react';
import { Card, Spinner, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import Search from '../Search/Search.js';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import './Gallery.css';
import { MdOutlineCancel } from "react-icons/md";

const Gallery = ({ selectedCategory }) => {
  const { Id, authToken } = useAuth();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [likedImageIds, setLikedImageIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSort, setActiveSort] = useState('default');
  const [activePill, setActivePill] = useState('Semua');
  const [clickedImage, setClickedImage] = useState(null);


  const fetchData = async () => {
    try {
      let url = 'http://127.0.0.1:8000/api/gambar';
      if (selectedCategory !== "All") {
        url += `?kategori=${selectedCategory}`;
      }

      const likesUrl = `http://127.0.0.1:8000/api/like/${Id}`;

      const responseLikes = await fetch(likesUrl);
      if (!responseLikes.ok) {
        throw new Error('Likes network response was not ok');
      }
      const dataLikes = await responseLikes.json();

      const responseImages = await fetch(url);
      if (!responseImages.ok) {
        throw new Error('Images network response was not ok');
      }
      const dataImages = await responseImages.json();

      setImages(dataImages);
      setLikedImageIds(dataLikes.map((like) => Number(like.id_gambar)));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [Id, activeSort, selectedCategory]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleClick = (sortMethod) => {
    setShowMore(!showMore);
    setActiveSort(sortMethod === 'Semua' ? 'default' : sortMethod);
  };

  const handleLoveClick = async (imageId) => {
    try {
      const id_gambar = String(imageId);
      const id_user = String(Id);

        await fetch(`http://127.0.0.1:8000/api/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          id_gambar,
          id_user,
        }),
      });

      fetchData();
    } catch (error) {
      console.error('Error liking image:', error);
    }
  };

  const handleCancelLoveClick = async (imageId) => {
    try {
      const id_like = String(imageId);

      await fetch(`http://127.0.0.1:8000/api/like-delete/${id_like}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      fetchData();
    } catch (error) {
      console.error('Error canceling like:', error);
    }
  };

  const closePopup = () => {
    setClickedImage(null);
  };
  const handleImageClick = (image) => {
    // If the clickedImage state is the same as the clicked image, navigate to comment-gambar
    if (clickedImage && clickedImage.id_gambar === image.id_gambar) {
      window.location.href = `comment-gambar/${image.id_gambar}`;
    } else {
      // Update the state for the clicked image
      setClickedImage(image);
    }
  };  

  const sortedImages = images
    .filter((image) => image.nama_gambar.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (activeSort === 'Like Terbanyak') {
        return b.jumlah_like - a.jumlah_like;
      } else if (activeSort === 'Comment Terbanyak') {
        return b.jumlah_comment - a.jumlah_comment;
      } else {
        return 0; // Default sorting, no change
      }
    });

  const displayedImages = sortedImages.slice(0, showMore ? sortedImages.length : 10);

  return (
    <div className='mt-4 container'>
      <Search onSearch={handleSearch} /><br />

      <div className='row g-0 gx-5 align-items-end'>
        <div className='col-lg-6'>
          <div className='text-start mx-auto mb-5 wow slideInLeft' data-wow-delay='0.1s'>
            <h1 className='mb-3'>Foto</h1>
          </div>
        </div>
        <div className='col-lg-6 text-start text-lg-end wow slideInRight' data-wow-delay='0.1s'>
          <ul className='nav nav-pills d-inline-flex justify-content-end mb-5'>
            <li className='nav-item me-2'>
              <Link
                className={`btn btn-outline-dark ${activePill === 'Semua' ? 'active' : ''}`}
                onClick={() => {
                  setActivePill('Semua');
                  handleClick('Semua');
                }}>
                Semua
              </Link>
            </li>
            <li className='nav-item me-2'>
              <Link
                className={`btn btn-outline-dark ${activePill === 'Like Terbanyak' ? 'active' : ''}`}
                onClick={() => {
                  setActivePill('Like Terbanyak');
                  handleClick('Like Terbanyak');
                }}>
                Like Terbanyak
              </Link>
            </li>
            <li className='nav-item me-0'>
              <Link
                className={`btn btn-outline-dark ${activePill === 'Comment Terbanyak' ? 'active' : ''}`}
                onClick={() => {
                  setActivePill('Comment Terbanyak');
                  handleClick('Comment Terbanyak');
                }}>
                Comment Terbanyak
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {loading ? (
        <div className='text-center'>
          <Spinner animation='border' role='status'></Spinner>
        </div>
      ) : (
        <div>
          {displayedImages.length > 0 ? (
            <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 350: 2, 600: 3, 900: 4, 1200: 5 }}>
              <Masonry gutter='1px'>
                {displayedImages.map((image) => (
                  <div key={image.id_gambar} style={{ margin: '0 10px 20px 10px' }}>
                    <Card>
                      <Card.Body>
                          <div className='image-container'>
                          <div onClick={() => handleImageClick(image)}>
                            <img
                              src={`http://localhost:8000/files/` + image.gambar}
                              alt='gambar'
                              className='mb-1 clickable-image'
                              style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '3%' }}
                            />
                          </div>
                            {clickedImage && clickedImage.id_gambar === image.id_gambar && (
                              <Modal show={true} onHide={closePopup} dialogClassName="custom-modal" backdrop="static" keyboard={false} fade>
                                <Modal.Body className='text-center' style={{ alignItems: 'center' }}>
                                  <p className='fw-bold fs-5' style={{ color: '#fff' }}>{image.nama_gambar}</p>
                                  <img
                                    src={`http://localhost:8000/files/` + clickedImage.gambar}
                                    alt='popup-gambar'
                                    className='modal-image'
                                  />
                                  <p className='fs-5' style={{ color: '#fff', marginTop: '10px' }}>{image.deskripsi}</p>
                                  <MdOutlineCancel onClick={closePopup} size={32} style={{ cursor: 'pointer', color: '#fff', marginTop:'15px' }}/>
                                </Modal.Body>
                              </Modal>                          
                            )}
                            <div className='row mb-3' style={{ marginTop: '10px' }}>
                              <div className='col-2'>
                                <img
                                  src={`http://localhost:8000/files/` + image.foto_user}
                                  alt='foto_profil'
                                  className='img-profile rounded-circle'
                                  width={30} // ubah lebar foto profil sesuai kebutuhan
                                  height={30} // ubah tinggi foto profil sesuai kebutuhan
                                />
                              </div>
                              <div className='col-6 d-flex align-items-center' style={{ marginLeft: '10px' }}>{image.name}</div>
                            </div>
                          </div>

                        <p className='fw-bold fs-5'>{image.nama_gambar}</p>
                        
                        <div className='d-flex justify-content-between align-items-center'>
                          <div style={{ position: 'absolute', bottom: '0', right: '0', paddingRight: '10px', margin: '5px' }}> 
                            <i
                              className={`bi ${
                                likedImageIds.includes(image.id_gambar) ? 'bi-heart-fill text-danger' : 'bi-heart'
                              } bi-2x`}
                              style={{ cursor: authToken ? 'pointer' : 'default' }}
                              onClick={() => {
                                if (authToken) {
                                  if (likedImageIds.includes(image.id_gambar)) {
                                    handleCancelLoveClick(image.id_gambar);
                                  } else {
                                    handleLoveClick(image.id_gambar);
                                  }
                                }
                              }}
                            ></i> {image.jumlah_like}
                            <span className='ms-3'>
                              <Link
                                to={`comment-gambar/${image.id_gambar}`}
                                disabled={!authToken}
                                className='text-dark'
                              >
                                <i className='bi bi-chat-dots bi-2x'></i>
                              </Link> {image.jumlah_comment}
                            </span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          ) : (
            <div className='text-center'>
              <br />
              <p>Tidak Ada Gambar</p>
            </div>
          )}
        </div>
      )}

        {displayedImages.length > 8 && (
          <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
            <button className={`btn btn-dark py-3 px-5`} onClick={handleClick}>
              <p className='show-more'>
                {showMore ? 'Lebih Sedikit' : 'Lebih Banyak'}
              </p>
            </button>
          </div>
        )}

    </div>
  );
};

export default Gallery;
