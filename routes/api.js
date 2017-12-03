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

router.put("/page", function(req, res) {
  var params = JSON.parse(req.body.params);

  turbo
    .update("page", { id: params.id }, params.data)
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

router.get("/result", function(req, res) {
  turbo
    .fetch("result", null)
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

router.post("/result", function(req, res) {
  var params = JSON.parse(req.body.params);

  turbo
    .create("result", params)
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
