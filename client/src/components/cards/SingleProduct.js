import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
    const { title, images, description, _id } = product;
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
                <Tabs>
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More Details" key="2">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Culpa rerum error veniam recusandae repellat in
                        magni inventore. Distinctio, sint omnis.
                    </TabPane>
                </Tabs>
            </div>
            <div className="col-md-5">
                <h2 className="bg-info p-3 text-white">{title && title}</h2>

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
                        <RatingModal>
                            <StarRatings
                                name={_id && _id}
                                numberOfStars={5}
                                rating={2}
                                changeRating={(newRating, name) =>
                                    console.log(
                                        "newRating,name",
                                        newRating,
                                        name
                                    )
                                }
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>,
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
