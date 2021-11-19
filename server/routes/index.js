const express = require("express");

// importing the routes from individual files
const usersRoute = require("./users.route");
const teachersRoute = require("./teachers.route");

const router = express.Router();

const Routes = [
  {
    path: "/users",
    route: usersRoute,
  },
  {
    path: "/teachers",
    route: teachersRoute,
  },
];

Routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
