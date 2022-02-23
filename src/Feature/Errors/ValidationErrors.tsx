 import React from 'react'
import { Message, MessageList } from 'semantic-ui-react'


interface Props{
  errors: string;
}

export default function ValidationErrors({ errors }: Props) {
  return (
    <Message error>
      
            <Message.Item >{errors}</Message.Item>
      
    </Message>
  )
}