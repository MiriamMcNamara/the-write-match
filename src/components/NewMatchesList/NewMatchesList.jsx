import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import NewMatchesItem from '../NewMatchesItem/NewMatchesItem';

function NewMatchesList(props) {

  const dispatch = useDispatch();
  const writer = useSelector((store) => store.writer);
  const user = useSelector((store) => store.user);
  const availablefor = useSelector((store) => store.availablefor);
  const seeking = useSelector((store) => store.seeking);
  const matches = useSelector((store) => store.matches);
  const selected = useSelector((store) => store.selected);

  const [heading, setHeading] = useState('See New Matches');

  useEffect( ()=>{
    dispatch( { type: 'FILTER_MATCHES',
                payload: {
                  writer: writer[0].id, 
                  seeking: seeking[0].seeking_id, 
                  availablefor: availablefor[0].available_for_id,
                  user: user.id
                  }
  })
  //   dispatch( { type: 'FETCH_MATCHES',
  //               payload: { writer: writer[0].id, 
  //                 seeking: seeking[0].seeking_id, 
  //                 availablefor: availablefor[0].available_for_id }
  // } );

  //   dispatch( { type: 'FETCH_SELECTED',
  //               payload: user.id //I think this is what we need?
  // } );
  }, []);

  return (
    <div>
      <p>{JSON.stringify( writer )}</p>
      <p>{JSON.stringify( matches )}</p>
      <p>{JSON.stringify( selected )}</p>
      
      <h2>{heading}</h2>
      {matches.map( match=>( <NewMatchesItem match={match} />))}
    </div>
  );
}

export default NewMatchesList;
