import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import NewMatchesItem from '../NewMatchesItem/NewMatchesItem';

function NewMatchesList(props) {

  const dispatch = useDispatch();

  useEffect( ()=>{
    dispatch( { type: 'FETCH_MATCHES'
                // payload: user.id; this will need to be something else here to pass
                //info needed for correct queries
              
  } );
  }, []);

  const matches = useSelector((store) => store.matches);
  const user = useSelector((store) => store.user);
  const [heading, setHeading] = useState('See New Matches');

  return (
    <div>
      <h2>{heading}</h2>
      {matches.map( match=>( <NewMatchesItem match={match} />))}
    </div>
  );
}

export default NewMatchesList;
