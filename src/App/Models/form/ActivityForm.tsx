import {  Button,Spinner } from 'react-bootstrap'
import { useEffect, useState} from 'react'
import { useStore } from '../../stores/store';
import { observer } from "mobx-react-lite";
import React from 'react';
import {  useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { Formik,Form} from 'formik';
import { Activity } from '../Activity';
import CustomInput from '../../Common/Form/CustomInput';
import * as Yup from 'yup'
import CustomTextArea from '../../Common/Form/CustomTextArea';
import { CategoryOptions } from '../../Common/CategoryOptions';
import CustomSelectInput from '../../Common/Form/CustomSelectInput';
import CustomDatePicker from '../../Common/Form/CustomDatePicker';
import { controller } from '../../API/Agent';
import { setTimeout } from 'timers';
interface Props {
  submitting: boolean;
}

const ActivityForm = ({ submitting }: Props) => {
  const { activityStore } = useStore();
  const { loadActivity, createActivity, updateActivity } = activityStore;
  const { id } = useParams<{ id: string }>();
  const navGate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    time: null,
    description: '',
    category: '',
    city: '',
    venue: '',
  });

  const validator = Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required(),
    category: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    time: Yup.string().required(),
    
  })

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!))
  }, [activity, setActivity, id, loadActivity])
  

  const handleFormSubmit = (activity: Activity) => {
    //event.preventDefault();
    if (activity.id.length === 0) {
      activity.id = uuid();
      createActivity(activity).then(() =>
        
        setTimeout(() => {
          navGate(`/activity/${activity.id}`);
        }, 5000))
    
      }else {
      updateActivity(activity).then(() => 
        setTimeout(() => {
          navGate(`/activity/${activity.id}`);
        }, 5000));
      
 
    }
   
  }
  const handleCancel = () => {
    console.log("Aborted request");
    controller.abort()
  }
    //   }
    //   cons={handleChange}= (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    
    //     const { name, value } = event.target;
    //     setActivity({...activity,[name]:value})
    //   }

    return (
    
      <Segment clearing style={{ width: '50vw' }}>
   
        <Formik enableReinitialize={true} initialValues={activity} onSubmit={values => handleFormSubmit(values)} validationSchema={validator}>
          {({  handleSubmit,isValid,isSubmitting,dirty }) => (
            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          
              <CustomInput placeholder="Enter Title" name='title' ></CustomInput>
              <CustomTextArea placeholder="Description" row={3} name='description' ></CustomTextArea>
              <CustomSelectInput options={CategoryOptions} placeholder="Category" name='category'  ></CustomSelectInput>
              <CustomDatePicker placeholder="Date" name='time' ></CustomDatePicker>
              <CustomInput placeholder="City" name='city'  ></CustomInput>
              <CustomInput placeholder="Venue" name='venue' ></CustomInput>
              <Button variant="success"  disabled={!isValid && !isSubmitting} className="m-3" type="submit">
                {submitting &&
                  <Spinner as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true">
                  </Spinner>}
                Submit
              </Button>
             <Button variant="danger" onClick={handleCancel} type="button">
                Cancel
              </Button>
            </Form>
          )}

        </Formik>
   
      </Segment>
    
    
  
  

  
    )
  }


export default observer(ActivityForm);
