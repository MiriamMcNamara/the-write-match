import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import NewMatchesItem from '../NewMatchesItem/NewMatchesItem';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name NewMatchesList with the name for the new component.
function NewMatchesList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  const dispatch = useDispatch();

  useEffect( ()=>{
    dispatch( { type: 'FETCH_MATCHES'
                // payload: user.id; this will need to be something else here
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
