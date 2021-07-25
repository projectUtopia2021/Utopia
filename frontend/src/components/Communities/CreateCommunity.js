import * as React from 'react'
import { MainContainer } from './CommunitiesStyles'
import { Box } from '@material-ui/system';
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";

const CREATE_COMMUNITY_API = '/api/community'

export default function CreateCommunity(props){
    const [communityName, setCommunityName] = useState('');
    const [cmnyDescription, setCmnyDescription] = useState("");
    const [creator, setCreator] = useState(props.creator);

    const handleCreate = () => {
        console.log(communityName, cmnyDescription)
    //     axios.post(CREATE_COMMUNITY_API, {headers: {
    //         'Authorization': `Bearer ${token}`
    //     }})
    }

    return(
        <React.Fragment>
            <MainContainer>
                <Box id="create_community_box" 
                sx={{
                    position: 'relative', 
                    display:'flex',
                    flexDirection:'column',
                     height:`calc(100vh - 50px)`, 
                     pt: 5
                     }}>
                    <Box id="title_box" style={{
                        flex:'1',
                    }}>
                        <Typography 
                            variant="h3"
                            gutterBottom>
                            Create Your Community
                        </Typography>
                    </Box>
                    <Box 
                        id="text_field_area" 
                        direction='column'
                        alignContent='center'
                        style={{
                            flex:'9',
                        }}>
                        <Box
                            id="create_community_form" 
                            maxWidth="md" 
                            width="60%"
                            direction='column'
                            alignContent='center'
                            sx={{
                                flexWrap:'wrap',  
                                }}>
                            <form noValidate autoComplete="off">
                                <Box sx={{py:1,}} >
                                <TextField
                                    required
                                    id="community_name_field"
                                    label="Community Name"
                                    variant="outlined"
                                    fullWidth={true}
                                    onChange={(event) => {
                                        console.log(event.target.value)
                                        setCommunityName(event.target.value)
                                    }}
                                    />
                                </Box>
                                <Box sx={{py:1}}>
                                <TextField
                                required
                                    id="community_description_field"
                                    label="Community Description"
                                    variant="outlined"
                                    fullWidth={true}
                                    multiline={true}
                                    rows={4}
                                    onChange={(event) => {
                                        console.log(event.target.value)
                                        setCmnyDescription(event.target.value)
                                    }}
                                    />
                                </Box>
                                <Box 
                                    id="submit_button_box"
                                    alignContent='right'
                                    width="50%"
                                    sx={{
                                        pt:1,
                                    }}>
                                    <Button 
                                        variant='contained'
                                        color="primary"
                                        onClick={handleCreate}
                                        size="medium"
                                        style={{
                                            textTransform: 'none', 
                                        }}>
                                        Create
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                    <Box id="create_community_footer" style={{
                        flex:'1'
                    }}>
                    </Box>
                </Box>
            </MainContainer>
        </React.Fragment>
    )
}