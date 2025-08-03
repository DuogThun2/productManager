const Product = require("../../models/Product");

// [GET] admin/trash
const index = async (req, res) => {
    let find = {
        deleted: true
    }
    const productList = await Product.find(find);
    res.render("admin/pages/trash/index.pug", {
        productList: productList
    });
};

// [PATCH] admin/trash/change/:status/:id
const changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({_id: id}, {status: status});
    res.redirect(backUrl = req.headers.referer || "admin/trash");
}

// [DELETE] admin/trash/:id
const deleteHardItem = async (req, res) => {
    const productId = req.params.id;
    await Product.deleteOne({_id: productId});
    res.redirect(backUrl = req.headers.referer || "/admin/trash");
}

// [PATCH] admin/trash/recycle/:id
const recycleItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({_id: id}, {deleted: false});
    res.redirect(backUrl = req.headers.referer || "admin/trash");
}
 
module.exports = {
    index,
    changeStatus,
    deleteHardItem,
    recycleItem
}