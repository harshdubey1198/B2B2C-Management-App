const express = require("express");
const router = express.Router();

const FirmServices = require("../services/firmadmin.services");

router.get("/firmdata/:id", (req, res) => {
  FirmServices.getFirmData(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// router.post("/createUser", (req, res) => {
// //   console.log(req.body, "body");
//   FirmServices.createUser(req.body)
//     .then((response) => {
//       res.status(200).send(response);
//     })
//     .catch((error) => {
//       console.log(error, "error creating users");
//       res.status(500).send(error);
//     });
// });

module.exports = router;
