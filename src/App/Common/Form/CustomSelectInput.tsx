import { useField } from 'formik';
import React from 'react'
import { Form, Label, Select } from 'semantic-ui-react';

interface Props{
  placeholder: string;
  name: string;
  options: any;
  label?: string;
}

const CustomSelectInput = (props:Props)=>{
  const [field, meta,helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{ props.label}</label>
      <Select
        clearable
        value={field.value || null}
        options={props.options}
        onBlur={()=>helpers.setTouched(true)}
        onChange={(e, d) => helpers.setValue(d.value)}
        placeholder={props.placeholder}
      ></Select>
      {meta.touched && meta.error ? (
        <Label basic color='red'>{ meta.error}</Label>
      ):null}
    </Form.Field>

  )

}

export default CustomSelectInput;