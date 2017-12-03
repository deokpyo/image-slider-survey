const pkg_json = require("../package.json");
const turbo = require("turbo360")({ site_id: pkg_json.app });
const vertex = require("vertex360")({ site_id: pkg_json.app });
const router = vertex.router();

router.post("/register", (req, res) => {
  const body = req.body;

  // very basic validation:
  if (body.email.length == 0) {
    res.json({
      confirmation: "fail",
      message: "Please enter an email address."
    });

    return;
  }

  if (body.password.length == 0) {
    res.json({
      confirmation: "fail",
      message: "Please enter a password."
    });

    return;
  }

  turbo
    .createUser(body)
    .then(data => {
      res.redirect("/admin");
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

router.post("/login", (req, res) => {
  const body = req.body;

  // very basic validation:
  if (body.email.length == 0) {
    res.json({
      confirmation: "fail",
      message: "Please enter your email address."
    });
    return;
  }

  if (body.password.length == 0) {
    res.json({
      confirmation: "fail",
      message: "Please enter your password."
    });
    return;
  }

  turbo
    .login(body)
    .then(data => {
      req.vertexSession.user = { id: data.id }; // set vertex session - must be set to an object
      res.redirect("/admin");
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message,
        site_id: pkg_json.app
      });
    });
});

router.get("/", (req, res) => {
  turbo
    .fetch("user", req.query)
    .then(data => {
      res.json({
        confirmation: "success",
        details:
          "add a query string the url for query filtering (/users?email=unsername@example.com)",
        users: data
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

router.get("/currentuser", (req, res) => {
  // user not logged in:
  if (req.vertexSession == null) {
    res.json({
      confirmation: "success",
      user: null
    });
    return;
  }

  // user not logged in:
  if (req.vertexSession.user == null) {
    res.json({
      confirmation: "success",
      user: null
    });
    return;
  }

  // user logged in:
  res.json({
    confirmation: "success",
    user: req.vertexSession.user
  });
});

router.get("/logout", (req, res) => {
  req.vertexSession.reset();
  res.redirect("/login");
});

router.get("/:userid", (req, res) => {
  turbo
    .fetchUser(req.params.userid)
    .then(data => {
      res.json({
        confirmation: "success",
        users: data
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message,
        details:
          "In the URL above, enter the ID number of an existing user from your project."
      });
    });
});

module.exports = router;
