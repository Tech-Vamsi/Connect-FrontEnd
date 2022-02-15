import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Segment,Image } from 'semantic-ui-react'

export default function HomePage() {
  return (
<Segment inverted textAlign='center' vertical className='masthead' style={{width:'100vw',height:'100vh'}}>
      <Container>
        <Header as='h1' inverted>
          <Image size='massive' src='assets/logo.png' alt='logo' style={{marginBottom:12}}/>
          Connect
        </Header>
        <Header style={{fontSize:'4rem',color:'white'}}>
        Welcome to Connect
        </Header>
        <Button as={Link} to='/activities' size='huge' style={{marginTop:'100px'}} > Take me to Activities</Button>
      </Container>
</Segment>

    
  )
}