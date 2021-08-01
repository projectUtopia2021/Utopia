import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { Link } from '@material-ui/core';
import CommunityCard from './CommunityCard';
import axios from 'axios';
import { useSearchContext } from '../Context/SearchBarContext';
import { useUserContext } from '../Context/UserContext';

const GET_COMMUNITIES_API = "/api/communities/"

export default function Discovery (props) {
    const { searchContent, searchResultList, setResultList } = useSearchContext();
    const { isLoggedIn } = useUserContext();

    const handleCreateCommunity = () => {
      if(isLoggedIn){
        props.history.push('/community/create')
      }
      else{
        alert("Login to create community")
      }
    }
    useEffect (() => {
      axios.get(GET_COMMUNITIES_API + searchContent, {}).then(
            response => {
                const data = response.data;
                setResultList(response.data)
                }
        ).catch(error => {
          setResultList(undefined)
        })
    }, [props.location]);

    return (
        <React.Fragment>
        <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h5" color="text.secondary" fontWeight="fontWeightBold" paragraph>
              All Results:
            </Typography>
          {/* End hero unit */}
          {searchResultList? (
            <Grid container spacing={3}>
            {searchResultList.map((community) => (
              <Grid item key={community.id} xs={12} sm={6} md={4}>
                <CommunityCard community={community}/>
              </Grid>
            ))}
          </Grid>)
            :
            (<Typography variant="h6"> 
              Sorry, no relevant community.&nbsp;
              <Link color='inherit' onClick={() => handleCreateCommunity()}>
              Create a community?
              </Link>
              
            </Typography>)
              
            }
          
        </Container>
        </React.Fragment>
    );
}