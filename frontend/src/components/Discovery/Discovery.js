import * as React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { Link } from '@material-ui/core';
import { useUserContext } from '../Context/UserContext';
import axios from 'axios';

const SUBSCRIBE_COMMUNITY = '/api/user/'

export default function Discovery (props) {
    const location = useLocation()
    const [searchCommunityList, setSearchCommunityList] = React.useState(props.location.state.currentSearchResult);
    const { isLoggedIn, username, communityList, setUserCommunityList } = useUserContext()

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
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" fontWeight="fontWeightBold">
                      {community.name}
                    </Typography>
                    <Typography>
                      {community.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    {communityList.some(c => {
                      console.log("community: ", c.communityId)
                      console.log("current community id: ", community.id)
                      console.log(c.communityId === community.id)
                      return c.commnuityId === community.id})? 
                    console.log("yes, joined"):
                    console.log("not joined")}
                    <Button size="small" 
                      onClick={() => {
                        handleJoinCommunity(community.id, community.name)
                      }}>
                          Join
                          </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>)
            :
            (<Typography variant="h6"> 
              Sorry, no relevant community.&nbsp;
              <Link color='inherit'>
              Create a community?
              </Link>
              
            </Typography>)
              
            }
          
        </Container>
        </React.Fragment>
    );
}