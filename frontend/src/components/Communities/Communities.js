import * as React from 'react';
import { MainContainer, CommunityBar, PostDisplay } from './CommunitiesStyles.js';
import Toolbar from '@material-ui/core/Toolbar';
import { CssBaseline } from '@material-ui/core';
import { Box } from '@material-ui/system';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import CommunitySidebar from './CommunitySidebar.js';

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
        title: "animal crossing wedding season2 mock dataasf",
        postContent: "Join the wedding seacon in June!",
        author: "Liyuan",
        date: "2021/06/15",
    },
];

export default function Communities(props) {
    
    return (
        <>
            <MainContainer>
                <CssBaseline/>
                <Box id="drawer-container" sx={{position: 'relative',  height:`calc(100vh - 50px)`}}>
                <Box sx={{ display: 'flex'}}>
                    <CommunityBar>
                        <CommunitySidebar/>
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