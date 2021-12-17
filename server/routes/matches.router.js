const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
 router.get('/', (req, res) => {
  // GET route code here
  const query = `SELECT * FROM writer`;
  // WHERE user_id = ${req.params.id}`; this query 
  // will need to use the writer_seeking table, so need to get that in the store.
  // then it'll hit the database and search for other writers whose writer_available_for
  // matches. Will also need to specify not returning the user that is logged in.
  // i'll also need to make sure it matches the other way around? so their available_for
  //matches the other writer's seeking?
  pool.query(query)
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get writer', err);
        res.sendStatus(500)
      })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

/**
 * PUT route template
 */
 router.put('/', (req, res) => {
  // PUT route code here
});

/**
 * DELETE route template
 */
 router.delete('/', (req, res) => {
  // DELETE route code here
});

module.exports = router;