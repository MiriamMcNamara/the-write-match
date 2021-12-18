import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';

function NewMatchesItem(props) {

  const writer = useSelector((store) => store.writer);
  const existing = useSelector((store) => store.existing);
  const dispatch = useDispatch();
  const [heading, setHeading] = useState('NewMatch!');

  const checkForMatch = () => {
    console.log( 'in checkForMatch, initiator:', props.match.id, 'approver:', writer.id );
  dispatch( { type: 'CHECK_MATCHES',
    payload: {
      initiator: props.match.id,
      approver: writer.id
    }
} );
};

  // const updateOrPost = () => {
  //   console.log( 'in updateOrPost' );
  //   console.log( 'existing', existing );
  //   // if ( existing === []){
  //   //   postMatch();
  //   // }
  //   // else {
  //   //   confirmMatch();
  //   // }
  // }

//   const confirmMatch = () => {
//     console.log( 'in confirmMatch' );
//     dispatch( { type: 'CONFIRM_MATCH',
//         payload: user.id
// } );
//   }

  // const postMatch = () => {
  //   console.log( 'in postMatch' );
  //   //send a dispatch with user.id and props.match.id
  //     dispatch({
  //         type: 'POST_MATCH',
  //         payload: {
  //           initiator: user.id,
  //           approver: props.match.id
  //         }
  //         //remove this whole item from the list! probably with a boolean flip?
  //     });
  //   }
  

  const removeMatch = () => {
    console.log( 'in removeMatch' );
    //send a dispatch that removes the selected match from the store and the DOM, shouldn't be too hard
    // although it won't last through a page refresh probably
  }

  return (
    <div>
      <h2>{heading}</h2>
      <section className="profile" key={props.match.id}>
             <p>writer: {JSON.stringify( writer )}</p>
             <p>writer.id: {JSON.stringify( writer.id )}</p>
            <div><p>Name: {props.match.name}</p><br />
            <img src={props.match.image} />
            <br /><p>Bio: {props.match.bio} </p><br />
            <p>Work In Progress: {props.match.wip}</p>
            <br /><p>Genre</p>
            <br /><p>Available For: available placeholder</p><br />
            <p>Seeking: seeking placeholder</p>
            <button onClick={checkForMatch}>Match With This Writer!</button>
            <button onClick={removeMatch}>Pass On This Writer</button>
            </div>
            
            </section>
    </div>
  );
}

export default NewMatchesItem;
