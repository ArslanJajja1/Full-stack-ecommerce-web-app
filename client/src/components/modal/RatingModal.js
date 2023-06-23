import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="single_product_icons" /> <br />
        {user ? "Leave Rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review!");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
