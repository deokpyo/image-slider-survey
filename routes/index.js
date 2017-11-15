const pkg_json = require("../package.json");
const turbo = require("turbo360")({ site_id: pkg_json.app });
const vertex = require("vertex360")({ site_id: pkg_json.app });
const router = vertex.router();

router.get("/", function(req, res) {
  res.render("index", { title: "About Logi" });
});

router.get("/symptoms", function(req, res) {
  res.render("symptoms", { title: "Symptoms, Consequences, Treatment" });
});

router.get("/outbreaks", function(req, res) {
  res.render("outbreaks", { title: "Recent Outbreaks" });
});

module.exports = router;
