const express = require("express");
const router = express.Router();
const trashController = require("../../controllers/admin/trash.controller");

router.get("/", trashController.index);

// Tại sao /:status/:id lại sai
router.patch("/change/:status/:id", trashController.changeStatus);

router.delete("/delete/:id", trashController.deleteHardItem);

router.patch("/recycle/:id", trashController.recycleItem);

module.exports = router;