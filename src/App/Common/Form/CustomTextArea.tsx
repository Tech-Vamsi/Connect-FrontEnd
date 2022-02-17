import { useField } from 'formik'
import React from 'react'
import { Form, Label, TextArea } from 'semantic-ui-react';

interface Props{
  placeholder: string;
  name: string;
  lablel?: string;
  row: number;
}

const CustomTextArea = (props: Props)=>{
  const [field, meta] = useField(props.name);
  
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <Label>{props.lablel}</Label>
      <TextArea {...field} {...props}></TextArea>
      {meta.touched && meta.error ? (
        <Label basic color='red'>{ meta.error}</Label>
      ):null}
    </Form.Field>
  )
}

export default CustomTextArea;