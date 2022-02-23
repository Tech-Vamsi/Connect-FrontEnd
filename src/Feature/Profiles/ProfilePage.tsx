import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../App/stores/store'
import ProfileContent from './ProfileContent'
import ProfileHeader from './ProfileHeader'

export default observer(function ProfilePage() {
  const { username } = useParams<string>();
  const { profileStore } = useStore();
  const { loadProfile, profile } = profileStore;

  useEffect(() => {
    loadProfile(username!);
  },[loadProfile,username])
  return (
    <Grid style={{width:'100%'}}>
      <Grid.Column width={16}>
        {profile &&
          <ProfileHeader profiles={profile} />}
        {profile &&
          <ProfileContent profile={profile} />}
      </Grid.Column>
    </Grid>
    
  )
})