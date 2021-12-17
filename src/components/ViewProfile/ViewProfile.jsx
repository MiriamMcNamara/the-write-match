import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
// import { Grid, Typography, Box, Card, CardContent, CardActions, TextField, Button } from "@mui/material";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ViewProfile(props) {

  const dispatch = useDispatch();

  useEffect( ()=>{
    dispatch( { type: 'FETCH_WRITER',
                payload: user.id
  } );
  }, []);
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const writer = useSelector((store) => store.writer);
  const user = useSelector(( store) => store.user );
  const [heading, setHeading] = useState('View Profile');

  return (
    <div>
      <h2>{heading}</h2>
      <section className="profile" key={writer.id}>
            {writer.map( writer=>( 
            <div><p>Name: {writer.name}</p><br />
            <img src={writer.image} />
            <br /><p>Bio: {writer.bio} </p><br />
            <p>Work In Progress: {writer.wip}</p>
            <br /><p>Genre</p>
            <br /><p>Available For: available placeholder</p><br />
            <p>Seeking: seeking placeholder</p></div>

            ))}
            </section>
    </div>
  );
}

export default ViewProfile;
