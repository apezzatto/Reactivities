import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import {Header, Icon, List, Container} from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboad } from '../../features/activities/dashboard/ActivityDashboad';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        setActivities(response.data)
      });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboad activities={activities}/>
      </Container>
    </Fragment>
  );
}

export default App;
