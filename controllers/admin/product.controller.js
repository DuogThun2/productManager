const Product = require("../../models/Product");
const filterbtn = require("../../helpers/filter");
const formSearch = require("../../helpers/form-search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
const product = async (req, res) => {
    // Dùng lọc trạng thái
    const filter = filterbtn(req.query);
    let findQuery = {
        deleted: false
    }
    if (req.query.status) {
        findQuery.status = req.query.status;
    };
    // Dùng form search
    const objectSearch = formSearch(req.query);
    if (objectSearch.regex) {
        findQuery.title = objectSearch.regex;
    };
    const keyword = objectSearch.keyword || "";
    // Dụng pagination

    let pagination = {
        currentPage: 1,
        previousPage: 1,
        limit: 4
    };
    const totalProducts = await Product.countDocuments(findQuery);
    pagination = paginationHelper(pagination, req.query, totalProducts, objectSearch);
    const products = await Product.find(findQuery)
                        .sort({position: "desc"})
                        .limit(pagination.limit)
                        .skip(pagination.skipProducts);

    res.render("admin/pages/product/index.pug", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products,
        filter: filter,
        keyword: keyword,
        pagination: pagination
    });
};

// [PATCH] admin/products/change-status/:status/:id
const changeStatus = async (req, res) => {
    const productStatus = req.params.status;
    const productId = req.params.id;
    
    await Product.updateOne({_id: productId}, {status: productStatus});
    req.flash("success", "Cập nhật trạng thái thành công");
    res.redirect(backUrl = req.headers.referer || "/admin/products");
}

// [PATCH] admin/products/change-multi
const changeMultiStatus = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch(type){
        case "active":
            await Product.updateMany({_id: {$in: ids}}, {status: type});
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: type});
            break;
        case "delete-all":
            await Product.updateMany({_id: {$in: ids}}, {deleted: true});
            break;
        case "change-position":
            for (const item of ids ){
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({_id: id}, {position: position});
            }
            break;
    }
    res.redirect(backUrl = req.headers.referer || "/admin/products");

}

// [DELETE] admin/products/delete/:id
const deleteSoftItem = async (req, res) => {
    const productId = req.params.id;
    await Product.updateOne({_id: productId}, {deleted: true});
    res.redirect(backUrl = req.headers.referer || "/admin/products");
}

// [GET] admin/products/create
const create = async (req, res) => {
    res.render("admin/pages/product/create.pug", {
        pageTitle: "Thêm sản phẩm mới"
    });
}

// [POST] admin/products/create
const createProduct = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.quantity = parseInt(req.body.quantity);
    if (req.body.position == "") {
        const countDocuments = await Product.countDocuments();
        req.body.position = countDocuments + 1;
    } 
    else {
        req.body.position = parseInt(req.body.position);
    }
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    const product = new Product(req.body);
    await product.save();
    res.redirect("/admin/products");
}

// [GET] admin/products/update/:id
const update = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findOne({_id: productId});
    res.render("admin/pages/product/update.pug", {
        pageTitle: "Cập nhật sản phẩm!",
        product: product
    });
}

// [PATCH] admin/products/update/:id
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.quantity = parseInt(req.body.quantity);
    req.body.position = parseInt(req.body.position);
    try {
        await Product.updateOne({_id: productId}, req.body);
        req.flash("success", "Cập nhật sản phẩm thành công");
        res.redirect("/admin/products");
    } catch (error) {
        req.flash("error", "Cập nhật sản phẩm thất bại");
    }
    res.redirect(backUrl = req.headers.referer || "/admin/products");
}


module.exports = {
    product,
    changeStatus,
    changeMultiStatus,
    deleteSoftItem,
    create,
    createProduct,
    update,
    updateProduct
}