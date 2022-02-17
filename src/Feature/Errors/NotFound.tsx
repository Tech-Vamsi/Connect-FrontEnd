import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'


const NotFound = () => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     navgate('/activities');
  //   }, 5000);
  // })
  return (
    <Segment placeholder style={{width:'100vw',height:'50vh'}}>
      <Header icon>
        <Icon name='search'>
          Oops- Could not find this
        </Icon>
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities" primary>
          Return to Home Page
        </Button>

      </Segment.Inline>
    </Segment>
  )
}
export default NotFound;