import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {useStyles} from './ProfileStyles';
import { useState } from 'react';
import { useParams } from 'react-router';


const drawerWidth = 240;

function Profile() {
    
    const classes = useStyles();
    const { username } = useParams();

    return (
        <div>
            <Card className={classes.card} sx={{pl:20}}>
                <CardHeader
                    avatar={
                    <Avatar className={classes.avatar} aria-label="recipe">
                        R
                    </Avatar>
                    }
                    title={username}
                    subheader="Online"
                />
            </Card>
            <Box borderTop={1} id="drawer-container" sx={{position: 'relative', height: "1000px"}} >
                <Box sx={{ display: 'flex', width: '90%'}}>
                    <CssBaseline />
                    <Drawer
                        open={true}
                        onClose={() => {}}
                        PaperProps={{ style: { position: 'absolute' } }}
                        BackdropProps={{ style: { position: 'absolute' } }}
                        ModalProps={{
                          container: document.getElementById('drawer-container'),
                          style: { position: 'absolute' }
                        }}
                        variant="permanent"

                        className={classes.drawere}
                        sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box'},
                        }}
                    >
                        <Box sx={{ overflow: 'auto' }}>
                            <List>
                                {['Post', 'Discussion', 'Mention', 'Setting'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Drawer>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Toolbar />
                        <Typography paragraph>
                            It looks like there are no posts here.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </div>
        
  );
}


export default Profile;