import React from 'react'
import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'
const ActivityFilters = () => {
  return (
    <>
    <Menu vertical size='large' style={{ width: '100%' }}>
      <Header icon='filter' attached color='teal'>Filters</Header>
      <Menu.Item>All Activities</Menu.Item>
      <Menu.Item>I'm going</Menu.Item>
      <Menu.Item>I'm hosting</Menu.Item>
      </Menu>
      <Header></Header>
      <Calendar/>
      </>
  )
}
export default ActivityFilters;