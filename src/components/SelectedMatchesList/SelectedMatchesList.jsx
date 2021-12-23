import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SelectedMatchesItem from '../SelectedMatchesItem/SelectedMatchesItem';


function SelectedMatchesList(props) {

  const user = useSelector((store) => store.user);
  const selected = useSelector((store) => store.selected);
  const dispatch = useDispatch();
  const [heading, setHeading] = useState('Current Matches');


  return (
    <div>
      <h2>{heading}</h2>
      {selected.map( selected=>( <SelectedMatchesItem selected={selected} />))}
    </div>
  );
}

export default SelectedMatchesList;
