const pkg_json = require("../package.json");
const turbo = require("turbo360")({ site_id: pkg_json.app });
const vertex = require("vertex360")({ site_id: pkg_json.app });
const router = vertex.router();

router.get("/admin", function(req, res) {
  res.render("admin", { title: "Admin Page" });
});

router.get("/survey/:id", function(req, res) {
  const clientIP = req.headers["X-Forwarded-For"];
  var display = null;

  turbo
    .fetchOne("page", req.params.id)
    .then(data => {
      const template = {
        title: "Survey Page",
        id: req.params.id,
        ip: clientIP,
        slider: display,
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

router.get("/symptoms/:id", function(req, res) {
  res.render("symptoms", { title: "Symptoms, Consequences, Treatment" });
});

router.get("/outbreaks/:id", function(req, res) {
  res.render("outbreaks", { title: "Recent Outbreaks" });
});

module.exports = router;
