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
    const id = req.params.productId;
    try {
        const product = await Product.findById(id);
        const user = await User.findOne({ email: req.user.email });
        const { star } = req.body;
        // check user existing rating
        let existingRatingObject = product.ratings.find((rating) => {
            rating.postedBy.toString() === user._id.toString();
        });
        // user rating for first time, then
        if (existingRatingObject === undefined) {
            let ratingAdded = await Product.findByIdAndUpdate(
                product._id,
                {
                    $push: { ratings: { star, postedBy: user._id } },
                },
                { new: true }
            );
            console.log("Rating Added", ratingAdded);
            return res.json(ratingAdded);
        } else {
            // user updating its ratng , then
            const ratingUpdated = await Product.updateOne(
                {
                    rating: { $elemMatch: existingRatingObject },
                },
                { $set: { "ratings.$.star": star } },
                { new: true }
            );
            console.log("Rating Updated", ratingUpdated);
            return res.json(ratingUpdated);
        }
    } catch (error) {
        console.log(error);
    }
};
