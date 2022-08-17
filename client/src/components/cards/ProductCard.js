import React from "react";
import { Card, Skeleton } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ProductCard = ({ product }) => {
    const { images, title, description, slug } = product;
    return (
        <Card
            style={{ minHeight: 300 }}
            cover={
                <img
                    src={images && images.length ? images[0].url : laptop}
                    style={{ height: "200px", objectFit: "cover" }}
                    className="p-1"
                />
            }
            actions={[
                <Link to={`/product/${slug}`}>
                    <EyeOutlined className="text-warning" /> <br />
                    View Product
                </Link>,
                <>
                    <ShoppingCartOutlined className="text-danger" /> <br />
                    Add To Cart
                </>,
            ]}
        >
            <Meta
                title={title}
                description={
                    description.length > 40
                        ? `${description.substring(0, 40)}...`
                        : description
                }
            />
        </Card>
    );
};

export default ProductCard;
