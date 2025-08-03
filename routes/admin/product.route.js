const express = require("express");
const multer  = require('multer');
const multerStorage = require("../../helpers/multer");
const upload = multer({ storage: multerStorage() });
const router = express.Router();
const productController = require("../../controllers/admin/product.controller");
const productValidate = require("../../validate/admin/product.validate");

router.get("/", productController.product);

router.patch("/change-status/:status/:id", productController.changeStatus);

router.patch("/change-multi", productController.changeMultiStatus);

router.delete("/delete/:id", productController.deleteSoftItem);

router.get("/create", productController.create);

router.post("/create", upload.single('thumbnail'), productValidate.createProduct, productController.createProduct);

router.get("/update/:id", upload.single('thumbnail'), productController.update);

router.patch("/update/:id", upload.single('thumbnail'), productController.updateProduct);

module.exports = router;