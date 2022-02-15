
import {observer} from 'mobx-react-lite'
import { Link } from "react-router-dom"
import React from 'react'

import { Menu } from 'semantic-ui-react'
export default observer( function NavBar(){
 return( 
  <Menu style={{backgroundImage: 'linear-gradient(to right, #FFFDE4, #005AA7)'}}>
 
  <Menu.Item>
         <Link to='/Activities' style={{fontFamily:'Segoe UI'}}>Activities</Link>
         </Menu.Item>
     <Menu.Item>
     <Link to='/createActivity' style={{fontFamily:'Segoe UI'}}>Create Activity</Link>
  </Menu.Item>
</Menu>
  //   <Navbar bg="dark" variant="dark" expand="lg" >
  //   <Container>
  //   <Link  to='/' >Navbar</Link>
  //       <Nav className="d-flex justify-content-between" >
  //         <Link to='/Activities'><Button variant="primary" >Activities</Button></Link>
  //     {/* <Nav.Link href="#home" classNameName="fs-4" >Activities</Nav.Link> */}
  //     <Link to='/createActivity'><Button variant="warning" >Create Activity</Button></Link>
  //   </Nav>
  //   </Container>
  // </Navbar>
  
                  
  )
})
