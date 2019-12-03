import React from 'react'
import { Grid, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { ActivityList } from './ActivityList';

interface IProps {
    activities: IActivity[]
}

export const ActivityDashboad: React.FC<IProps> = ({activities}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities}/>
                {/* <List>
                    {activities.map((activitiy) => (
                    <List.Item key={activitiy.id}>{activitiy.title}</List.Item>
                    ))}
                </List> */}
            </Grid.Column>
        </Grid>
    )
}
