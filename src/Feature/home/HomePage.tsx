import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Segment,Image } from 'semantic-ui-react'
import { useStore } from '../../App/stores/store';

const HomePage=() =>{
  const { userStore} = useStore();
  return (
<Segment inverted textAlign='center' vertical className='masthead' style={{width:'100vw',height:'100vh'}}>
      <Container>
        <Header as='h1' inverted>
          <Image size='massive' src='assets/logo.png' alt='logo' style={{marginBottom:12}}/>
          Connect
        </Header>
        {userStore.isLoggedIn ? (
          <>
           <Header style={{fontSize:'4rem',color:'white'}}>
           Welcome to Connect
           </Header>
           <Button as={Link} to='/activities' size='huge' style={{marginTop:'100px'}} > Take me to Activities</Button>
          </>) : (
            <>
              <Button as={Link} to='/Login' size='huge' style={{ marginTop: '100px' }} > Login</Button>
              <Button as={Link} to='/Register' size='huge' style={{marginTop:'100px'}} > Register</Button>
            </>

           )}
       
      </Container>
</Segment>

    
  )
}
export default observer(HomePage);