import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import backgroundImageOne from "../../assets/images/bg-img-1.jpg";
import backgroundImageTwo from "../../assets/images/bg-img-2.jpg";
import backgroundImageThree from "../../assets/images/bg-img-3.jpg";
import backgroundImageFour from "../../assets/images/bg-img-4.jpg";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const HomeBanner = () => {
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
  const contentStyle = {
    height: "580px",
    minWidth: "100%",
    maxWidth: "100%",
    backgroundSize: "cover",
    backgroundPosition: "top",
  };
  return (
    <Carousel autoplay className="w-100" dots={false}>
      <div>
        <img
          src={backgroundImageFour}
          style={contentStyle}
          alt="backgroundImage"
        />
      </div>
      <div>
        <img
          src={backgroundImageTwo}
          style={contentStyle}
          alt="backgroundImage"
        />
      </div>

      <div>
        <img
          src={backgroundImageOne}
          style={contentStyle}
          alt="backgroundImage"
        />
      </div>
    </Carousel>
  );
};

export default HomeBanner;
