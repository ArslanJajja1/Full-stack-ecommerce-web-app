import React from "react";
import { Card } from "antd";
const { Meta } = Card;

const AdminProductCard = ({ product }) => {
    const { title, description, images } = product;
    return (
        <Card
            cover={
                <img
                    src={images && images.length ? images[0].url : ""}
                    style={{ height: "150px", objectFit: "cover" }}
                    className="p-1"
                />
            }
        >
            <Meta
                title={title}
                description={
                    description.length > 70
                        ? `${description.substring(0, 70)}...`
                        : description
                }
            />
        </Card>
    );
};

export default AdminProductCard;
