import {  Formik,Form} from 'formik'
import React from 'react'
import { Button, Label,  } from 'semantic-ui-react'
import CustomInput from '../../App/Common/Form/CustomInput'
import * as Yup from 'yup'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../App/stores/store'
import { useNavigate } from 'react-router-dom'

export default observer(function RegisterForm() {

  const { userStore } = useStore();
  const navGate = useNavigate();

  var ValidationSchema = Yup.object({
    displayname: Yup.string().required(),
    username:Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required()
  })
  
  

  return (
    <Formik
      initialValues={{ displayname:'',username:'',email: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) => {
        userStore.register(values).then(() => {
          navGate("/Login")
        }).catch(error => setErrors(error))
        
        
     
        
      }}
      validationSchema={ValidationSchema}
    >
      {({ handleSubmit,isValid,errors}) => (
        <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
          <CustomInput name='displayname' placeholder='displayname' type="text" />
          <CustomInput name='username' placeholder='username' type="text"/>
          <CustomInput name='email' placeholder='Email' type="email"/>
          <CustomInput name='password' placeholder='Password' type="password" />
          {errors.error && (
            <Label basic color='red' content={ errors.error}/>)}
          <Button positive content='Register' disabled={!isValid} type='submit' fluid />
          
        </Form>
      )}

      </Formik>
  )
})


