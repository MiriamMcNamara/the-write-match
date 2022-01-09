import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//this is the landing page for all returning users

function ViewProfile(props) {
  const dispatch = useDispatch();
  const writer = useSelector((store) => store.writer);
  const seeking = useSelector((store) => store.seeking);
  const availableFor = useSelector((store) => store.availablefor);
  const user = useSelector((store) => store.user);
  const [heading, setHeading] = useState("Your Write Match Profile");
  const [emoji, setEmoji] = useState("👋"); //didn't do anything with this but kinda fun to think about

  useEffect(() => {
    //get all the user info to load onto the page, GET routes in writer.router
    dispatch({ type: "FETCH_WRITER", payload: user.id });
    dispatch({ type: "FETCH_SEEKING", payload: user.id });
    dispatch({ type: "FETCH_AVAILABLE_FOR", payload: user.id });
    window.scrollTo(0, 0); //necessary when coming from the CreateProfile page
  }, []);

  return (
    <Container>
      <Grid container>
        <Grid item paddingBottom="20px">
          <Box sx={{ border: 5, borderColor: "secondary.main" }}>
            {writer.map((writer) => (
              <Grid item className="profile" key={writer.id} padding="10px">
                <br />
                <Typography variant="h5" textAlign="center">
                  Hi {emoji} {writer.name}!
                </Typography>

                <Typography variant="h6" textAlign="center" fontStyle="italic">
                  Welcome to {heading}
                </Typography>
                <br />
                <Grid item>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor="lightBlue"
                    sx={{ border: 5, borderColor: "secondary.main" }}
                  >
                    <img src={writer.image} />
                  </Box>
                </Grid>

                <br />
                <Typography textAlign="center">{writer.bio}</Typography>
                <br />
                <Typography
                  textAlign="center"
                  variant="subtitle1"
                  fontStyle="italic"
                >
                  Work In Progress:
                </Typography>
                <Typography textAlign="center">{writer.wip}</Typography>
                <br />
                <Typography
                  textAlign="center"
                  variant="subtitle1"
                  fontStyle="italic"
                >
                  Genres:
                </Typography>
                <Typography textAlign="center">{writer.genres}</Typography>
              </Grid>
            ))}

            {availableFor.map((availableFor) => (
              <Grid
                item
                className="availableFor"
                key={writer.id}
                padding="10px"
              >
                <Typography
                  textAlign="center"
                  fontStyle="italic"
                  variant="subtitle1"
                >
                  What I'm Most Excited to Offer Others:
                </Typography>
                <Typography textAlign="center">{availableFor.skill}</Typography>
              </Grid>
            ))}

            {seeking.map((seeking) => (
              <Grid item className="seeking" key={writer.id} padding="10px">
                <Typography
                  textAlign="center"
                  fontStyle="italic"
                  variant="subtitle1"
                >
                  What I'm Primarily Looking For:
                </Typography>
                <Typography textAlign="center">{seeking.skill}</Typography>
              </Grid>
            ))}
            <br />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ViewProfile;
