import {  Formik,Form } from 'formik'
import React, { useEffect } from 'react'
import { Button, Label } from 'semantic-ui-react'
import CustomInput from '../../App/Common/Form/CustomInput'
import * as Yup from 'yup'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../App/stores/store'
import { useNavigate } from 'react-router-dom'

export default observer(function LoginForm() {

  const { userStore} = useStore();
  const navGate = useNavigate();

  var ValidationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required()
  })
  
  useEffect(() => {
    if(userStore.isLoggedIn) navGate('/')
  },[userStore,navGate])
  

  return (
    <Formik
      initialValues={{ email: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) => {
        userStore.login(values).then(() => {
          
          navGate('/')
        }).catch(error => setErrors({ error: 'Invalid email or password' }))
        setTimeout(() => {
          // navGate("/activities")
        },3000)
     
        
      }}
      validationSchema={ValidationSchema}
    >
      {({ handleSubmit,isValid,errors }) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <CustomInput name='email' placeholder='Email' type="email"/>
          <CustomInput name='password' placeholder='Password' type="password" />
          {errors.error && 
            <Label basic color='red'>{ errors.error}</Label>}
          <Button positive content='Login' disabled={!isValid} type='submit' fluid />
          

         
        </Form>
      )}

      </Formik>
  )
})


