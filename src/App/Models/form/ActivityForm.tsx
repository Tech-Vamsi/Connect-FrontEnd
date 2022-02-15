import { Form, Button,Spinner } from 'react-bootstrap'
import {ChangeEvent, useEffect, useState} from 'react'
import { useStore } from '../../stores/store';
import { observer } from "mobx-react-lite";
import React from 'react';
import {  Link, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

interface Props {
  submitting: boolean;
  routeChange: string |undefined ;
}

const ActivityForm = ({  routeChange,submitting }: Props) => {
  const { activityStore } = useStore();
  const { loadActivity, createActivity,updateActivity } = activityStore;
  const { id } = useParams<{ id: string }>();
  const navGate = useNavigate();
  
  const [activity, setActivity] = useState({
    id: '',
    title: '',
    time: '',
    description: '',
    category: '',
    city:'',
    venue: '',
  });

  useEffect(() => {
    if(id) loadActivity(id).then(activity=>setActivity(activity!))
  }, [routeChange,id, loadActivity])
  

function handleSubmit(event:any){
  event.preventDefault();
  if (activity.id.length===0)
  {
    activity.id = uuid();
   createActivity(activity).then(() =>navGate(`/activity/${activity.id}`));
  
  } else {
  updateActivity(activity).then(()=>navGate(`/activity/${activity.id}`));
 
    }
  
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    
    const { name, value } = event.target;
    setActivity({...activity,[name]:value})
  }

  return (
  
    <Form onSubmit={handleSubmit} style={{ width:"20vw",marginTop:"100px" ,border: '2px solid '}} autoComplete='off'>
      <Form.Group className="m-3 " controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" defaultValue={activity ? activity.title : ""} name='title' onChange={handleInputChange} />
   
      </Form.Group>
      <Form.Group className="m-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control type="Text" as="textarea" placeholder="Description" defaultValue={activity ? activity.description : ""} name='description' onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="m-3" controlId="formBasicPassword">
        <Form.Label>Category</Form.Label>
        <Form.Control type="Text" placeholder="Category" defaultValue={activity ? activity.category : ""} name='category' onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="m-3" controlId="formBasicPassword">
        <Form.Label>Date</Form.Label>
        <Form.Control type="Date" placeholder="Date" defaultValue={activity ? activity.time :''} name='time' onChange={handleInputChange} />
      </Form.Group>

      <Form.Group className="m-3" controlId="formBasicPassword">
        <Form.Label>City</Form.Label>
        <Form.Control type="Text" placeholder="City" defaultValue={activity ? activity.city : ""} name='city' onChange={handleInputChange} />
      </Form.Group>

      <Form.Group className="m-3" controlId="formBasicPassword">
        <Form.Label>Venue</Form.Label>
        <Form.Control type="Text" placeholder="Venue" defaultValue={activity ? activity.venue : ""} name='venue' onChange={handleInputChange} />
      </Form.Group>
      <Button variant="success" className="m-3" type="submit">
        {submitting &&
          <Spinner as="span"
          animation="border" 
          size="sm"
          role="status"
          aria-hidden="true">
          </Spinner>}
        Submit
      </Button>
      <Link  to={`/activities`}><Button  variant="danger"  type="button">
        Cancel
      </Button></Link>
    </Form>
  
  

  
  )
}
export default observer(ActivityForm);
