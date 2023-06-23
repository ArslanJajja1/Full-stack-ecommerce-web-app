import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // <!-- Remove the container if you want to extend the Footer to full width. -->
    <div className="mt-4">
      {/* <!-- Footer --> */}
      <footer
        className="text-center text-lg-start text-white pt-1"
        style={{ backgroundColor: "#2c2c6c", color: "white" }}
      >
        {/* <!-- Section: Links  --> */}
        <section className="">
          <div className="container text-center text-md-start mt-5">
            {/* <!-- Grid row --> */}
            <div className="row mt-3">
              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* <!-- Content --> */}
                <h6 className="text-uppercase fw-bold text-white">Ecommy</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "white",
                    height: "2px",
                  }}
                />
                <p>
                  At Ecommy, You will get best quality products of with
                  reasonable prices .Our motive is customer satisfaction
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold text-white">Products</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "white",
                    height: "2px",
                  }}
                />
                <p>
                  <Link to="/" className="text-white">
                    Home
                  </Link>
                </p>
                <p>
                  <Link to="/shop" className="text-white">
                    Products
                  </Link>
                </p>
                <p>
                  <Link to="/cart" className="text-white">
                    Cart
                  </Link>
                </p>
                <p>
                  <Link to="/user/wishlist" className="text-white">
                    Wishlist
                  </Link>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold text-white">
                  Useful links
                </h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "white",
                    height: "2px",
                  }}
                />
                <p>
                  <Link to="/user/history" className="text-white">
                    History
                  </Link>
                </p>
                <p>
                  <Link to="/user/password" className="text-white">
                    Password Update
                  </Link>
                </p>
                <p>
                  <Link to="/shop" className="text-white">
                    Shop
                  </Link>
                </p>
                <p>
                  <Link to="/cart" className="text-white">
                    Basket
                  </Link>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold text-white">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "white",
                    height: "2px",
                  }}
                />
                <p>Sargodha, Punjab, Pakistan</p>
                <p>info@example.com</p>
                <p>+ 01 234 567 88</p>
                <p>+ 01 234 567 89</p>
              </div>
              {/* <!-- Grid column --> */}
            </div>
            {/* <!-- Grid row --> */}
          </div>
        </section>
        {/* <!-- Section: Links  --> */}

        {/* <!-- Copyright --> */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright :
          <a
            className="text-white ml-1"
            href="https://www.youtube.com/@arslancodecorner"
          >
            Arslan Haroon
          </a>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
      {/* <!-- Footer --> */}
    </div>
  );
};

export default Footer;
