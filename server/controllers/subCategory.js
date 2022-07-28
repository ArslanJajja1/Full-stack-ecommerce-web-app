const subCategory = require("../models/subCategory");
const slugify = require("slugify");
exports.create = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const sub = await new subCategory({
            name,
            parent,
            slug: slugify(name),
        }).save();
        res.json({ sub });
    } catch (error) {
        console.log("Subcategory create error---->", error);
        res.status(400).send("Creating sub-category failed");
    }
};
exports.list = async (req, res) => {
    const subs = await subCategory.find({}).sort({ createdAt: -1 }).exec();
    res.json(subs);
};
exports.read = async (req, res) => {
    const sub = await subCategory.findOne({ slug: req.params.slug }).exec();
    res.json(sub);
};
exports.update = async (req, res) => {
    const { name } = req.body;
    try {
        const updatedSub = await subCategory.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true }
        );
        res.json(updatedSub);
    } catch (error) {
        res.status(400).send("Category update failed");
    }
};
exports.remove = async (req, res) => {
    try {
        const deleted = await subCategory.findOneAndDelete({
            slug: req.params.slug,
        });
        res.json({ deleted, message: "Sub-Category deleted" });
    } catch (error) {
        res.status(400).send("Sub-Category deleted failed");
    }
};
