import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.jpg";
const ProductCardInCheckout = ({ product }) => {
    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "100px", height: "auto" }}>
                        {product.images.length ? (
                            <ModalImage
                                small={product.images[0]}
                                large={product.images[0]}
                            />
                        ) : (
                            <ModalImage small={laptop} large={laptop} />
                        )}
                    </div>
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.brand}</td>
                <td>{product.color}</td>
                <td>{product.count}</td>
                <td>Shipping Icon</td>
                <td>Delete Icon</td>
            </tr>
        </tbody>
    );
};

export default ProductCardInCheckout;
