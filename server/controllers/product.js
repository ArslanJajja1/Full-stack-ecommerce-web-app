const Product = require("../models/Product");
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        console.log("Product Body=> ", req.body);
        req.body.slug = slugify(req.body.title);
        const product = await new Product(req.body).save();
        res.status(200).json({
            success: true,
            data: product,
            message: "Product created successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Create Product Failed",
            error: error.message,
        });
    }
};

exports.read = async (req, res) => {
    let products = await Product.find({});
    res.json(products);
};
