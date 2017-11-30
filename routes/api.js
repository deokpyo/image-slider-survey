const pkg_json = require("../package.json");
const turbo = require("turbo360")({ site_id: pkg_json.app });
const vertex = require("vertex360")({ site_id: pkg_json.app });
const router = vertex.router();

router.get("/page", function(req, res) {
  turbo
    .fetch("page", null)
    .then(data => {
      res.json({
        confirmation: "success",
        result: data
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err
      });
    });
});

router.post("/page", function(req, res) {
  var params = JSON.parse(req.body.params);

  turbo
    .create("page", params)
    .then(data => {
      res.json({
        confirmation: "success",
        result: data
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err
      });
    });
});

router.delete("/page", function(req, res) {
  turbo
    .remove("page", req.body)
    .then(data => {
      res.json({
        confirmation: "success",
        result: data
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err
      });
    });
});

module.exports = router;
