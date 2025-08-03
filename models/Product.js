var slug = require('mongoose-slug-updater');
const mongoose = require('mongoose');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    discountPercentage: Number,
    thumbnail: String,
    status: String,
    quantity: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String, 
        slug: "title", 
        unique: true 
    },
    position: Number,
    deleteAt: Date
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema, "products");