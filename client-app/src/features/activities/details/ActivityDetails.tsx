import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import ActivityDetailHeader from './ActivityDetailHeader';
import ActivityDetailInfo from './ActivityDetailInfo';
import ActivityDetailChat from './ActivityDetailChat';
import ActivityDetailSidebar from './ActivityDetailSidebar';
import { Grid } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
  id: string
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
  const rootStore = useContext(RootStoreContext);
  const {activity, loadActivity, loadingInitial} = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial) return <LoadingComponent content='Loading Activity...'/>

  if (!activity) return <h2>Activity Not Found</h2>

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity}/>
        <ActivityDetailInfo activity={activity}/>
        <ActivityDetailChat/>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailSidebar attendees={activity.attendees}/>
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDetails);
