import * as React from 'react'
import { MainContainer } from './CommunitiesStyles'
import { Box } from '@material-ui/system';
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function CreateCommunity(props){
    const [communityName, setCommunityName] = useState('');
    const [cmnyDescription, setCmnyDescription] = useState("");
    const [creator, setCreator] = useState(props.creator);

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
                    <div id="title_box" style={{
                        flex:'1',
                        border:'1px solid',
                    }}>
                        <Typography 
                            variant="h3"
                            gutterBottom>
                            Create Your Community
                        </Typography>
                    </div>
                    <div id="text_field_area" style={{
                        flex:'9',
                        border:'1px solid',
                    }}>
                        <Container id="create_community_form" maxWidth="md" sx={{flexWrap:'wrap', border:'1px solid',}} >
                            <Grid container spacing={2}>
                                <form noValidate autoComplete="off">
                                    <div>
                                    <TextField
                                        required
                                        id="community_name_field"
                                        label="Community Name"
                                        variant="outlined"
                                        />
                                    </div>
                                </form>
                            </Grid>
                        </Container>
                    </div>
                    <div id="create_community_footer" style={{
                        flex:'1'
                    }}>
                    </div>
                </Box>
            </MainContainer>
        </React.Fragment>
    )
}