import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';
import laptopAvatar from '../../assets/images/laptop-avatar.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
var settings = {
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 3000,
  slickPause: false,
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);
  const showCategories = () => (
    <Slider {...settings} className="w-100">
      {categories.map((c) => {
        return (
          <div key={c._id} className="col d-flex flex-column justify-content-center align-items-center pointer">
            <img
              style={{ width: '100px', height: '100px', borderRadius: '100%' }}
              src={c.images.length > 0 ? c.images[0].url : laptopAvatar}
              alt=""
            />
            <h6 className="text-white pt-2 text-uppercase">{c.name}</h6>
          </div>
        );
      })}
    </Slider>
  );
  return (
    <div className="container">
      <div className="row">{loading ? <h4 className="text-center">Loading...</h4> : showCategories()}</div>
    </div>
  );
};

export default CategoryList;
