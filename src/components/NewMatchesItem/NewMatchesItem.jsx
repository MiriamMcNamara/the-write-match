import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function NewMatchesItem(props) {
  const writer = useSelector((store) => store.writer);
  const dispatch = useDispatch();
  const [heading, setHeading] = useState("NewMatch!");

  const checkForMatch = () => {
    console.log(
      "in checkForMatch, initiator:",
      props.match.id,
      "approver:",
      writer[0].id
    );
    dispatch({
      type: "CHECK_MATCHES",
      payload: {
        initiator: props.match.id,
        approver: writer[0].id,
      },
    });
  };

  const removeMatch = () => {
    console.log("in removeMatch");
    //send a dispatch that removes the selected match from the store and the DOM, shouldn't be too hard
    // although it won't last through a page refresh probably
  };

  return (
    <div>
      <h2>{heading}</h2>
      <section className="profile" key={props.match.id}>
        <div>
          <p>Name: {props.match.name}</p>
          <br />
          <img src={props.match.image} />
          <br />
          <p>Bio: {props.match.bio} </p>
          <br />
          <p>Work In Progress: {props.match.wip}</p>
          <br />
          <p>Genre</p>
          <br />
          <p>Available For: available placeholder</p>
          <br />
          <p>Seeking: seeking placeholder</p>
          <button onClick={checkForMatch}>Match With This Writer!</button>
          <button onClick={removeMatch}>Pass On This Writer</button>
        </div>
      </section>
    </div>
  );
}

export default NewMatchesItem;
