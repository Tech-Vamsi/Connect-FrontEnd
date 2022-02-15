import { observer } from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar  from "../Layout/NavBar";
import ActivityDashboard from '../../Feature/activities/dashboard/ActivityDashboard';
import HomePage from '../../Feature/home/HomePage';
import React from 'react';
import ActivityForm from '../Models/form/ActivityForm';
import { Route, Routes, useLocation } from 'react-router-dom'
import ActivityDetails from '../../Feature/activities/dashboard/details/ActivityDetails';
import '../../../src/App.css'
function App() {
  const location = useLocation();
 
  return (
    <div style={{height:'auto',width:'100%'}} >
       <NavBar/>
      <div className="d-flex justify-content-center">
     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activities" element={<ActivityDashboard submitting={false} />} /> 
        <Route path="/activity/:id" element={<ActivityDetails  />} /> 
        <Route key={location.key}  path='/createactivity' element={<ActivityForm routeChange={location.key } submitting={false}/>} /> 
        <Route key={location.key}  path='/edit/:id' element={<ActivityForm routeChange={location.key} submitting={false} />} />
      
        </Routes>
      </div>
      </div>
  );
}

export default observer(App);
