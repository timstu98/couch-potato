const UsersModel = require("../models/user");
const func = require("../functions.js");
const jwt = require("jsonwebtoken");

module.exports = function (app) {
  console.log("admin routes running");
  // Get request for all users
  app.get("/admin/users", func.requireAdmin, async function (req, res) {
    const all = await UsersModel.find();
    console.log("This gets ALL users");
    try {
      res.json(all);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Get request for specific user
  app.get("/admin/:id", func.requireAdmin, async function (req, res) {
    console.log("Hello");
    const { id } = req.params;
    console.log(id);
    func.getUserDetails(id, req, res);
  });

  // Put request to update specific user
  app.put("/admin/:id", func.requireAdmin, async function (req, res) {
    const { id } = req.params;
    console.log(id);
    func.updateUserDetails(id, req, res);
  });

  // Delete request to remove specific user
  app.delete("/admin/:id", func.requireAdmin, async function (req, res) {
    const { id } = req.params;
    func.deleteUserDetails(id, req, res);
  });
};
