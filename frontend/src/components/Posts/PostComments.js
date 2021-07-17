import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import { Button, Container, CssBaseline, Divider } from '@material-ui/core';
import {Route} from "react-router-dom";
import {Component} from "react";
import $ from "jquery";
import Box from "@material-ui/core/Box";

const comment = [
    {
        user:'user1',
        comment:'hello'
    },
    {
        user:'user2',
        comment:'hello2'
    },
    
]

export default function PostComments(){
    return(
        <>
            <Container maxWidth="md">
                            <Grid container spacing={2} direction={'column'}>
                                {comment.map((comment) => (
                                <>
                                <Grid item key={comment}>
                                <Box
                                sx={{
                                        height: '50px', 
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
                                         {comment.user}
                                        </Typography>
                                        </div>

                                        <div style={{marginTop:5}}>
                                        <Typography paragraph={true}>
                                        {comment.comment}
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
                            <Divider/>
                            </>
                            ))}
                        </Grid>
                        </Container>
            <div className="content" id="content">
                <Route exact path="/PostComments" component={ListAllComments} />
            </div>
        </>
    );
}


//List all comments (from port /api/getComments)
class ListAllComments extends Component {

    constructor() {
        super();
        this.state = {list:[]};
        this.loadComments = this.loadComments.bind(this);
    }

    componentDidMount() {
        this.loadComments();
    }

    // Retrieve data via GET request and re-render page
    loadComments() {
        $.ajax({
            url:"http://localhost:8080/api/getComments",
            dataType:"json",
            success:function(response){
                //Update list and re-render page
                this.setState({list:response});
            }.bind(this)
        });
    }

    render() {
        return (
            <PostComments list={this.state.list} label="PostComments Here" />
        );
    }
}