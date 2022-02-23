import { Formik } from 'formik';
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Segment, Header, Comment, Form, Button } from 'semantic-ui-react'
import CustomTextArea from '../../../../App/Common/Form/CustomTextArea';
import { useStore } from '../../../../App/stores/store';
import * as Yup from 'yup'
interface Props{
    activityId: string;
}

export default observer(function ActivityDetailedChat({ activityId }: Props) {
    
    const { commentStore } = useStore();

    useEffect(() => {
        if (activityId) {
            commentStore.createHubConnection(activityId);
            
        }
        return () => {
            commentStore.clearComments();
        }
    },[commentStore,activityId])
    return (
        <div style={{width:'700px'}}>
            <Segment
                textAlign='center'
                attached='top'
                inverted
               // color='teal'
                style={{border: 'none',background:'#082567',color:'white'}}
            >
                <Header >Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
            <Formik
                        onSubmit={(values, { resetForm }) => {
                            commentStore.addComment(values).then(()=>resetForm())
                        }}
                        initialValues={{ body: '' }}
                        validationSchema={Yup.object({
                            body:Yup.string().required()
                        })}
                    >
                        {({ isSubmitting, isValid,handleSubmit }) => (
                          <Form onSubmit={handleSubmit} >
                                <CustomTextArea placeholder='Add Comment' name='body' row={2} />
                                <Button
                                    disabled={isSubmitting || !isValid}
                                    content='Add Reply'
                                    labelPosition='left'
                                    icon='edit'
                                    primary
                                    type="submit"
                                    floated='right'
                                ></Button>
                            </Form>
                        )}
                        </Formik>
                <Comment.Group>
                    {commentStore.comments.map((comment) => {
                      return   <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image||'/assets/user.png'}/>
                        <Comment.Content>
                                <Comment.Author as={Link} to={`/profile/${comment.username}`}>{ comment.displayName}</Comment.Author>
                            <Comment.Metadata>
                                <div>{comment.createAt}</div>
                            </Comment.Metadata>
                                <Comment.Text style={{whiteSpace:'pre-wrap'}}>{comment.body}</Comment.Text>
                            
                        </Comment.Content>
                    </Comment>
                    })}
                   
                </Comment.Group>
            </Segment>
        </div>

    )
})