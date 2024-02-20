import Comment from '../Comment/Comment';
import Topbar from '../Topbar/Topbar';
import './HeaderMain.css';
import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from '../Header.js/Header';


const HeaderMain = () => {

  const [popularImages, setPopularImages] = useState([]);

  useEffect(() => {
    const fetchPopularImages = async () => {
      try {
        // Fetch gallery data and calculate popular images based on likes
        // Replace the following with your actual data fetching logic
        const response = await fetch('http://127.0.0.1:8000/api/gambar');
        const data = await response.json();
        const popularImages = data.sort((a, b) => b.jumlah_like - a.jumlah_like).slice(0, 5);
        setPopularImages(popularImages);
      } catch (error) {
        console.error('Error fetching popular images:', error.message);
      }
    };

    fetchPopularImages();
  }, []);

  return (
    <div className='h_main'>
    <Topbar/>
      <Header popularImages={popularImages} />
      <Routes>
        {/* <Route index element={<Kategori/>} /> */}
        <Route path="comment-gambar/:id" element={<Comment/>} />
      </Routes>
    </div>
  )
}

export default HeaderMain