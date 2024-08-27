const express = require("express");
const router = express.Router();

const FirmServices = require("../services/firm.services");

router.get("/firmdata/:id", (req, res) => {
  FirmServices.getFirmData(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;
