import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
      history.push( '/profile' );
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    
      <Grid container padding="10px" backgroundColor="lightblue" sx={{ border: 5, borderColor: "secondary.main" }}>
    <form  onSubmit={login}>

      <Grid item xs={12} >
      <Typography variant="h4" fontStyle="italic">Login</Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      </Grid>

      <Grid item>
        <label htmlFor="username"><Typography margin="10px">
          Username:
          </Typography><TextField 
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </Grid>
      <Grid item>
        <label htmlFor="password"><Typography margin="10px">
          Password:
          </Typography><TextField 
          id="password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </Grid>
      
      <Grid item paddingTop="10px">
        <input className="btn" type="submit" name="submit" value="LOG IN" />
      </Grid>
      
    </form>
    </Grid>
  
  );
}

export default LoginForm;
