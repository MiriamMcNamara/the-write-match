import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';


function SelectedMatchesItem(props) {

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Current Match!');
  const dispatch = useDispatch();

  const deleteSelected = () => {
    console.log(' in deleteSelected' );
    dispatch({
      type: 'DELETE_SELECTED', 
      payload: props.selected.matches_id
    });
  }

  return (
    <div>
      <h2>{heading}</h2>
      <p>{JSON.stringify(props)}</p>
      { props.selected.confirmed ?

      <section className="profile" key={props.selected.id}>
             <h3>CONFIRMED MATCH!</h3>
            <div><p>Name: {props.selected.name}</p><br />
            <img src={props.selected.image} />
            <br /><p>Bio: {props.selected.bio} </p><br />
            <p>Work In Progress: {props.selected.wip}</p>
            <br /><p>Genre</p>
            <br /><p>Available For: available placeholder</p><br />
            <p>Seeking: seeking placeholder</p>
            <button >Contact This Writer!</button>
            </div>
            </section>:

            <section className="profile" key={props.selected.id}>
            <h3>AWAITING CONFIRMATION</h3>
            <div><p>Name: {props.selected.name}</p><br />
            <img src={props.selected.image} />
            <br /><p>Bio: {props.selected.bio} </p><br />
            <p>Work In Progress: {props.selected.wip}</p>
            <br /><p>Genre</p>
            <br /><p>Available For: available placeholder</p><br />
            <p>Seeking: seeking placeholder</p>
            <button onClick={deleteSelected}>Remove This Match</button>
            </div>
            </section>}
    </div>
  );
}

export default SelectedMatchesItem;
