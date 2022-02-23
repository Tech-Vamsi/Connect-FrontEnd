import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Label, Segment} from 'semantic-ui-react'
import { Activity } from '../../../../App/Models/Activity';
import { useStore } from '../../../../App/stores/store';




interface Props {
    activity: Activity 
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {

    const { activityStore:{updateAttendence,cancelActivityToggle} } = useStore();
 
    return (
        <Segment.Group style={{width:'700px',marginTop:'30px'}}>
            <Segment basic attached='top' style={{ padding: '0' }}>
                {activity.isCancelled && 
                    <Label style={ {position:'absolute',zIndex:1000,left:-14,top:20}} ribbon color='red'>Cancelled</Label>}
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
                                    Hosted by <strong><Link to={ `/profile/${activity.host?.username}`}>{ activity.host?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {activity.isHost ? (
                    <>
                        <Button color={activity.isCancelled ? 'green' : 'red'}
                            floated='left'
                            basic
                            content={activity.isCancelled ? 'Re-Activate Activity' : 'Cancel Activity'}
                            onClick={cancelActivityToggle}
                        ></Button>
                    <Button as={Link} to={`/edit/${activity.id}`} style={{ backgroundColor: '#FFD700', color: 'white' }} floated='right' disabled={activity.isCancelled}>
                    Manage Event
                        </Button>
                        </>
                ) : activity.isGoing ? (
                       
                <Button style={{backgroundColor:'#CC0000',color:'white'}} onClick={updateAttendence} disabled={activity.isCancelled}>Cancel attendance</Button> 
                ):(<Button  style={{backgroundColor:'#03C03C',color:'white'}} onClick={updateAttendence} disabled={activity.isCancelled}>Join Activity</Button>)}

                
               
            </Segment>
        </Segment.Group>
    )
})
