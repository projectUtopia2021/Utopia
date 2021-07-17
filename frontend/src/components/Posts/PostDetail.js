import * as React from 'react';
import {
    PostDetailContainer, 
    PostComment, 
    PostSidebarContainer, 
    PostContainer,
    DiscussionSection,
    HeadSection
} from './PostDetailStyles';
import { Button, Container, CssBaseline, Divider } from '@material-ui/core';
import { Box } from '@material-ui/system';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PostComments from './PostComments';
import PostSidebar from './PostSidebar';

const mockdata = {
    username:'liyuan',
    title: "hi there",
    content:"say hello to post detail",
    tag:'general'
}

export default function PostDetail (){
    return(
        <PostContainer>
        <HeadSection>
        <Box
            sx={{
                bgcolor: 'white',
                pt: 3,
                pb: 2,
            }}
             >
          <Container maxWidth="sm">
            <Typography
              component="h5"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {mockdata.title}
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              {mockdata.tag}
            </Typography>
          </Container>
        </Box>
        </HeadSection>

        <DiscussionSection>
            <PostDetailContainer >
            <CssBaseline/>
            <Box sx={{
                display:'flex',  
                bgcolor:'white',
                mt:3,
                borderRadius:1
                }}>
                <PostComment>
                    <Container id="post-detail-area" maxWidth="md">
                        <Grid container direction='column'>
                        <Grid item >
                                <Box
                                sx={{   
                                        //height: '50px', 
                                        display: 'flex', 
                                        flexDirection: 'row',
                                        width:'100%',
                                        //alignItems:'center',
                                        mt: 3,
                                        mb:3
                                        }}>
                                        <div style={{
                                            alignItems:'center',
                                            }}
                                            >
                                                <Avatar 
                                                    src="/broken-image.jpg" 
                                                    style={{ 
                                                        height: '55px', 
                                                        width: '55px'
                                                        }}/>
                                        </div>
                                        
                                        <Container sx={{height:'80%'}}>
                                        <div>
                                        <Typography variant="h6" component="h2" fontWeight='bold'>
                                         {mockdata.username}
                                        </Typography>
                                        </div>

                                        <div style={{marginTop:5}}>
                                        <Typography paragraph={true}>
                                        {mockdata.content}
                                        </Typography>
                                        </div>

                                        </Container>
                                        
                                </Box>
                                <Box id='reply-button-box' 
                                            sx={{
                                                float:'right'
                                                }}>
                                    <Button style={{
                                        textTransform: 'none', 
                                        }}>
                                        Reply
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                    <Divider/>
                    <PostComments/>
                </PostComment>
                <Divider orientation="vertical" flexItem/>
                <PostSidebarContainer>
                    <PostSidebar/>
                 </PostSidebarContainer>
            </Box>
            </PostDetailContainer>
            {/* todo: reply editor*/}
            </DiscussionSection>
        </PostContainer>
    );
}