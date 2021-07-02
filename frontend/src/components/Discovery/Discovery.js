import * as React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from "axios";

const GET_COMMUNITIES_API = "/api/community/getCommunityByName"
const communities = [
    {
        uuid: "6905d1ee-d919-11eb-b8bc-0242ac130003",
        "name" : "Animal Crossing: New Horizons",
        "description": "The largest Discord-Partnered community for Animal Crossing: New Horizons.",
        numMembers: 506033
    },
    {
        uuid: "6905d1ee-d919-11eb-b8bc-0242ac130sf03",
        "name" : "Animal Crossing: New Horizons",
        "description": "The largest Discord-Partnered community for Animal Crossing: New Horizons.",
        numMembers: 506033
    },
    {
        uuid: "6905d1ee-d919-11eb-b8bc-0242ac1dfs0003",
        "name" : "Animal Crossing: New Horizons",
        "description": "The largest Discord-Partnered community for Animal Crossing: New Horizons.",
        numMembers: 506033
    },
    {
        uuid: "6905d1ee-d919-11eb-b8bc-0242ac1dsf003",
        "name" : "Animal Crossing: New Horizons",
        "description": "The largest Discord-Partnered community for Animal Crossing: New Horizons.",
        numMembers: 506033
    },
    {
        uuid: "6905d1ee-d919-11eb-b8bc-0242ac130dge3",
        "name" : "Animal Crossing: New Horizons",
        "description": "The largest Discord-Partnered community for Animal Crossing: New Horizons.",
        numMembers: 506033
    }
]

export default function Discovery (props) {
    const searchContent = props.SearchContent;
    //const [communities,setCommunities] = React.useState('')

    // React.useEffect(() => {
    //   axios.get(GET_COMMUNITIES_API + '/' + searchContent, {}
    //   )
    //   .then(
    //     response => {
    //       console.log(response)
    //     }
    //   )
    //   .catch((error) => {
    //     alert(error)
    //   })
    // }, [])
    return (
        <React.Fragment>
        <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h5" color="text.secondary" fontWeight="fontWeightBold" paragraph>
              All Results:
            </Typography>
          {/* End hero unit */}
          <Grid container spacing={3}>
            {communities.map((community) => (
              <Grid item key={community.uuid} xs={12} sm={6} md={4}>
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
                    <Button size="small">Join</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </React.Fragment>
    );
}