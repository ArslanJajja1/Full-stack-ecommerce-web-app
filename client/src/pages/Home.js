import React, { useEffect, useState } from "react";
import HomeBanner from "../components/Banner/HomeBanner";
import Jumbotron from "../components/cards/Jumbotron";
import LoadingCard from "../components/cards/LoadingCard";
import ProductCard from "../components/cards/ProductCard";
import CategoryList from "../components/category/CategoryList";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";
import SubList from "../components/sub/SubList";
import { getProducts } from "../functions/product";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Home = () => {
  const [smallDevice, setSmallDevice] = useState(false);
  const dimensions = useWindowDimensions();
  const handleWindowResize = () => {
    if (dimensions.width < 740) {
      setSmallDevice(true);
    } else {
      setSmallDevice(false);
    }
  };
  useEffect(() => {
    handleWindowResize();
  }, [dimensions]);
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        {/* <div className="jumbotron text-danger h1 font-weight-bold text-center ">
        <Jumbotron text={['Latest Products', 'Top Sellers', 'New Arrivals']} />
      </div> */}
        <HomeBanner />
        <div className={`mt-4 w-100`}>
          <NewArrivals deviceWidth={dimensions.width} />
        </div>
        <h4
          className={`${
            smallDevice ? "h4" : "display-3"
          }  text-center pb-3   my-5 text-white font-weight-bold font-italic mx-auto`}
          style={{
            letterSpacing: "3px",
            borderBottom: "5px solid #4db5ff",
            width: "fit-content",
          }}
        >
          Top Sellers
        </h4>
        <BestSellers deviceWidth={dimensions.width} />
        <h4
          className={`${
            smallDevice ? "h4" : "display-3"
          }  text-center pb-3   my-5 text-white font-weight-bold font-italic mx-auto`}
          style={{
            letterSpacing: "3px",
            borderBottom: "5px solid #4db5ff",
            width: "fit-content",
          }}
        >
          Categories
        </h4>
        <CategoryList smallDevice={smallDevice} />
        <h4
          className={`${
            smallDevice ? "h4" : "display-3"
          }  text-center pb-3   my-5 text-white font-weight-bold font-italic mx-auto`}
          style={{
            letterSpacing: "3px",
            borderBottom: "5px solid #4db5ff",
            width: "fit-content",
          }}
        >
          Sub Categories
        </h4>
        <SubList smallDevice={smallDevice} />
        <br />
        <br />
      </div>
    </>
  );
};

export default Home;
