import React, { useEffect, useState } from "react";
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
import Box from "@mui/material/Box";

const useStyles = makeStyles({
  select: {
    minWidth: 350,
  },
});

function CreateProfile(props) {
  const classes = useStyles();
  const presenting = false;
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const writer = useSelector((store) => store.writer);
  const seeking = useSelector((store) => store.seeking);
  const availableFor = useSelector((store) => store.availablefor);
  const history = useHistory();
  const [heading, setHeading] = useState("Create Your Write Match Profile!");

  useEffect(() => {
    scrollToTop();
    checkReducer();
  }, []);

  const checkReducer = () => {
    console.log("in checkReducer", writer, seeking, availableFor);
    if (Object.entries(writer).length === 0) {
      console.log("EMPTY");
      return false;
    } else {
      setAddWriter({
        ...addWriter,
        name: writer[0].name,
        image: writer[0].image,
        bio: writer[0].bio,
        wip: writer[0].wip,
        genres: writer[0].genres,
        contact: writer[0].contact,
        seeking: seeking[0].seeking_id,
        skill: availableFor[0].available_for_id,
      });
      // if( seeking[0].skill === 'accountability buddy'){
      //   setAddWriter({
      //     ...addWriter,
      //     seeking: 3
      //   })
      // }
      // if (
      //   newtutorInfo.school === "Mayo High School" ||
      //   newtutorInfo.school === "John Marshall High School" ||
      //   newtutorInfo.school === "Century High School" ||
      //   newtutorInfo.school === "Lourdes High School" ||
      //   newtutorInfo.school === "Byron High School" ||
      //   newtutorInfo.school === "Dover-Eyota High School" ||
      //   newtutorInfo.school === "Stewertville High School" ||
      //   newtutorInfo.school === "College"
      // ) {
      //   setdefaultSchoolVal(newtutorInfo.school);
      //   setNewTutorSchool(newtutorInfo.school);
      // }
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  //the hook that is set by the information entered by the user to create their profile
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

  //this is only used in presenting mode: if the presenter clicks on the heading, the fields are auto-filled
  const setDefaults = () => {
    if (presenting) {
      setAddWriter({
        ...addWriter,
        name: "Jane Austen",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgbU7TVXhMEVhh-ja0c5y4L2xWYPs4r_N2xw&usqp=CAU",
        bio: "I'm an English novelist known primarily for six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century. My plots often explore the dependence of women on marriage in the pursuit of favourable social standing and economic security. My use of biting irony, along with my realism and social commentary, have earned me acclaim among critics and scholars.",
        wip: "A romantic, satirical novel of manners",
        genres: "romance, satire",
        contact: "Leave a letter with my butler at my Chawton estate",
      });
    }
  };

  //this function sends all the info entered to the POST route in writer.router,
  //if all of the fields are filled. Otherwise an alert will pop up.
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
    setAddWriter({ ...addWriter, name: event.target.value });
  };

  const handleImage = (event) => {
    //input capture
    setAddWriter({ ...addWriter, image: event.target.value });
  };

  const handleBio = (event) => {
    //input capture
    setAddWriter({ ...addWriter, bio: event.target.value });
  };

  const handleWip = (event) => {
    //input capture
    setAddWriter({ ...addWriter, wip: event.target.value });
  };

  const handleGenres = (event) => {
    //input capture
    setAddWriter({ ...addWriter, genres: event.target.value });
  };

  const handleSkill = (event) => {
    //input capture
    setAddWriter({ ...addWriter, skill: Number(event.target.value) });
  };

  const handleSeeking = (event) => {
    //input capture
    setAddWriter({ ...addWriter, seeking: Number(event.target.value) });
  };

  const handleContact = (event) => {
    //input capture
    setAddWriter({ ...addWriter, contact: event.target.value });
  };

  return (
    <Container>
      <Box sx={{ border: 5, borderColor: "secondary.main" }}>
        <Grid container>
          <Grid
            item
            xs={12}
            backgroundColor="lightBlue"
            sx={{ borderBottom: 5, borderColor: "secondary.main" }}
          >
            <Typography
              paddingTop="20px"
              fontStyle="italic"
              textAlign="center"
              variant="h5"
              component="h2"
              gutterBottom
              onClick={setDefaults}
            >
              {heading}
            </Typography>
          </Grid>

          <Grid item xs={12} padding="10px" marginTop="10px">
            <TextField
              fullWidth
              value={addWriter.name}
              className={classes.field}
              label="Name"
              variant="outlined"
              color="primary"
              onChange={(event) => handleName(event)}
            />
          </Grid>

          <Grid item xs={12} padding="10px">
            <TextField
              value={addWriter.image}
              label="Image URL"
              variant="outlined"
              color="primary"
              fullWidth
              onChange={(event) => handleImage(event)}
            />
          </Grid>

          <Grid item xs={12} padding="10px">
            <TextField
              value={addWriter.bio}
              label="Bio"
              variant="outlined"
              color="primary"
              multiline
              rows={4}
              fullWidth
              onChange={(event) => handleBio(event)}
            />
          </Grid>

          <Grid item xs={12} padding="10px">
            <TextField
              value={addWriter.wip}
              label="Describe Your Work In Progress"
              variant="outlined"
              color="primary"
              multiline
              rows={2}
              fullWidth
              onChange={(event) => handleWip(event)}
            />
          </Grid>

          <Grid item xs={12} padding="10px">
            <TextField
              value={addWriter.genres}
              label="What Genres Do You Write In?"
              variant="outlined"
              color="primary"
              fullWidth
              onChange={(event) => handleGenres(event)}
            />
          </Grid>

          <Grid item xs={12} padding="10px">
            <FormControl>
              <InputLabel color="primary">
                What Are You Most Excited to Offer Others?
              </InputLabel>
              <Select
                className={classes.select}
                labelId="select-skill"
                id="skill-select"
                value={addWriter.skill}
                label="skill"
                color="primary"
                onChange={(event) => handleSkill(event)}
              >
                <MenuItem value={1}>
                  Big-Picture Developmental Editing Skills
                </MenuItem>
                <MenuItem value={2}>Keen Copy/Line Editing Skills</MenuItem>
                <MenuItem value={3}>
                  Supportive Accountability Buddy Vibes
                </MenuItem>
                <MenuItem value={4}>
                  Being an Involved Critique Group Member
                </MenuItem>
                <MenuItem value={5}>Full Manuscript Swap and Critique</MenuItem>
                <MenuItem value={6}>
                  World-Building (Fantasy/Sci-Fi) Know-How
                </MenuItem>
                <MenuItem value={7}>
                  Experience in Publishing/Marketing
                </MenuItem>
                <MenuItem value={8}>Community/Socializing/Networking</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} padding="10px">
            <FormControl>
              <InputLabel color="primary">
                What Are You Primarly Looking For?
              </InputLabel>
              <Select
                className={classes.select}
                labelId="select-seeking"
                id="seeking-select"
                value={addWriter.seeking}
                label="seeking"
                color="primary"
                onChange={(event) => handleSeeking(event)}
              >
                <MenuItem value={1}>
                  Great Developmental Editing Skills
                </MenuItem>
                <MenuItem value={2}>
                  Eagle-Eyed Copy/Line Editing Skills
                </MenuItem>
                <MenuItem value={3}>
                  An Accountability Buddy to Set Goals With
                </MenuItem>
                <MenuItem value={4}>
                  A Critique Group that Meets Regularly
                </MenuItem>
                <MenuItem value={5}>A Full Manuscript Swap</MenuItem>
                <MenuItem value={6}>
                  I Need World-Building (Fantasy/Sci-Fi) Help!
                </MenuItem>
                <MenuItem value={7}>
                  Someone Who Knows the Publishing Biz
                </MenuItem>
                <MenuItem value={8}>Community/Socializing/Networking</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} padding="10px">
            <Typography marginBottom="10px">
              In the event of a Match, how would you like other writers to
              contact you?
            </Typography>
            <TextField
              value={addWriter.contact}
              label="Contact Info"
              variant="outlined"
              color="primary"
              fullWidth
              onChange={(event) => handleContact(event)}
            />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} padding="10px" marginBottom="10px">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={postWriter}
            >
              SUBMIT
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default CreateProfile;
