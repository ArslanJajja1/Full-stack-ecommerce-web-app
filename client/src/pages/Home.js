import React, { useEffect, useState } from 'react';
import HomeBanner from '../components/Banner/HomeBanner';
import Jumbotron from '../components/cards/Jumbotron';
import LoadingCard from '../components/cards/LoadingCard';
import ProductCard from '../components/cards/ProductCard';
import CategoryList from '../components/category/CategoryList';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import SubList from '../components/sub/SubList';
import { getProducts } from '../functions/product';

const Home = () => {
  return (
    <div className="w-100 homeContainer" style={{ overflowY: 'hidden' }}>
      {/* <div className="jumbotron text-danger h1 font-weight-bold text-center ">
        <Jumbotron text={['Latest Products', 'Top Sellers', 'New Arrivals']} />
      </div> */}
      <HomeBanner />
      <div className="mt-n4">
        <NewArrivals />
      </div>
      {/* <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron ">New Arrivals</h4>
      <NewArrivals />
      <br /> */}
      <h4
        className="text-center pb-3   my-5 display-3 text-white font-weight-bold font-italic mx-auto"
        style={{ letterSpacing: '3px', borderBottom: '5px solid #4db5ff', width: 'fit-content' }}
      >
        Top Sellers
      </h4>
      <BestSellers />
      <h4
        className="text-center pb-3   my-5 display-3 text-white font-weight-bold font-italic mx-auto"
        style={{ letterSpacing: '3px', borderBottom: '5px solid #4db5ff', width: 'fit-content' }}
      >
        Categories
      </h4>
      <CategoryList />
      <h4
        className="text-center pb-3   my-5 display-3 text-white font-weight-bold font-italic mx-auto"
        style={{ letterSpacing: '3px', borderBottom: '5px solid #4db5ff', width: 'fit-content' }}
      >
        Sub Categories
      </h4>
      <SubList />
      <br />
    </div>
  );
};

export default Home;
