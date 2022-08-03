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

exports.listAll = async (req, res) => {
    let products = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate("category")
        .populate("subs")
        .sort([["createdAt", "desc"]]);
    res.json(products);
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Product.findOneAndRemove({
            slug: req.params.slug,
        });
        res.json(deleted);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Product delete failed");
    }
};
