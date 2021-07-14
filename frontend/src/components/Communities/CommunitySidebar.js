import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { CssBaseline, Divider, ListItem, ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Toolbar from '@material-ui/core/Toolbar';

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

export default function CommunitySidebar(){

    return (
        <Drawer 
                    PaperProps={{ style: { position: 'relative' } }}
                    BackdropProps={{ style: { position: 'relative' } }}
                    ModalProps={{
                        // container: document.getElementById('drawer-container'),
                        style: { position: 'absolute' }
                    }}
                    sx={{
                    // width: `${drawerWidth}`, 
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { 
                                    // width: drawerWidth, 
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
                                    sx={{
                                    [`& .Mui-selected`]: {backgroundColor:'black'}
                                }}>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
    )
}