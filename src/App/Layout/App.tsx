import { observer } from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar  from "../Layout/NavBar";
import ActivityDashboard from '../../Feature/activities/dashboard/ActivityDashboard';
import HomePage from '../../Feature/home/HomePage';
import React, { useEffect } from 'react';
import ActivityForm from '../Models/form/ActivityForm';
import { Route, Routes, useLocation} from 'react-router-dom'
import ActivityDetails from '../../Feature/activities/dashboard/details/ActivityDetails';
import '../../../src/App.css'
import LoginForm from '../../Feature/Users/LoginForm';
import { useStore } from '../stores/store';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import ModalContainer from '../Common/modal/ModalContainer';
import RegisterForm from '../../Feature/Users/RegisterForm';
import ProfilePage from '../../Feature/Profiles/ProfilePage';
function App() {

  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => {
        commonStore.setAppLoaded();
      })
    } else {
      commonStore.setAppLoaded();
    }
  },[commonStore,userStore])
 
  if(!commonStore.appLoaded){
    return (

      <Segment style={ {border:'none',width:'100%',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Segment>
    )}

  return (
    <div style={{height:'auto',width:'100vw'}} >
      <NavBar />
      <ModalContainer ></ModalContainer>
      <div className="d-flex justify-content-center">
     
        <Routes>
         
        <Route path="/" element={<HomePage />} />
        <Route path="/activities" element={<ActivityDashboard submitting={false} />} /> 
        <Route path="/activity/:id" element={<ActivityDetails  />} /> 
          <Route key={location.key} path={'/createactivity'} element={<ActivityForm  submitting={false} /> } /> 
          <Route  key={location.key} path='/edit/:id' element={<ActivityForm  submitting={false} />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Register" element={<RegisterForm />} />
          <Route path="/profile/:username" element={<ProfilePage/>}/>
      {/* <Route path="*" element={<NotFound/>}/>       */}
        </Routes>
      </div>
      </div>
  );
}

export default observer(App);
