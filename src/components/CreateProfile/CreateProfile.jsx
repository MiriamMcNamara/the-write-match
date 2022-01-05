import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const useStyles = makeStyles({
  field: {
    
    display: "block",
    color: "#CAFE48",
  },
  select: {
    minWidth: 300,
  },
});

// const styles = theme => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "25ch"
//     }
//   }
// });

function CreateProfile(props) {
  const classes = useStyles();
const presenting = true;
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const [heading, setHeading] = useState("Create Profile");

  const [addWriter, setAddWriter] = useState({
    name: "",
    image: "",
    bio: "",
    wip: "",
    genres: "",
    skill: "",
    seeking: "",
    contact: "",
    user_id: user.id,
  });

  const setDefaults = () => {
    console.log( 'in setDefaults' );
    if( presenting ){
    setAddWriter({ ...addWriter, 
      name: "Jane Austen",
image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgbU7TVXhMEVhh-ja0c5y4L2xWYPs4r_N2xw&usqp=CAU",
    bio: "I'm an English novelist known primarily for six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century. My plots often explore the dependence of women on marriage in the pursuit of favourable social standing and economic security. My use of biting irony, along with my realism and social commentary, have earned me acclaim among critics and scholars.",
  wip: "A romantic, satirical novel of manners",
  genres: "romance, satire",
  contact: "Leave a letter with my butler"
  } );
    }
  }

  const postWriter = () => {
    if (
      addWriter.name &&
      addWriter.image &&
      addWriter.bio &&
      addWriter.wip &&
      addWriter.genres &&
      addWriter.skill &&
      addWriter.seeking &&
      addWriter.contact
    ) {
      console.log("in postWriter", addWriter);
      dispatch({
        type: "POST_WRITER",
        payload: addWriter,
      });
      history.push("/profile");
    } //end if statement
    else {
      alert("All fields must be entered before proceeding");
    }
  };

  const handleName = (event) => {
    //input capture
    console.log("in handleName:", event.target.value);
    setAddWriter({ ...addWriter, name: event.target.value });
  };

  const handleImage = (event) => {
    //input capture
    console.log("in handleImage:", event.target.value);
    setAddWriter({ ...addWriter, image: event.target.value });
  };

  const handleBio = (event) => {
    //input capture
    console.log("in handleBio:", event.target.value);
    setAddWriter({ ...addWriter, bio: event.target.value });
  };

  const handleWip = (event) => {
    //input capture
    console.log("in handleWip:", event.target.value);
    setAddWriter({ ...addWriter, wip: event.target.value });
  };

  const handleGenres = (event) => {
    //input capture
    console.log("in handleGenre:", event.target.value);
    setAddWriter({ ...addWriter, genres: event.target.value });
  };

  const handleSkill = (event) => {
    //input capture
    console.log("in handleSkill:", event.target.value);
    setAddWriter({ ...addWriter, skill: Number(event.target.value) });
  };

  const handleSeeking = (event) => {
    //input capture
    console.log("in handleSeeking:", event.target.value);
    setAddWriter({ ...addWriter, seeking: Number(event.target.value) });
  };

  const handleContact = (event) => {
    //input capture
    console.log("in handleContact:", event.target.value);
    setAddWriter({ ...addWriter, contact: event.target.value });
  };

  return (
    <Container>
      <Grid container>
        <Paper>
        <Grid item xs={12}>
          <Typography variant="h4" color="primary" component="h2" gutterBottom onClick={setDefaults}>
            Create Profile
          </Typography>
        </Grid>

        <Grid item xs={12} padding="10px">
          <TextField
          value={addWriter.name}
            className={classes.field}
            label="Name"
            variant="outlined"
            color="secondary"
            onChange={(event) => handleName(event)}
          />
        </Grid>

        <Grid item xs={12} padding="10px">
          <TextField
          value={addWriter.image}
            className={classes.field}
            label="Image URL"
            variant="outlined"
            color="secondary"
            fullWidth
            onChange={(event) => handleImage(event)}
          />
        </Grid>

        <Grid item xs={12} padding="10px">
          <TextField
          value={addWriter.bio}
            className={classes.field}
            label="Bio"
            variant="outlined"
            color="secondary"
            multiline
            rows={4}
            fullWidth
            onChange={(event) => handleBio(event)}
          />
        </Grid>

        <Grid item xs={12} padding="10px">
          <TextField
          value={addWriter.wip}
            className={classes.field}
            label="Describe Your Work In Progress"
            variant="outlined"
            color="secondary"
            multiline
            rows={2}
            fullWidth
            onChange={(event) => handleWip(event)}
          />
        </Grid>

        <Grid item xs={12} padding="10px">
        <TextField
        value={addWriter.genres}
          className={classes.field}
          label="What Genres Do You Write In?"
          variant="outlined"
          color="secondary"
          fullWidth
          onChange={(event) => handleGenres(event)}
        />
        </Grid>

        <Grid item xs={12} padding="10px">
          <FormControl>
            <InputLabel color="secondary">
              What Are You Most Available For?
            </InputLabel>
            <Select
              className={classes.select}
              labelId="select-skill"
              id="skill-select"
              value={addWriter.skill}
              label="skill"
              color="secondary"
              onChange={(event) => handleSkill(event)}
            >
              <MenuItem value={1}>Developmental Editing</MenuItem>
              <MenuItem value={2}>Copy/Line Editing</MenuItem>
              <MenuItem value={3}>Accountability Buddy</MenuItem>
              <MenuItem value={4}>Critique Group Member</MenuItem>
              <MenuItem value={5}>Manuscript Swap</MenuItem>
              <MenuItem value={6}>World-Building (Fantasy/Sci-Fi)</MenuItem>
              <MenuItem value={7}>Publishing Strategy</MenuItem>
              <MenuItem value={8}>Socializing/Networking</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} padding="10px">
          <FormControl>
            <InputLabel color="secondary">
              What Are You Primarly Seeking?
            </InputLabel>
            <Select
              className={classes.select}
              labelId="select-seeking"
              id="seeking-select"
              value={addWriter.seeking}
              label="seeking"
              color="secondary"
              onChange={(event) => handleSeeking(event)}
            >
              <MenuItem value={1}>Developmental Editing</MenuItem>
              <MenuItem value={2}>Copy/Line Editing</MenuItem>
              <MenuItem value={3}>Accountability Buddy</MenuItem>
              <MenuItem value={4}>Critique Group</MenuItem>
              <MenuItem value={5}>Manuscript Swap</MenuItem>
              <MenuItem value={6}>World-Building (Fantasy/Sci-Fi)</MenuItem>
              <MenuItem value={7}>Publishing Strategy</MenuItem>
              <MenuItem value={8}>Socializing/Networking</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} padding="10px">
          <Typography>
            In the event of a Match, how would you like other writers to contact
            you?
          </Typography>
          <TextField
          value={addWriter.contact}
            className={classes.field}
            label="Contact Info"
            variant="outlined"
            color="secondary"
            fullWidth
            onChange={(event) => handleContact(event)}
          />
        </Grid>

        <Grid item xs={12} padding="10px">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={postWriter}
          >
            SUBMIT
          </Button>
        </Grid>
        </Paper>
      </Grid>
    </Container>
  );
}

export default CreateProfile;
