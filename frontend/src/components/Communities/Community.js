import * as React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Community(props) {
    const [community, setCommunity] = React.useState({
        "CommunityName": "Animal Crossing: New Horizons",
        "Description":   "The largest Utopia-Partnered server for Animal Crossing: New Horizons",
        "onlineMembers": 12351,
        "MemberCount": 506004,
        "image": "https://source.unsplash.com/random",
        "Tag": ["Gaming", "Entertainment"]
    });

    return (
        <div>
            <Container sx={{py:8}} maxWidth="md">
                <Card sx={{maxWidth:{
                    '1/4': '25%',
                    '1/2': '50%',
                    '3/4': '75%',}}}>
                    
                </Card>
            </Container>
        </div>
    );
}