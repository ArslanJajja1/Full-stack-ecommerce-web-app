import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const { Meta } = Card;
const SingleProduct = ({ product }) => {
    const { title, description, images, slug } = product;
    console.log(product);
    return (
        <>
            <div className="col-md-7">
                {images && images.length ? (
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        {images &&
                            images.map((image) => (
                                <img src={image.url} key={image.public_id} />
                            ))}
                    </Carousel>
                ) : (
                    <Card
                        cover={
                            <img
                                src={
                                    images && images.length
                                        ? images[0].url
                                        : laptop
                                }
                                className="mb-3 card-image"
                            />
                        }
                    ></Card>
                )}
            </div>
            <div className="col-md-5">
                <Card
                    actions={[
                        <>
                            <ShoppingCartOutlined className="text-success" />{" "}
                            <br />
                            Add To Cart
                        </>,
                        <Link to="/">
                            <HeartOutlined className="text-info" />
                            <br /> Add To Wishlist
                        </Link>,
                    ]}
                >
                    <Meta
                        title={title && title}
                        description={
                            description && description.substring(0, 150)
                        }
                    />
                    <p></p>
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
