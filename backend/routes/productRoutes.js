import express from "express";
const router = express.Router();
// all functionality is in controller file
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

router.route("/").get(getProducts);

router.route("/:id").get(getProductById);

export default router;
