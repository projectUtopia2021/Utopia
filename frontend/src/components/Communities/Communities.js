import * as React from 'react';
import { MainContainer, CommunityBar, PostDisplay } from './CommunitiesStyles.js';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { CssBaseline, Divider, ListItem, ListItemText } from '@material-ui/core';
import { Box } from '@material-ui/system';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';

const drawerWidth = 246;
const posts = [
    {
        title: "animal crossing wedding season mock data",
        postContent: "Join the wedding seacon in June!",
        author: "Liyuan",
        date: "2021/06/15",
    },
    {
        title: "animal crossing wedding season1 mock data",
        postContent: "Join the wedding seacon in June!",
        author: "Liyuan",
        date: "2021/06/15",
    },
    {
        title: "animal crossing wedding season2 mock data",
        postContent: "Join the wedding seacon in June!",
        author: "Liyuan",
        date: "2021/06/15",
    },
];

export default function Communities(props) {

    const loadCommunityPost  = () => {
        console.log("loading")
    }

    const loadUnjoinedCommunityPost = () => {

    }
    
    return (
        <>
            <MainContainer>
                <CssBaseline/>
                <Box id="drawer-container" sx={{position: 'relative',  height:`calc(100vh - 50px)`}}>
                <Box sx={{ display: 'flex'}}>
                    <CommunityBar>
                        
                    <Drawer 
                    PaperProps={{ style: { position: 'relative' } }}
                    BackdropProps={{ style: { position: 'relative' } }}
                    ModalProps={{
                        container: document.getElementById('drawer-container'),
                        style: { position: 'absolute' }
                    }}
                    sx={{
                    width: `${drawerWidth}`, 
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { 
                                    width: drawerWidth, 
                                    boxSizing: 'border-box', 
                                    backgroundColor:'inherit'}}}
                    variant='permanent'>
                    <Toolbar/>
                    <div style={{overflow:'auto'}}>
                        <div id='buttonContainer' style={{width:'80%', align:'center'}}>
                        <Button variant="outlined" color={'secondary'}  startIcon={<PostAddIcon />} fullWidth={true}>
                            Make a Post
                        </Button>
                        </div>
                    
                        <List>
                            {["unjoined community1", "unjoined Community2"].map((text) => (
                                <ListItem 
                                    button
                                    key={text}
                                    onSelect={loadUnjoinedCommunityPost}
                                    sx={{
                                    [`& .Mui-selected`]: {backgroundColor:'black'}
                                }}>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                        <Divider/>
                        <List>
                            {['Community1', "Community2"].map((text) => (
                                <ListItem 
                                    button
                                    key={text}
                                    onClick={loadCommunityPost}
                                    sx={{
                                    [`& .Mui-selected`]: {backgroundColor:'black'}
                                }}>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
                    </CommunityBar>
                <PostDisplay >
                <Box>
                        <Toolbar/>
                        <Container maxWidth="md">
                            <Grid container spacing={2} direction={'column'}>
                                {posts.map((post) => (
                                <Grid item key={post}>
                                <Card
                                sx={{ height: '100%', 
                                        display: 'flex', 
                                        flexDirection: 'row',
                                        }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Grid container >
                                        <Avatar  src="/broken-image.jpg"/>
                                        <Grid item sx={{pl:5}} sx={{pl:2}}>
                                        <Typography gutterBottom variant="h6" component="h2">
                                         {post.title}
                                        </Typography>
                                        <Typography>
                                        {post.postContent}
                                        </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                <CommentIcon fontSize={'medium'} sx={{mr:2}}>
                                </CommentIcon>
                                </CardActions>
                                </Card>
                            </Grid>
                            ))}
                        </Grid>
                        </Container>
                </Box>
                </PostDisplay>
                
                </Box>
                </Box>
            </MainContainer>
        </>
    );
}