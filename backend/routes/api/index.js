const router = require("express").Router();

// URL path /api/test with HTTP verb POST
router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
