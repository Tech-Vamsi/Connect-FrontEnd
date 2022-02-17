
import { useField } from 'formik';
import React from 'react'
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker'

interface Props{
  placeholder: string;
  name: string;
  label?: string;
}

const CustomDatePicker = (props:Props)=>{
  const [field, meta,helpers] = useField(props.name);
  
  return (
    <Form.Field error={meta.touched && !!meta.error}>
     
      <DatePicker
      
       onChange={(date) =>helpers.setValue(date) }
       locale="en-IN"
       showTimeSelect
       timeFormat="p"
       timeIntervals={15}
        dateFormat="MMMM d,yyyy h:mm aa"
        minDate={new Date()}
        selected={(field.value && new Date(field.value)) || null}
      
      ></DatePicker>
      
      {meta.touched && meta.error ? (
        <Label basic color='red'>{ meta.error}</Label>
      ):null}
    </Form.Field>

  )

}

export default CustomDatePicker;