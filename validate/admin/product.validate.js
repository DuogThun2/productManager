module.exports.createProduct = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Vui lòng nhập tên sản phẩm");
        res.redirect(backUrl = req.headers.referer || "/admin/products/create");
        return;
    }
    next();
}