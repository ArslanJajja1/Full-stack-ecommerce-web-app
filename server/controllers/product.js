const Product = require("../models/Product");
const User = require("../models/User");
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
// exports.list = async (req, res) => {
//     try {
//         const { sort, order, limit } = req.body;
//         const products = await Product.find({})
//             .populate("category")
//             .populate("subs")
//             .sort([[sort, order]])
//             .limit(limit);
//         res.json(products);
//     } catch (error) {
//         console.log(error);
//     }
// };
// With Pagination
exports.list = async (req, res) => {
    try {
        const { sort, order, page } = req.body;
        const currentPage = page || 1;
        const perPage = 6;

        const products = await Product.find({})
            .skip((currentPage - 1) * perPage)
            .populate("category")
            .populate("subs")
            .sort([[sort, order]])
            .limit(perPage);
        res.json(products);
    } catch (error) {
        console.log(error);
    }
};
exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount();
    res.json(total);
};
exports.productStar = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;

    // who is updating?
    // check if currently logged in user have already added rating to this product?
    let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
    );

    // if user haven't left rating yet, push it
    if (existingRatingObject === undefined) {
        let ratingAdded = await Product.findByIdAndUpdate(
            product._id,
            {
                $push: { ratings: { star, postedBy: user._id } },
            },
            { new: true }
        ).exec();
        console.log("ratingAdded", ratingAdded);
        res.json(ratingAdded);
    } else {
        // if user have already left rating, update it
        const ratingUpdated = await Product.updateOne(
            {
                ratings: { $elemMatch: existingRatingObject },
            },
            { $set: { "ratings.$.star": star } },
            { new: true }
        ).exec();
        console.log("ratingUpdated", ratingUpdated);
        res.json(ratingUpdated);
    }
};

exports.listRelated = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    const related = await Product.find({
        _id: { $ne: product._id },
        category: product.category,
    })
        .limit(3)
        .populate("category")
        .populate("subs");
    res.json(related);
};
const handleQuery = async (req, res, query) => {
    const products = await Product.find({ $text: { $search: query } })
        .populate("category", "_id name")
        .populate("subs", "_id name");
    res.json(products);
};
const handlePrice = async (req, res, price) => {
    try {
        const products = await Product.find({
            price: {
                $gte: price[0],
                $lte: price[1],
            },
        })
            .populate("category", "_id name")
            .populate("subs", "_id name");
        res.json(products);
    } catch (error) {
        console.log(error);
    }
};
const handleCategory = async (req, res, category) => {
    try {
        const products = await Product.find({ category })
            .populate("category", "_id name")
            .populate("subs", "_id name");
        res.json(products);
    } catch (error) {
        console.log(error);
    }
};
const handleStar = (req, res, stars) => {
    Product.aggregate([
        {
            $project: {
                document: "$$ROOT",
                // title: "$title",
                floorAverage: {
                    $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
                },
            },
        },
        { $match: { floorAverage: stars } },
    ])
        .limit(12)
        .exec((err, aggregates) => {
            if (err) console.log("AGGREGATE ERROR", err);
            Product.find({ _id: aggregates })
                .populate("category", "_id name")
                .populate("subs", "_id name")
                .exec((err, products) => {
                    if (err) console.log("PRODUCT AGGREGATE ERROR", err);
                    res.json(products);
                });
        });
};
exports.searchFilters = async (req, res) => {
    const { query, price, category, stars } = req.body;
    if (query) {
        console.log("query", query);
        await handleQuery(req, res, query);
    }
    if (price !== undefined) {
        console.log("Price", price);
        await handlePrice(req, res, price);
    }
    if (category) {
        console.log("Price", price);
        await handleCategory(req, res, category);
    }
    if (stars) {
        console.log("Stars", stars);
        await handleStar(req, res, stars);
    }
};
