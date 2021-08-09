import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useEffect } from 'react';
import { Link } from '@material-ui/core';
import CommunityCard from './CommunityCard';
import axios from 'axios';
import { useUserContext } from '../Context/UserContext';
import { useParams } from 'react-router-dom';

const GET_COMMUNITIES_API = "/api/communities/";
const USER_COMMUNITY_API = "/api/user/community/";

export default function Discovery (props) {
     const [searchResultList, setSearchResultList] = React.useState([]);
     const [communityList, setCommunityList] = React.useState([]);
     const { isLoggedIn } = useUserContext();
     const { toSearch } = useParams();

     const handleCreateCommunity = () => {
       if(isLoggedIn){
         props.history.push('/community/create')
       }
       else{
         alert("Login to create community")
       }
     }

     useEffect (() => {
       axios.get(GET_COMMUNITIES_API + toSearch, {})
         .then(
             response => {
                 const data = response.data;
                 setSearchResultList(response.data)
                 }
         ).catch(error => {
           setSearchResultList(undefined)
         })
     }, [props.location]);

     const handleJoinCommunity = (id, name) => {
       return isLoggedIn? subscribeCommunity(id, name): null;
     }

     useEffect(() =>{
        console.log('hi');
        if(localStorage.getItem('token')){
                 const token = JSON.parse(localStorage.getItem('token')).jwtToken;
                 console.log(token)
                 axios.get(USER_COMMUNITY_API, {headers:{Authorization : `Bearer ${token}`}}).then(
                                                  response => {
                                                      const data = response.data;
                                                      console.log(data);
                                                      setCommunityList(data);
                                                      }
                                              ).catch(error => {
                                                setCommunityList(undefined);
                                                console.log(error);
                                              })
         }

     }, []);


     const subscribeCommunity = (id, name) => {
       const newCommunity = {
         "communityId": id,
         "communityName": name
       }
       if(localStorage.getItem('token')){
           const token = localStorage.getItem('token');
           console.log(token);
           communityList.add(name);
           setCommunityList(communityList);
           axios.patch(USER_COMMUNITY_API, {
             communities: communityList
           }, {
             headers:{
               Authorization : `Bearer ${token}`
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
           {searchResultList? (
             <Grid container spacing={3}>
             {searchResultList.map((community) => (
               <Grid item key={community.id} xs={12} sm={6} md={4}>
                 <CommunityCard community={community} communityList={communityList} history={props.history}/>
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