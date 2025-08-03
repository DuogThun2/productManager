const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route");
const trashRouter = require("./trash.route");
const prefix = require("../../config/prefix");

module.exports = (app) => {
    app.use(prefix.prefixAdmin, dashboardRouter);
    app.use(prefix.prefixAdmin + "/products", productRouter);
    app.use(prefix.prefixAdmin + "/trash", trashRouter);
}