// LandingPageAwal.js
import React, { useState } from 'react';
import Footer from "./Footer/Footer";
import Gallery from "./Gallery/Gallery";
import Kategori from "./Kategori/Kategori";
import HeaderMain from "./HeaderMain/HeaderMain";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const LandingPageAwal = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <HeaderMain/>
      <div >
        <Kategori onSelectCategory={handleSelectCategory} />
        <Gallery selectedCategory={selectedCategory} />
      </div>
      <Footer/>
    </div>
  )
}

export default LandingPageAwal;