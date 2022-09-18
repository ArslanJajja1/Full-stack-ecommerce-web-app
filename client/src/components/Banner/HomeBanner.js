import React from 'react';
import { Carousel } from 'antd';
import backgroundImageOne from '../../assets/images/bg-img-1.jpg';
import backgroundImageTwo from '../../assets/images/bg-img-2.jpg';
import backgroundImageThree from '../../assets/images/bg-img-3.jpg';
import backgroundImageFour from '../../assets/images/bg-img-4.jpg';

const contentStyle = {
  height: '75vh',
  width: '100%',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',

  // background: '#364d79',
};

const HomeBanner = () => (
  <Carousel autoplay className="w-100" dots={false}>
    <div>
      <img src={backgroundImageOne} style={contentStyle} alt="backgroundImage" />
    </div>
    <div>
      <img src={backgroundImageTwo} style={contentStyle} alt="backgroundImage" />
    </div>
    <div>
      <img src={backgroundImageThree} style={contentStyle} alt="backgroundImage" />
    </div>
    <div>
      <img src={backgroundImageFour} style={contentStyle} alt="backgroundImage" />
    </div>
  </Carousel>
);

export default HomeBanner;
