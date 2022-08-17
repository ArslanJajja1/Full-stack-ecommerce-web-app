import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
    const { price, category, subs, shipping, color, brand, sold, quantity } =
        product;
    return (
        <ul className="list-group">
            <li className="list-group-item">
                Price{" "}
                <span className="label label-default label-pill pull-xs-right">
                    $ {price && price}
                </span>
            </li>
            {category && (
                <li className="list-group-item">
                    Category{" "}
                    <Link
                        to={`/category/${category.slug}`}
                        className="label label-default label-pill pull-xs-right"
                    >
                        {category.name}
                    </Link>
                </li>
            )}
            {subs && (
                <li className="list-group-item">
                    Sub categories{" "}
                    {subs.map((sub) => (
                        <Link
                            key={sub._id}
                            to={`/subs/${sub.slug}`}
                            className="label label-default label-pill pull-xs-right"
                        >
                            {sub.name}
                        </Link>
                    ))}
                </li>
            )}
            {shipping && (
                <li className="list-group-item">
                    Shipping{" "}
                    <span className="label label-default label-pill pull-xs-right">
                        {shipping}
                    </span>
                </li>
            )}
            {color && (
                <li className="list-group-item">
                    Color{" "}
                    <span className="label label-default label-pill pull-xs-right">
                        {color}
                    </span>
                </li>
            )}
            {brand && (
                <li className="list-group-item">
                    Brand{" "}
                    <span className="label label-default label-pill pull-xs-right">
                        {brand}
                    </span>
                </li>
            )}
            {quantity && (
                <li className="list-group-item">
                    Available{" "}
                    <span className="label label-default label-pill pull-xs-right">
                        {quantity}
                    </span>
                </li>
            )}
            {sold > 0 && (
                <li className="list-group-item">
                    Sold{" "}
                    <span className="label label-default label-pill pull-xs-right">
                        {sold}
                    </span>
                </li>
            )}
        </ul>
    );
};

export default ProductListItems;
