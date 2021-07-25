import * as React from 'react';
import {
    PostDetailContainer,
    PostComment,
    PostSidebarContainer,
    PostContainer,
    DiscussionSection,
    HeadSection
} from './PostDetailStyles';
import {
    Button,
    Container,
    CssBaseline,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider, Fab, Icon, TextField
} from '@material-ui/core';
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PostComments from './PostComments';
import PostSidebar from './PostSidebar';
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Stack from "@material-ui/core/Stack";
import editorStyles from "../PostPage/PostPageStyles.module.css";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Draft from "../DraftJS/Draft";
import {makeStyles} from "@material-ui/styles";
import {useEffect} from "react";
const mockdata = {
    username:'user1',
    title: "hi there",
    content:"say hello to post detail",
    tag:'general'
}



export default function PostDetail (){
    const [open, setOpen] = React.useState(false);
    const [buttonText,setButtonText] = React.useState("like");
    const [theme,setTheme] = React.useState('blue')
    const changeText = (text) => {
        setButtonText(text);
    }
    const callText = () => {
        if (buttonText =="like" ){
            setButtonText("liked")
        }else{
            setButtonText("like")
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
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
                                <Box id='like-button-box'
                                    sx={{
                                        float:'left'
                                     }}>

                                    <Button
                                      variant = "contained"
                                      color = "primary"
                                      size = "small"
                                      startIcon ={<ThumbUpAltIcon />}
                                      onClick={() => callText()}
                                    >{buttonText}

                                    </Button>
                                </Box>
                                <Box id='reply-button-box'
                                            sx={{
                                                float:'right'
                                                }}>
                                    <Button style={{
                                        textTransform: 'none',
                                        }}  onClick={handleClickOpen}>
                                        Reply
                                    </Button>
                                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Reply</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                To reply the post, please enter your content here. We will send updates
                                                immediately.
                                            </DialogContentText>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Content"
                                                type="des"
                                                size="normal"
                                                multiline
                                                rows={4}
                                                defaultValue="write some comments here"
                                                fullWidth
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={handleClose} color="primary">
                                                Save
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
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


            </DiscussionSection>
        </PostContainer>
    );
}





