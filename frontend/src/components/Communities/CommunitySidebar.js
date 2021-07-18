import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { CssBaseline, Divider, ListItem, ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Toolbar from '@material-ui/core/Toolbar';



export default function CommunitySidebar(){

    return (
        <Drawer 
                    PaperProps={{ style: { position: 'relative' } }}
                    BackdropProps={{ style: { position: 'relative' } }}
                    ModalProps={{
                        style: { position: 'absolute' }
                    }}
                    sx={{
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {  
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