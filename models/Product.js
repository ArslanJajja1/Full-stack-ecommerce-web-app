const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            maxlength: 35,
            text: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000,
            text: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
            maxlength: 5,
        },
        category: {
            type: ObjectId,
            ref: "Category",
        },
        subs: {
            type: [
                {
                    type: ObjectId,
                    ref: "SubCategory",
                },
            ],
        },
        quantity: Number,
        sold: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
        },
        shipping: {
            type: String,
            //  enum: ["Yes", "No"],
        },
        color: {
            type: String,
            enum: ["Black", "White", "Gray", "Blue", "Red", "Green", "Yellow", "Pink", "Purple", "Orange", "Brown"]            ,
        },
        brand: {
            type: String,
            enum: ["Levi's", "Zara", "Gucci", "Armani", "Khadi","Zelbury","Hermes"],
        },
        ratings: {
            type: [
                {
                    star: Number,
                    postedBy: { type: ObjectId, ref: "User" },
                },
            ],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
