import * as React from 'react';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { VerticalTabs, TheTab } from './CommunitiesStyles';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Community from './Community';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function Communites(props) {
    const [communities, setCommunities] = useState([]);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div>
            <CssBaseline />
            <Grid container 
            maxWidth="md" 
            sx={{pt:8, pb: 6, px: 30}}
            spacing={5}>
                <Grid item xs={2} sx={{
                  bgcolor: 'background.paper', 
                  pr:4, 
                  borderRadius:5,
                  marginTop: 4,
                  pb: 2}}>
                    <Typography 
                    //variant="h4" 
                    fontWeight="fontWeightBold"
                    sx={{textAlign:"center"}}
                    Wrapper>
                        Discover
                    </Typography>
                    <VerticalTabs 
                        onChange={handleChange}
                        value={value}
                        sx={{pt:3}}
                        textColor="#A69FFC">
                            <TheTab  label="Home" Wrapper/>
                            <TheTab  label="Gaming"  Wrapper/>
                            <TheTab  label="Education"  Wrapper/>
                            <TheTab  label="Science/Tech" Wrapper/>
                            <TheTab  label="Entertainment" Wrapper/>
                    </VerticalTabs>
                </Grid>
                <Grid item xs={10} spacing={4} sx={{flexDirection: "column"}}>
                  <Community>

                  </Community>
                </Grid>
            </Grid>
        </div>
    );
}