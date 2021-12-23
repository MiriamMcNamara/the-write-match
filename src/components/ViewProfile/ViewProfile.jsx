import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Grid, Typography, Box, Card, CardContent, CardActions, TextField, Button } from "@mui/material";

function ViewProfile(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_WRITER", payload: user.id });
    dispatch({ type: "FETCH_SEEKING", payload: user.id });
    dispatch({ type: "FETCH_AVAILABLE_FOR", payload: user.id });
  }, []);

  const writer = useSelector((store) => store.writer);
  const seeking = useSelector((store) => store.seeking);
  const availableFor = useSelector((store) => store.availablefor);
  const user = useSelector((store) => store.user);
  const [heading, setHeading] = useState("View Profile");

  return (
    <div>
      <h2>{heading}</h2>
      <p>{JSON.stringify(writer)}</p>
      <p>{JSON.stringify(seeking)}</p>
      <p>{JSON.stringify(availableFor)}</p>
      <section className="profile" key={writer.id}>
        {writer.map((writer) => (
          <div>
            <p>Name: {writer.name}</p>
            <br />
            <img src={writer.image} />
            <br />
            <p>Bio: {writer.bio} </p>
            <br />
            <p>Work In Progress: {writer.wip}</p>
            <br />
            <p>Genre</p>
            <br />
            <p>Available For: available placeholder</p>
            <br />
            <p>Seeking: seeking placeholder</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ViewProfile;
