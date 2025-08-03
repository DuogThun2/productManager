const home = (req, res) => {
    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ"
    });
}

module.exports = {
    home
}