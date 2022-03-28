const controller = require("../controllers/category.controller.js");

module.exports = function(app) {
  app.get("/getCategories", controller.getCategories);
  app.get("/getCategory/:id", controller.getCategoryById);
};