const productRoute = require("./product.route");
const homneRoute = require("./home.route");

module.exports = (app) => {
    app.use("/", homneRoute);

    app.use("/", productRoute);
}
