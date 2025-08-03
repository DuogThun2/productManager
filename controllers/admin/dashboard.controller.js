const index = (req, res) => {
    res.render("admin/pages/dashboard/index.pug", {
        pageTitle: "Trang dashboard"
    });
};

module.exports = {
    index
}