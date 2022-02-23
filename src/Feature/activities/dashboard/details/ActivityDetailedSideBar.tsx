import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Activity } from '../../../../App/Models/Activity'

interface Props {
    activity: Activity;
}
  
export default observer(function ActivityDetailedSidebar({ activity: { attendees, host } }: Props) {
    if(!attendees) return null
    return (
        <div style={{width:'300px'}}>
            <Segment
                textAlign='center'
                style={{ border: 'none',backgroundColor:'#082567',color:'white' }}
                attached='top'
                inverted
            >
                {attendees.length} {attendees.length===1?'People':'Peoples' } Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendees.map(attendee=>{
                        return <Item style={{ position: 'relative' }} key={attendee.username}>
                            {attendee.username === host?.username &&
                                <Label
                                    style={{ position: 'absolute', backgroundColor: '#CC0000', color: 'white' }}
                                    ribbon='right'
                                >
                                    Host
                                </Label>}
                         <Image size='mini' src={attendee.image || '/assets/user.png'} circular style={{border:'2px solid',borderColor:'#082567'}} />
                         <Item.Content verticalAlign='middle'>
                             <Item.Header as='h5'>
                                 <Link to={`#`}>{attendee.username}</Link>
                             </Item.Header>
                             <Item.Extra style={{ color: 'orange',fontSize:'1rem' }}>Following</Item.Extra>
                         </Item.Content>
                     </Item>
 
                    })}

{/*                    
                    <Item style={{ position: 'relative' }}>
              <Image size='mini' src={'/assets/user.png'} circular style={{border:'2px solid',borderColor:'#082567'}}/>
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h5'>
                                <Link to={`#`}>Tom</Link>
                            </Item.Header>
                            <Item.Extra style={{ color: 'orange',fontSize:'1rem' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item style={{ position: 'relative' }}>
                        <Image size='mini' src={'/assets/user.png'} circular style={{border:'2px solid',borderColor:'#082567'}}/>
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h5'>
                                <Link to={`#`}>Sally</Link>
                            </Item.Header>
                        </Item.Content>
                    </Item> */}
                </List>
            </Segment>
        </div>

    )
})
