const Product = require("../../models/Product");
const product = async (req, res) => {
    const find = {
        deleted: false,
        status: "active"
    }
    const pagination = {
        limit: 9,
        currentPage: 1,
        previousPage: 1
    }
    const totalProducts = await Product.countDocuments(find);
    pagination.totalPage = Math.ceil(totalProducts / pagination.limit);
    if (req.query.page) {
        pagination.currentPage = parseInt(req.query.page);
        if (pagination.currentPage > 1) {
            pagination.previousPage = pagination.currentPage - 1;
        } else {
            pagination.previousPage = 1;
        }
        if (pagination.currentPage == pagination.totalPage) {
            pagination.nextPage = pagination.currentPage;
        } else {
            pagination.nextPage = pagination.currentPage + 1;
        }
    }
    const productList = await Product.find(find).limit(pagination.limit).skip((pagination.currentPage - 1) * pagination.limit).sort({position: "desc"});
    productList.forEach((item) => {
        item.price = item.price.toFixed(0);
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
    });
    res.render("client/pages/product/index.pug", {
        pageTitle: "Trang danh sách sản phẩm",
        products: productList,
        pagination: pagination
    })
}

module.exports = {
    product
}



