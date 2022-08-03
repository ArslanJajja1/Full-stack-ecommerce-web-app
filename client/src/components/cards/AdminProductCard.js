import React from "react";
import { Card } from "antd";
import laptop from "../../images/laptop.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Meta } = Card;

const AdminProductCard = ({ product }) => {
    const { title, description, images } = product;
    return (
        <Card
            cover={
                <img
                    src={images && images.length ? images[0].url : laptop}
                    style={{ height: "200px", objectFit: "cover" }}
                    className="p-1"
                />
            }
            actions={[
                <EditOutlined className="text-warning" />,
                <DeleteOutlined className="text-danger" />,
            ]}
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
