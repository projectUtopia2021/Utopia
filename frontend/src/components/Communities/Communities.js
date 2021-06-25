import * as React from 'react';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { VerticalTabs } from './CommunitiesStyles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';

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

function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}

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
            spacing={4}>
                <Grid item xs={3}>
                    <Typography 
                    variant="h4" 
                    //fontFamily={'Jomburia', 'cursive'} 
                    fontWeight="fontWeightBold"
                    noWrap>
                        Discover
                    </Typography>
                    <VerticalTabs 
                        onChange={handleChange}
                        value={value}
                        indicatorColor={"primary"}
                        aria-label="Vertical tabs example">
                            <Tab label="Home" {...a11yProps(0)}  />
                            <Tab label="Gaming" {...a11yProps(1)}  />
                            <Tab label="Education" {...a11yProps(2)}  />
                            <Tab label="Science/Tech" {...a11yProps(3)} />
                    </VerticalTabs>
                </Grid>
                <Grid item xs={9}>
                    <Paper>paper</Paper>
                </Grid>
            </Grid>
        </div>
    );
}