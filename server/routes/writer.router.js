const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route for selecting the profile info for the user who is logged in
 */
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const writerQuery = `SELECT * FROM writer
  WHERE user_id = ${req.params.id}`;
  pool
    .query(writerQuery)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get writer", err);
      res.sendStatus(500);
    });
});

/**
 * GET route for seeking info for the user who is logged in
 */
router.get("/seeking/:id", rejectUnauthenticated, (req, res) => {
  const seekingQuery = `SELECT skill, seeking_id FROM skill
JOIN writer_seeking ON skill.id = writer_seeking.seeking_id
JOIN writer ON writer.id = writer_seeking.writer_id
WHERE user_id = ${req.params.id}`;
  pool
    .query(seekingQuery)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get writer", err);
      res.sendStatus(500);
    });
});

/**
 * GET route for available_for info for the user who is logged in
 */
router.get("/availablefor/:id", rejectUnauthenticated, (req, res) => {
  // GET route code here
  const availableQuery = `SELECT skill, available_for_id FROM skill
JOIN writer_available_for ON skill.id = writer_available_for.available_for_id
JOIN writer ON writer.id = writer_available_for.writer_id
WHERE user_id = ${req.params.id}`;
  pool
    .query(availableQuery)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get writer", err);
      res.sendStatus(500);
    });
});

/**
 * POST route for creating a writer profile with inserts for seeking and available_for tables
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const insertWriterQuery = `
    INSERT INTO "writer" ("name", "image", "bio", "wip", "contact", "user_id", "genres" )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING "id";`;
  // FIRST QUERY MAKES WRITER
  pool
    .query(insertWriterQuery, [
      req.body.name,
      req.body.image,
      req.body.bio,
      req.body.wip,
      req.body.contact,
      req.body.user_id,
      req.body.genres,
    ])
    .then((result) => {
      console.log("New Writer ID:", result.rows[0].id); //ID IS HERE!
      const createdWriterId = result.rows[0].id;
      // //SECOND QUERY ADDS WRITER_AVAILABLE_FOR for new writer
      const insertWriterSkillsQuery = `INSERT INTO "writer_available_for" ("writer_id", "available_for_id")
            VALUES  ($1, $2);`;
      pool
        .query(insertWriterSkillsQuery, [createdWriterId, req.body.skill])
        .then((result) => {
          // //THIRD QUERY ADDS WRITER_SEEKING for new writer
          const insertWriterSeekingQuery = `
                    INSERT INTO "writer_seeking" ("writer_id", "seeking_id")
                    VALUES  ($1, $2);`;
          pool.query(insertWriterSeekingQuery, [
            createdWriterId,
            req.body.seeking,
          ]);
        })
        .then((result) => {
          //Now that all are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
      // Catch for first query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
