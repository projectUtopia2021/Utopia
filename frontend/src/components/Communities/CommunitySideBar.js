import * as React from 'react';
import { CommunityBar } from './CommunitiesStyles';
import TabContainer from 'react-bootstrap/TabContainer';
import {Row, Col, Tab, Navbar, Nav } from 'react-bootstrap';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { VerticalTabs, TheTab } from './CommunitiesStyles';
import { ClassNames } from '@emotion/react';
import { makeStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core';

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;
  
//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`vertical-tabpanel-${index}`}
//         aria-labelledby={`vertical-tab-${index}`}
//         {...other}
//       >
//         {value === index && (
//           <Box p={3}>
//             <Typography>{children}</Typography>
//           </Box>
//         )}
//       </div>
//     );
//   }
  
//   TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
//   };
  
function CommunitySideBar() {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return(
        <>
        <CommunityBar>
            <div >
            <CssBaseline />
            <Grid container 
            maxWidth="md" 
            spacing={5}>
                <Grid item xs={3} sx={{
                  pr:4, 
                  marginTop: 4,
                  pb: 2, }}>
                    <Typography 
                    variant="h4" 
                    fontWeight="fontWeightBold"
                    sx={{textAlign:"left"}}
                    Wrapper>
                        Discover
                    </Typography>
                    <VerticalTabs 
                        onChange={handleChange}
                        value={value}
                        sx={{pt:3}}
                        textColor="#A69FFC"
                        centered={false}
                        >
                            <TheTab  label="Animal Crossing: New Horizons" sx={{textAlign:'right'}} wrapped={true}/>
                            <TheTab  label="Community 2"  wrapped={true}/>
                            <TheTab  label="Community 3"  wrapped={true}/>
                            <TheTab  label="Community 4" wrapped={true}/>
                            <TheTab  label="Community 5" wrapped={true}/>
                    </VerticalTabs>
                </Grid>
                <Divider flexDirection='column'/>
                <Grid item xs={8} spacing={3} sx={{flexDirection: "column"}}>
                  
                </Grid>
            </Grid>
            </div>
        </CommunityBar>
        </>
    );
}

export default CommunitySideBar;