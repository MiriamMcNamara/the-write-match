const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route for selectedMatches
 */
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const query = `SELECT matches.id AS matches_id, * FROM matches
  JOIN writer ON approver_id = writer.id
  WHERE initiator_id = ${req.params.id}
  UNION
  SELECT matches.id AS matches_id, * FROM matches
   JOIN writer ON initiator_id = writer.id
    WHERE approver_id = ${req.params.id}`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get selected", err);
      res.sendStatus(500);
    });
});

/**
 * DELETE route for selectedMatches
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const queryString = `DELETE FROM matches WHERE id ='${req.params.id}'`;
  console.log(queryString);
  pool
    .query(queryString)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("ERROR: delete selected", err);
      res.sendStatus(500);
    });
});

module.exports = router;
