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

exports.read = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
        .populate("category")
        .populate("subs");
    res.json(product);
};
exports.update = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updated = await Product.findByIdAndUpdate(
            req.body._id,
            req.body,
            { new: true }
        ).exec();
        console.log("Product...", updated);
        res.json(updated);
    } catch (err) {
        console.log("PRODUCT UPDATE ERROR ----> ", err);
        // return res.status(400).send("Product update failed");
        res.status(400).json({
            err: err.message,
        });
    }
};
exports.list = async (req, res) => {
    try {
        const { sort, order, limit } = req.body;
        const products = await Product.find({})
            .populate("category")
            .populate("subs")
            .sort([[sort, order]])
            .limit(limit);
        res.json(products);
    } catch (error) {
        console.log(error);
    }
};
