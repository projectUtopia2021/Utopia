import * as React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useUserContext } from '../Context/UserContext';
import axios from 'axios';

const SUBSCRIBE_COMMUNITY = '/api/user/'

export default function SingleCommunity(props){
    const community = props.community
    const { isLoggedIn, username, communityList, setUserCommunityList } = useUserContext()
    const [ subsribed, setSubsribed ] = React.useState()
    const [ message, setMessage ] = React.useState();

    const ToggleJoinOrLeave = (id, name) => {
        return isLoggedIn? (
          message === 'Join'?
          subscribeCommunity(id, name):
          unsubcribeCommunity(id,name)
          ): (
            alert("Login to Join Community")
            );
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
                setMessage('Leave')
              }
            ).catch(error => {
              alert(error)
            })
        }
      }

      const unsubcribeCommunity = (idToRemove, name) => {
        console.log('id to remove ', idToRemove)
        const filteredCommunity = communityList.filter((c) => c.communityId !== idToRemove);
        if(updateRequest(filteredCommunity)===true){
          setMessage('Join')
          alert("Leave " + name + " successfully")
        }
      }

      const updateRequest = (newList) => {
        if(localStorage.getItem('token') && localStorage.getItem('username')){
          const token = JSON.parse(localStorage.getItem('token')).jwtToken
          axios.patch(SUBSCRIBE_COMMUNITY + username, {
            communities: newList
          }, {
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
      React.useEffect(() => {
          communityList.some(c => {
            return c.communityId === community.id})? setMessage("Leave"): setMessage("Join")
      }, [])
    
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
                    <Button size="small">View</Button>
                    <Button size="small"
                        disabled={subsribed} 
                      onClick={() => {
                        ToggleJoinOrLeave(community.id, community.name)
                      }}>
                          {message}
                    </Button>
                    
                    
                  </CardActions>
                </Card>
        </React.Fragment>
    )
}