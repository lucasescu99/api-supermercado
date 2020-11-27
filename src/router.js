const express = require("express");
const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller");
const router = express.Router();
const version = require("../config/settings").version;
const acl = require('express-acl')
const auth = require('./middlewares')

// Acl config
acl.config({
    baseUrl: version,
    path: 'src',
    action: 'allow'
});

/* User */

router.get(`/${version}/users/:id`, userController.get);
router.post(`/${version}/users`, userController.signUp);
router.post(`/${version}/login`, userController.login);
router.put(`/${version}/users/:id`, userController.update);
router.delete(`/${version}/users/:id`, userController.delete);

/* Product */

router.get(`/${version}/products/:id`, productController.get);
router.post(`/${version}/products`,auth,acl.authorize, productController.add);
router.put(`/${version}/products/:id`, productController.update);
router.delete(`/${version}/products/:id`, productController.delete);

module.exports = { router, version };
