import * as React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useUserContext } from '../Context/UserContext';
import axios from 'axios';
import { useCommunitiesContext } from '../Context/CommunityContext';

const SUBSCRIBE_COMMUNITY_API = "/api/user/community/";

export default function SingleCommunity(props){
    const community = props.community
    const history = props.history
    const communityList = props.communityList
    const { isLoggedIn, username } = useUserContext()
    const { joinedCommunities, setJoinedList } = useCommunitiesContext()
    const [ subsribed, setSubsribed ] = React.useState()
    const [ message, setMessage ] = React.useState()

    setJoinedList(communityList);

    const ToggleJoinOrLeave = (name) => {
        return isLoggedIn? (
          message === 'Join'?
          subscribeCommunity(name):
          unsubcribeCommunity(name)
          ): (
            history.push("/login")
            );
      }
  
      const subscribeCommunity = (name) => {
        if(localStorage.getItem('token') && localStorage.getItem('username')){
            const token = JSON.parse(localStorage.getItem('token')).jwtToken
            console.log(token)
            axios.post(SUBSCRIBE_COMMUNITY_API + name, {}, {
              headers:{
                Authorization: `Bearer ${token}`
              }
            }).then(
              response => {
                alert("you joined successfully")
                var list = joinedCommunities;
                list.push(name)
                setJoinedList(list)
                setMessage('Leave')
              }
            ).catch(error => {
              alert(error)
            })
        }
      }

      const unsubcribeCommunity = (name) =>{
        if(updateRequest(name)===true){
          setMessage('Join')
          alert("Leave " + name + " successfully")
        }
      }

      const updateRequest = (communityName) => {
        if(localStorage.getItem('token') && localStorage.getItem('username')){
          const token = JSON.parse(localStorage.getItem('token')).jwtToken
          axios.delete(SUBSCRIBE_COMMUNITY_API + communityName, {
            headers:{
              'Authorization': `Bearer ${token}`
            }
          }).then(
            response => {
              setMessage('Join')
              alert("Leave successfully")
            }
          ).catch(error => {
            return error
          })
        }
      }

      const ToggleViewCommunity = () => {
        history.push(`/community/${community.name}`)
      }

      React.useEffect(() => {
        console.log("dddddddddddddddddddddee")
        joinedCommunities.some(c => {
            return c === community.name})? setMessage("Leave"): setMessage("Join")
      }, [joinedCommunities])
    
    return(
        <React.Fragment>
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
                    <Button size="small" onClick={ToggleViewCommunity}>View</Button>
                    <Button size="small"
                        disabled={subsribed} 
                      onClick={() => {
                        ToggleJoinOrLeave(community.name)
                      }}>
                          {message}
                    </Button>
                    
                    
                  </CardActions>
                </Card>
        </React.Fragment>
    )
}