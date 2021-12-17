import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function CreateProfile(props) {

  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const user = useSelector(( store) => store.user );
  const history = useHistory();
  const [heading, setHeading] = useState('Create Profile');

  const[ addWriter, setAddWriter ]=useState( {
    name: '',
    image: '',
    bio: '',
    wip: '',
    genre: 0,
    skill: 0,
    seeking: 0,
    contact: '',
    user_id: user.id
} );

const postWriter = ()=>{
  console.log( 'in postWriter' );
  console.log( addWriter );
  dispatch({
      type: 'POST_WRITER',
      payload: addWriter
  });
  history.push( '/profile' );
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


const handleGenre = (event )=>{ //input capture
  console.log( 'in handleGenre:', event.target.value);
  setAddWriter( {...addWriter, genre: Number(event.target.value)} );
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
    <div>
      <h2>{heading}</h2>
      <p>Name: </p><input type='text' placeholder='name' onChange={(event ) =>handleName ( event )}></input>
      <p>Profile Image URL: </p><input type='text' placeholder='image url' onChange={(event ) =>handleImage ( event )}></input>
      <p>Bio: </p><textarea type='text' placeholder='bio' onChange={(event ) =>handleBio ( event )}></textarea>
      <p>Describe Your Work In Progress: </p><input type='text' placeholder='wip' onChange={(event ) =>handleWip ( event )}></input>
      <label>Select a Genre for your WIP: </label>
            <select name="genre" id="genre" onChange={(event ) =>handleGenre ( event )}>
                <option value="1">Science Fiction/Fantasy</option>
                <option value="2">Memoir</option>
                <option value="3">Young Adult/Middle Grade</option>
                <option value="4">Picture Books</option>
                <option value="5">Mystery</option>
                <option value="6">Romance</option>
                <option value="7">Historical Fiction</option>
                <option value="8">Thriller</option>
            </select>
      <br />
      <label>What Is Your Primary Skill?</label>
      {/* would like to change this to 'What are your skills?' */}
            <select name="skill" id="skill" onChange={(event ) =>handleSkill ( event )}>
                <option value="1">Developmental Editing</option>
                <option value="2">Copy/Line Editing</option>
                <option value="3">Accountability Buddy</option>
                <option value="4">Manuscript Swap</option>
                <option value="5">World-Building</option>
                <option value="6">Publishing Strategy</option>
            </select>
            <br />
      <label>What Are You Seeking On This Site?</label>
            <select name="seeking" id="seeking" onChange={(event ) =>handleSeeking ( event )}>
                <option value="1">Developmental Editing</option>
                <option value="2">Copy/Line Editing</option>
                <option value="3">Accountability Buddy</option>
                <option value="4">Manuscript Swap</option>
                <option value="5">World-Building</option>
                <option value="6">Publishing Strategy</option>
            </select>
            <br />
            <p>In the event of a match, how would you like other writers to contact you?</p>
            <input type='text' placeholder='contact info' onChange={(event ) =>handleContact ( event )}></input>
            <br />
            <button onClick={postWriter}>Submit Profile</button>
    </div>
  );
}

export default CreateProfile;
