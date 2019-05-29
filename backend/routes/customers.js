const express = require("express");

const CustomerController = require("../controllers/customer");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, CustomerController.createCustomer);

router.put("/:id", checkAuth, extractFile, CustomerController.updateCustomer);

router.get("", CustomerController.getCustomers);

router.get("/:id", CustomerController.getCustomer);

router.delete("/:id", checkAuth, CustomerController.deleteCustomer);

module.exports = router;
