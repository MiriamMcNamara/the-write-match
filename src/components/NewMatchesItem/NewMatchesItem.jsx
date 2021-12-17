import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';

function NewMatchesItem(props) {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [heading, setHeading] = useState('NewMatch!');

  const postMatch = () => {
    console.log( 'in postMatch' );
    //I need to send a dispatch with user.id and props.match.id
      dispatch({
          type: 'POST_MATCH',
          payload: {
            initiator: user.id,
            approver: props.match.id
          }
          //I need to remove this whole item from the list! probably with a boolean flip?
      });
    }
  

  const removeMatch = () => {
    console.log( 'in removeMatch' );
    //send a dispatch that removes the selected match from the store, shouldn't be too hard
    // although it won't last through a page refresh probably
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
