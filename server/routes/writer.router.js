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
  const query = `SELECT * FROM writer WHERE user_id = ${req.params.id}`; 
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

    console.log(req.body);
    // RETURNING "id" will give us back the id of the created profile; do I need this?
    const insertWriterQuery = `
    INSERT INTO "writer" ("name", "image", "bio", "wip", "contact", "user_id" )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING "id";`
  
    // FIRST QUERY MAKES WRITER
    pool.query(insertWriterQuery, [req.body.name, req.body.image, req.body.bio, req.body.wip, req.body.contact, req.body.user_id])
    .then(result => {
      console.log('New Writer ID:', result.rows[0].id); //ID IS HERE!
      
      const createdWriterId = result.rows[0].id;
  
      // Now handle the genre reference
      const insertWriterGenreQuery = `
        INSERT INTO "writer_genre" ("writer_id", "genre_id")
        VALUES  ($1, $2);`
        // SECOND QUERY ADDS GENRE FOR THAT NEW WRITER
        pool.query(insertWriterGenreQuery, [createdWriterId, req.body.genre_id])
        //THIRD QUERY ADDS WRITER_SEEKING for new writer
        //FOURTH QUERY ADDS WRITER_AVAILABLE_FOR for new writer
        .then(result => {
          //Now that all? are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query; where for third and fourth?
          console.log(err);
          res.sendStatus(500)
        })
  
  // Catch for first query
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })

});

module.exports = router;