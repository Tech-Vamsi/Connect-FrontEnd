import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from 'semantic-ui-react'
import { Profile } from '../../App/Models/Profile'

interface Props{
  profiles: Profile;
}

export default observer(function ProfileHeader({profiles}:Props) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image avatar size='small' src={profiles!.image|| '/assets/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Header as='h1' content={profiles!.displayName}></Header>
              </Item.Content>
            </Item>
            </Item.Group>
            </Grid.Column>
            <Grid.Column width={4}>
              <Statistic.Group>
                <Statistic label='Followers' value='5'></Statistic>
                <Statistic label='Following' value='42'></Statistic>
              </Statistic.Group>
              <Divider />
              <Reveal animated='move'>
                <Reveal.Content visible style={{ width: '100%'}}>
                  <Button fluid color='teal' content='Following'/>
                </Reveal.Content>
                <Reveal.Content  hidden visible style={{ width: '100%'}}>
                  <Button fluid color={true ? 'red' : 'green'} content={true ? 'Unfollow' : 'Follow'}/>
                </Reveal.Content>
              </Reveal>
            </Grid.Column>
          
       
      </Grid>
    </Segment>
  )
})