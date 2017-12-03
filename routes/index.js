const pkg_json = require("../package.json");
const turbo = require("turbo360")({ site_id: pkg_json.app });
const vertex = require("vertex360")({ site_id: pkg_json.app });
const router = vertex.router();

router.get("/", function(req, res) {
    // admin not logged in:
    if (req.vertexSession !== null) {
      res.redirect("/admin");
      return;
    }
  
    // admin not logged in:
    if (req.vertexSession.user !== null) {
      res.redirect("/admin");
      return;
    }
  res.redirect("/login");
});

router.get("/login", function(req, res) {
  res.render("login", { title: "Admin Login" });
});

router.get("/register", function(req, res) {
  res.render("register", { title: "Admin Registration" });
});

router.get("/admin", function(req, res) {
  // admin not logged in:
  if (req.vertexSession == null) {
    res.redirect("/login");
    return;
  }

  // admin not logged in:
  if (req.vertexSession.user == null) {
    res.redirect("/login");
    return;
  }
  res.render("admin", { title: "Admin Page" });
});

router.get("/survey/:id", function(req, res) {

  turbo
    .fetchOne("page", req.params.id)
    .then(data => {
      const template = {
        title: "Office of Infectious Diseases",
        id: req.params.id,
        content: data.content
      };
      if (data.slider) {
        res.render("slider", template);
      } else {
        res.render("noslider", template);
      }
    })
    .catch(err => {
      console.log(err);
      return;
    });
});

router.get("/participant/:id", function(req, res) {
  res.render("participant", { title: "Participant Login", id: req.params.id });
});

module.exports = router;
