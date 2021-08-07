import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { ListItem, ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Toolbar from '@material-ui/core/Toolbar';
import { useCommunitiesContext } from '../Context/CommunityContext';
import { useParams } from 'react-router';



export default function CommunitySidebar(props){
    const { joinedCommunities } = useCommunitiesContext()
    const { communityName } = useParams();

    const handleChangeIndex = (event, name) => {
        props.history.push(`/community/${name}`)
    }
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
                            {joinedCommunities.map((community, index) => (
                                <ListItem 
                                    button
                                    key={community.communityId}
                                    onClick={event => handleChangeIndex(event, community.communityName)}
                                    selected={communityName === community.communityName}
                                >
                                    <ListItemText primary={community.communityName}/>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
    )
}