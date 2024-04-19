const UserController = require("../controllers/user.controller");

module.exports = UserRouter => {
  UserRouter.post("/api/auth/register", UserController.register);
  UserRouter.post("/api/auth/register/owner", UserController.assignOwnerRole);
  UserRouter.post("/api/auth/login", UserController.login);
  UserRouter.post("/api/auth/logout", UserController.logout);
}