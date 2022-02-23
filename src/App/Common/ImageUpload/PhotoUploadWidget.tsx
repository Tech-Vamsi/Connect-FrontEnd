import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Button, Grid, Header } from 'semantic-ui-react'
import PhotoWidetCropper from './PhotoWidgetCropper'
import PhotoWidgetDropZone from './PhotoWidgetDropZone'

interface Props{
  uploadPhoto: (file: Blob) => void;
}

export default observer(function PhotoUploadWidget({uploadPhoto}:Props) {
  
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper)
    {
      cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
      }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => {
        URL.revokeObjectURL(file.preview);
        
      });
    }
  },[files])

  return (
    <Grid>
      <Grid.Column width={4}>
      <Header color='teal' content='Step 1 - Select Photo'></Header>
        <PhotoWidgetDropZone setFiles={setFiles}/>
      </Grid.Column>
      <Grid.Column width={1}/>
      <Grid.Column width={4}>
        <Header color='teal' content='Step 2 - Resize Photo'></Header>
        {files && files.length > 0 &&
          
          <PhotoWidetCropper setCropper={setCropper} imagePreview={files[0].preview}/>
          
        }
      </Grid.Column>
      <Grid.Column width={1}/>
      <Grid.Column width={4}>
        <Header color='teal' content='Step 3 - Preview & Upload'></Header>
        {files && files.length > 0 &&
          <>
            <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }}/>
            <Button.Group width={2}>
              <Button onClick={onCrop} positive icon='check' />
              <Button onClick={() => setFiles([])} positive icon='close' />
            </Button.Group>
          </>
        }
      </Grid.Column>
  </Grid>  
  )
})