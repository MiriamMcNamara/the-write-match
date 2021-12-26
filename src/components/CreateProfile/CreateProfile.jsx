import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Typography, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  select: {
    minWidth: 300
  }
})


function CreateProfile(props) {

  const classes = useStyles();

  const dispatch = useDispatch();
  const user = useSelector(( store) => store.user );
  const history = useHistory();
  const [heading, setHeading] = useState('Create Profile');

  const[ addWriter, setAddWriter ]=useState( {
    name: '',
    image: '',
    bio: '',
    wip: '',
    genres: '',
    skill: '',
    seeking: '',
    contact: '',
    user_id: user.id
} );

const postWriter = ()=>{
  if (addWriter.name && addWriter.image && addWriter.bio && addWriter.wip && addWriter.genres
    && addWriter.skill && addWriter.seeking && addWriter.contact){
      console.log( 'in postWriter', addWriter)
  dispatch({
      type: 'POST_WRITER',
      payload: addWriter
  });
  history.push( '/profile' );
}//end if statement
else{
  alert ( 'All fields must be entered before proceeding' );
}
}

const handleName = (event )=>{ //input capture
  console.log( 'in handleName:', event.target.value);
  setAddWriter( {...addWriter, name: event.target.value} );
}

const handleImage = (event )=>{ //input capture
  console.log( 'in handleImage:', event.target.value);
  setAddWriter( {...addWriter, image: event.target.value} );
}

const handleBio = (event )=>{ //input capture
  console.log( 'in handleBio:', event.target.value);
  setAddWriter( {...addWriter, bio: event.target.value} );
}

const handleWip = (event )=>{ //input capture
  console.log( 'in handleWip:', event.target.value);
  setAddWriter( {...addWriter, wip: event.target.value} );
}


const handleGenres = (event )=>{ //input capture
  console.log( 'in handleGenre:', event.target.value);
  setAddWriter( {...addWriter, genres: event.target.value} );
}

const handleSkill = (event )=>{ //input capture
  console.log( 'in handleSkill:', event.target.value);
  setAddWriter( {...addWriter, skill: Number(event.target.value)} );
}

const handleSeeking = (event )=>{ //input capture
  console.log( 'in handleSeeking:', event.target.value);
  setAddWriter( {...addWriter, seeking: Number(event.target.value)} );
}

const handleContact = (event )=>{ //input capture
  console.log( 'in handleContact:', event.target.value);
  setAddWriter( {...addWriter, contact: event.target.value} );
}

  return (
    <Container>
    
    <Typography
      variant="h6"
      color="primary"
      component="h2"
      gutterBottom>
      Create Profile
    </Typography>

    <form noValidate autoComplete="off">
      <TextField
      className={classes.field}
      label="Name"
      variant="outlined"
      color="secondary"
      onChange={(event ) =>handleName ( event )}
      />

      <TextField
      className={classes.field}
      label="Image URL"
      variant="outlined"
      color="secondary"
      fullWidth
      onChange={(event ) =>handleImage ( event )}
      />

      <TextField
      className={classes.field}
      label="Bio"
      variant="outlined"
      color="secondary"
      multiline
      rows={4}
      fullWidth
      onChange={(event ) =>handleBio ( event )}
      />
        
        <TextField
      className={classes.field}
      label="Describe Your Work In Progress"
      variant="outlined"
      color="secondary"
      multiline
      rows={2}
      fullWidth
      onChange={(event ) =>handleWip ( event )}
      />

<TextField
      className={classes.field}
      label="What Genres Do You Write In?"
      variant="outlined"
      color="secondary"
      fullWidth
      onChange={(event ) =>handleGenres ( event )}
      />
      <FormControl>
<InputLabel color="secondary">What Is Your Primary Skill?</InputLabel>
<Select 
          className={classes.select}
          labelId="select-skill"
          id="skill-select"
          value={addWriter.skill}
          label="skill"
          color="secondary"
          onChange={(event ) =>handleSkill ( event )}
        >
          <MenuItem value={1}>Developmental Editing</MenuItem>
          <MenuItem value={2}>Copy/Line Editing</MenuItem>
          <MenuItem value={3}>Accountability Buddy</MenuItem>
          <MenuItem value={4}>Manuscript Swap</MenuItem>
          <MenuItem value={5}>World/Building</MenuItem>
          <MenuItem value={6}>Publishing Strategy</MenuItem>
          <MenuItem value={7}>Socializing</MenuItem>
        </Select>
        </FormControl>

<FormControl>
        <InputLabel color="secondary">What Are You Seeking on This Site?</InputLabel>
<Select 
          className={classes.select}
          labelId="select-seeking"
          id="seeking-select"
          value={addWriter.seeking}
          label="seeking"
          color="secondary"
          onChange={(event ) =>handleSeeking ( event )}
        >
          <MenuItem value={1}>Developmental Editing</MenuItem>
          <MenuItem value={2}>Copy/Line Editing</MenuItem>
          <MenuItem value={3}>Accountability Buddy</MenuItem>
          <MenuItem value={4}>Manuscript Swap</MenuItem>
          <MenuItem value={5}>World/Building</MenuItem>
          <MenuItem value={6}>Publishing Strategy</MenuItem>
          <MenuItem value={7}>Socializing</MenuItem>
        </Select>
        </FormControl>

<Typography>In the event of a Match, how would you like other writers to contact you?</Typography>
<TextField
      className={classes.field}
      label="Contact Info"
      variant="outlined"
      color="secondary"
      fullWidth
      onChange={(event ) =>handleContact ( event )}
      />

      <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={postWriter}
      >
        SUBMIT</Button>
  
    </form>


    </Container>
  );
}

export default CreateProfile;
