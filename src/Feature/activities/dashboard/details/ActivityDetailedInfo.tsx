import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import { Activity } from '../../../../App/Models/Activity';

interface Props {
    activity: Activity
}

export default observer(function ActivityDetailedInfo({activity}: Props) {
    return (
        <Segment.Group style={{width:'700px'}}>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large'  style={{backgroundColor:'white',color:'#082567'}} name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{activity.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' style={{backgroundColor:'white',color:'#082567'}}/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {format(activity.time!,'dd MMM yyyy h:mm aa')}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large'  style={{backgroundColor:'white',color:'#082567'}}/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{activity.venue}, {activity.city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})