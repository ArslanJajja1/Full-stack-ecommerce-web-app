const SubCategory = require("../models/SubCategory");
const slugify = require("slugify");
exports.create = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const sub = await new SubCategory({
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
    const subs = await SubCategory.find({}).sort({ createdAt: -1 }).exec();
    res.json(subs);
};
exports.read = async (req, res) => {
    const sub = await SubCategory.findOne({ slug: req.params.slug }).exec();
    res.json(sub);
};
exports.update = async (req, res) => {
    const { name, parent } = req.body;
    try {
        const updatedSub = await SubCategory.findOneAndUpdate(
            { slug: req.params.slug },
            { name, parent, slug: slugify(name) },
            { new: true }
        );
        res.json(updatedSub);
    } catch (error) {
        res.status(400).send("Category update failed");
    }
};
exports.remove = async (req, res) => {
    try {
        const deleted = await SubCategory.findOneAndDelete({
            slug: req.params.slug,
        });
        res.json({ deleted, message: "Sub-Category deleted" });
    } catch (error) {
        res.status(400).send("Sub-Category deleted failed");
    }
};
