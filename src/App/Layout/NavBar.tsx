
import {observer} from 'mobx-react-lite'
import { Link } from "react-router-dom"
import React from 'react'

import { Button, Menu,Image, Dropdown } from 'semantic-ui-react'
import { useStore } from '../stores/store'
export default observer( function NavBar(){

  const { userStore } = useStore();
  const { user, logout } = userStore;

 return( 
  <Menu secondary>
 
  <Menu.Item>
       <Button as={Link} inverted color='orange' to='/Activities' style={{fontFamily:'Segoe UI'}}>Activities</Button>
         </Menu.Item>
     <Menu.Item>
     <Button as={Link} inverted color='orange' to='/createActivity' style={{fontFamily:'Segoe UI'}}>Create Activity</Button>
     </Menu.Item>
     {userStore.isLoggedIn &&
       <>
       <Menu.Item>
      
       </Menu.Item>
       <Menu.Item position='right' style={{marginRight:'100px'}}>
         <Image src={user?.image || '/assets/user/png'} avatar spaced='right' />
         <Dropdown pointing='top left' text={user?.displayName}>
         <Dropdown.Menu pointing='top left' text={user?.displayName}>
           <Dropdown.Item as={Link} to={`/profile/${user?.userName}`} text='My Profile'></Dropdown.Item>
             <Dropdown.Item as={Link} to='/' onClick={logout} text="Logout" icon="power"></Dropdown.Item>
           </Dropdown.Menu>
           </Dropdown>
       </Menu.Item>

       </>
     }
</Menu>
  
  
                  
  )
})
