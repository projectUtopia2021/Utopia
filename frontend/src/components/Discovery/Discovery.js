import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { Link } from '@material-ui/core';
import CommunityCard from './CommunityCard';
import CreateCommunity from '../Communities/CreateCommunity';

export default function Discovery (props) {
    const [searchCommunityList, setSearchCommunityList] = React.useState(
        props.location.state.currentSearchResult);

    useEffect (() => {
      setSearchCommunityList(props.location.state.currentSearchResult)
    }, [props.location]);

    const handleJoinCommunity = (id, name) => {
      return isLoggedIn? subscribeCommunity(id, name): null;
    }

    const subscribeCommunity = (id, name) => {
      const newCommunity = {
        "communityId": id,
        "communityName": name
      }
      var list = communityList;
      list.push(newCommunity)
      setUserCommunityList(list)
      if(localStorage.getItem('token') && localStorage.getItem('username')){
          const token = JSON.parse(localStorage.getItem('token')).jwtToken
          axios.patch(SUBSCRIBE_COMMUNITY + username, {
            communities: list
          }, {
            headers:{
              'Authorization': `Bearer ${token}`
            }
          }).then(
            response => {
              alert("you joined successfully")
            }
          ).catch(error => {
            alert(error)
          })
      }
      
    }

    return (
        <React.Fragment>
        <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h5" color="text.secondary" fontWeight="fontWeightBold" paragraph>
              All Results:
            </Typography>
          {/* End hero unit */}
          {searchCommunityList? (
            <Grid container spacing={3}>
            {searchCommunityList.map((community) => (
              <Grid item key={community.id} xs={12} sm={6} md={4}>
                <CommunityCard community={community}/>
              </Grid>
            ))}
          </Grid>)
            :
            (<Typography variant="h6"> 
              Sorry, no relevant community.&nbsp;
              <Link color='inherit' onClick={() => props.history.push('/community/create')}>
              Create a community?
              </Link>
              
            </Typography>)
              
            }
          
        </Container>
        </React.Fragment>
    );
}