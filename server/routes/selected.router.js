const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
 router.get('/:id', (req, res) => {
  // GET route code here
  const query = `SELECT matches.id AS matches_id, * FROM matches
  JOIN writer ON approver_id = writer.id
  WHERE initiator_id = ${req.params.id}`; //this should probably be refined
  pool.query(query)
      .then( result => {
        console.log( 'selected GET hit');
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get writer', err);
        res.sendStatus(500)
      })

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
 router.delete('/:id', (req, res) => {
  // DELETE route code here
  console.log( 'DELETE route hit' );
  const queryString = `DELETE FROM matches WHERE id ='${req.params.id}'`;

  console.log( queryString );
  pool.query( queryString ).then((results)=>{
      res.sendStatus( 200 );
  }).catch( (err)=>{
      console.log( err );
      res.sendStatus( 500 );
  }) 
});

module.exports = router;