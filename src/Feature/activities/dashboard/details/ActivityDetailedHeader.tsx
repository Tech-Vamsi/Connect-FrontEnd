import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment} from 'semantic-ui-react'
import { Activity } from '../../../../App/Models/Activity';




interface Props {
    activity: Activity 
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
 
    return (
        <Segment.Group style={{width:'700px',marginTop:'30px'}}>
            <Segment basic attached='top' style={{padding: '0'}}>
                {/* <Image src={`/assets/categoryImages/${activity?:activity.category}.jpg`} fluid style={activityImageStyle}/> */}
                <Segment style={{ postion:'absolute',bottom:'5%',left:'5%',width:'100%',height:'auto',color:'white' }} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(activity.time!,'dd MMM yyyy h:mm aa')}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button  style={{backgroundColor:'#03C03C',color:'white'}} >Join Activity</Button>
                <Button style={{backgroundColor:'#CC0000',color:'white'}}>Cancel attendance</Button>
                <Button  as={Link} to={`/edit/${activity.id}`} style={{backgroundColor:'#FFD700',color:'white'}} floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})
