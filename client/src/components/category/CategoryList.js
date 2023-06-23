import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import laptopAvatar from "../../assets/images/laptop-avatar.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategoryList = ({ smallDevice }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);
  const showCategories = () =>
    categories.map((s) => {
      return (
        <Link
          to={`/category/${s.slug}`}
          key={s._id}
          className="col d-flex flex-column justify-content-center align-items-center items-center pointer"
        >
          <img
            style={
              smallDevice
                ? { width: "60px", height: "60px", borderRadius: "100%" }
                : { width: "100px", height: "100px", borderRadius: "100%" }
            }
            src={s.images.length > 0 ? s.images[0].url : laptopAvatar}
            alt=""
          />
          <p
            className={`${
              smallDevice && "fs-6"
            } text-white pt-2 text-uppercase font-weight-bold`}
          >{`${
            s.name.length > 10 ? `${s.name.substring(0, 10)}...` : s.name
          } `}</p>
        </Link>
      );
    });
  return (
    <div className="px-5 w-100 mx-auto">
      <div className="row d-flex justify-content-center flex-wrap">
        {loading ? (
          <h4 className="text-white">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
