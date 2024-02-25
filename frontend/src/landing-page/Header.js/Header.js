import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Header = ({ popularImages }) => {
  const owlCarouselOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    items: 1,
    autoplay: true,
    animateOut: "fadeOut",
  };

  return (
    <div
      className="container-fluid header bg-white p-0 container"
      style={{ marginTop: "150px" }}
    >
      <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
        <div className="col-md-6 p-5 mt-lg-5">
          <h1
            className="display-5 animated fadeIn mb-4"
            style={{ fontWeight: "bold" }}
          >
            Temukan <span style={{ color: "#0D9276" }}>Keindahan</span> Dalam
            Setiap Frame
          </h1>
          <h6 className="animated fadeIn mb-4 pb-2">
            Jelajahi koleksi penuh makna dan saksikan momen-momen indah yang
            terabadikan dalam lensa kami
          </h6>
        </div>
        <div className="col-md-6 animated fadeIn">
          <OwlCarousel className="header-carousel" {...owlCarouselOptions}>
            {popularImages.map((image) => (
              <div key={image.id_gambar} className="owl-carousel-item">
                <img
                  src={`http://localhost:8000/files/` + image.gambar}
                  alt={`Popular ${image.id_gambar}`}
                  className="img-fluid"
                  style={{ maxHeight: "550px", maxWidth: "100%" }}
                />
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
};

export default Header;
