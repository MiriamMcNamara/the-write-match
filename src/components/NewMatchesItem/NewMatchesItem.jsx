import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name NewMatchesItem with the name for the new component.
function NewMatchesItem(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [heading, setHeading] = useState('NewMatch!');

  const postMatch = () => {
    console.log( 'in postMatch' );
    //I need to send a dispatch with user.id and props.match.id
    //I need to remove this whole item from the list! probably with a boolean flip?
  }

  const removeMatch = () => {
    console.log( 'in removeMatch' );
  }

  return (
    <div>
      <h2>{heading}</h2>
      <section className="profile" key={props.match.id}>
             
            <div><p>Name: {props.match.name}</p><br />
            <img src={props.match.image} />
            <br /><p>Bio: {props.match.bio} </p><br />
            <p>Work In Progress: {props.match.wip}</p>
            <br /><p>Genre</p>
            <br /><p>Available For: available placeholder</p><br />
            <p>Seeking: seeking placeholder</p>
            <button onClick={postMatch}>Match With This Writer!</button>
            <button onClick={removeMatch}>Pass On This Writer!</button>
            </div>
            
            </section>
    </div>
  );
}

export default NewMatchesItem;
