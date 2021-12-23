const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

//this is the GET route that proceeds the POST or the PUT, which checks for a match
router.get('/existing/', (req,res)=>{
  console.log( req.query );
  //GET route code here for checking if there is a match in the database already!
  const query = `SELECT * FROM matches WHERE initiator_id=$1 AND approver_id=$2`;
  // WHERE (approver_id = $1 OR approver_id = $2)
  // AND (initiator_id = $3 OR initiator_id = $4);
  const values = [ req.query.initiator, req.query.approver ];
  pool.query(query, values )
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: check for existing matches', err);
        res.sendStatus(500)
      })
});
  


//this is the GET route that selects writers based on algorithm for the user
 router.get('/', (req, res) => {
  // GET route code here for new matches!
  const query = `SELECT DISTINCT writer.id, name, image, bio, wip, contact FROM writer
  JOIN writer_available_for ON writer.id = writer_available_for.writer_id
  JOIN writer_seeking ON writer.id = writer_seeking.writer_id
  WHERE writer.id != ${req.query.writer}
  AND
  (available_for_id =${req.query.seeking} 
  OR seeking_id = ${req.query.availablefor} );`;
  //this needs further filtering where it checks against the matches database OR the select store
  //and then needs correct req.query stuff entered instead of numbers (also entered on client side)
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
  console.log( 'POST match route hit');
  let queryString = 'INSERT INTO matches ( initiator_id, approver_id, confirmed ) VALUES ( $1, $2, $3 )';
  let values = [ req.body.approver, req.body.initiator, "FALSE" ];
  pool.query( queryString, values ).then( (results)=>{
      res.sendStatus( 201 )
  }).catch( (err)=>{
      console.log( err );
      res.sendStatus( 500 );
  })
});

/**
 * PUT route template
 */
 router.put('/:id', (req, res) => {
  // PUT route code here
  const query = `UPDATE matches SET confirmed=TRUE
    WHERE approver_id=${req.params.id}`;
    pool.query( query ).then( (results)=>{
      res.sendStatus( 201 )
  }).catch( (err)=>{
      console.log( err );
      res.sendStatus( 500 );
  })
});

module.exports = router;