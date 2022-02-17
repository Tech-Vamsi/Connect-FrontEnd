import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../App/stores/store';

const ServerError = () => {

  const { commonStore } = useStore();

  return (
    <Container>
      <Header as='h1'>Server Error</Header>
      <Header sub as='h5' color='red'>{commonStore.error?.message}</Header>
      {commonStore.error?.details && 
        <Segment>
          <Header as='h4' color='black'>Stack Trace</Header>
          <code style={{ marginTop: '10px' }}>{ commonStore.error.details}</code>
        </Segment>}
    </Container>
  )
}
export default ServerError;