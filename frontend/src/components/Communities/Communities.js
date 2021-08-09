import * as React from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import editorStyles from './CommunitiesStyles.module.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';
import { styled } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Draft from "../DraftJS/Draft";
import CommunitySidebar from './CommunitySidebar';
import CommentIcon from '@material-ui/icons/Comment';
import CardActions from '@material-ui/core/CardActions';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      fontSize: 12
    },
}));


class Communities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            closeBtn: true,
            anchorEl: null,
            open: false,
            title: "",
        };
    }

    componentDidMount() {
        fetch("/api" + window.location.pathname + "/posts")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                postData: result ? result : []
              });
            },
            
            (error) => {
              this.setState({
                isLoaded: true,
                fetchError: error,
              });
            }
          )
      }

    closeClick = () => {
        this.setState({ closeBtn: !this.state.closeBtn });
    }

    popperBtnHandler = (event) => {
        this.setState({
            // anchorEl: event.currentTarget,
            open: !this.state.open,
        });
        
    };

    closePopper = () => {
        this.setState({
            open: !this.state.open,
        });
        
    };

    titleChange = (event) => {
        this.setState({
            title: event.target.value,
        });
    }

    render() {

        const {closeBtn} = this.state;


        const { fetchError, isLoaded, postData } = this.state;
        if (fetchError) {
            console.log(fetchError.message);
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        }

        

        const posts = !fetchError? postData: [
            {
                title: "animal crossing wedding season mock data",
                postContent: "Join the wedding seacon in June!",
                author: "Liyuan",
                date: "2021/06/15",
            },
            {
                title: "animal crossing wedding season1 mock data",
                postContent: "Join the wedding seacon in June!",
                author: "Liyuan",
                date: "2021/06/15",
            },
            {
                title: "animal crossing wedding season2 mock dataasf",
                postContent: "Join the wedding seacon in June!",
                author: "Liyuan",
                date: "2021/06/15",
            },
        ];

        return (
            <div>
                <div>
                    {closeBtn ? <Card className={editorStyles.card}>
                        <CardHeader
                            action={
                                <IconButton aria-label="closes" onClick={this.closeClick}>
                                    <CloseIcon fontSize="large"/>
                                </IconButton>
                            }
                        />
                                    
                        <CardContent>
                            <Typography id="test1" sx={{ fontSize: 14,  }} color="text.secondary" align="center" gutterBottom>
                                Something you wanna say...
                            </Typography>
                            
                            <br />
                        </CardContent>
                        
                    </Card> : null}


                    <Box mt={5} ml={10} mr={6}  sx={{ flexGrow: 1 }} minWidth={500}>
                        <Grid container spacing={5} >
                            <Grid item xs={3} >
                                {/* <Button variant="contained" color="secondary" onClick={this.popperBtnHandler}>Start a Discussion</Button> */}
                                <Box>
                                    <CommunitySidebar anchorAction={this.popperBtnHandler} history = {this.props.history}/>
                                </Box>
                            </Grid>
                            <Grid item xs={9}>
                                <div style={{ width: '100%' }}>
                                    <Box sx={{ display: 'flex'}}>
                                        <Box sx={{flexGrow: 1}}>
                                            <PopupState variant="popover" popupId="demo-popup-popover">
                                                {(popupState) => (
                                                    <div>
                                                    <Button variant="contained" color="info" {...bindTrigger(popupState)}>
                                                        Latest
                                                    </Button>
                                                    <Popover
                                                        {...bindPopover(popupState)}
                                                        anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                        }}
                                                        transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                        }}
                                                    >
                                                        <Typography sx={{ p: 1, ml:1, mr:1.8 }}>Latest</Typography>
                                                        <Typography sx={{ p: 1, ml:1}}>Top</Typography>
                                                        <Typography sx={{ p: 1, ml:1}}>Newest</Typography>
                                                        <Typography sx={{ p: 1, ml:1}}>Oldest</Typography>
                                                    </Popover>
                                                    </div>
                                                )}
                                            </PopupState>
                                        </Box>
                                        <Box>
                                            <CheckBoxIcon sx={{ fontSize: 30 }} onClick={null}/>
                                        </Box>
                                    </Box>
                                </div>


                                <Grid container spacing={2} direction={'column'} sx={{mt: 1}}>
                                    {postData.map((post) => (
                                        <Grid item key={post} onClick = {() => this.props.history.push(window.location.pathname + "/posts/" + post.id)}>
                                            <Card
                                                sx={{ height: '100%', 
                                                    display: 'flex', 
                                                    flexDirection: 'row',
                                                    }}
                                                >
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Grid container >
                                                        <Avatar  src="/broken-image.jpg"/>
                                                        <Grid item sx={{pl:5}} sx={{pl:2}}>
                                                        <Typography gutterBottom variant="h6" component="h2">
                                                         {post.title}
                                                        </Typography>
                                                        <Typography>
                                                         {"Created by " + post.username}
                                                        </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                                <CardActions>
                                                    <CommentIcon fontSize={'medium'} sx={{mr:2}}>
                                                    </CommentIcon>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>


                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <div>
                    <div id="popperPoint" className={editorStyles.editor}></div>
                </div>

                <Popper id="transitions-popper" open={this.state.open} placement="top" anchorEl={document.getElementById('popperPoint')} transition>
                    {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                            <Box sx={{ display: 'flex'}}>
                                <Box sx={{flexGrow: 1}}>
                                <Stack direction="row" spacing={2} pl={1}>
                                    <Typography variant="h4">
                                        Title
                                    </Typography>
                                    <input type="text" className={editorStyles.titleTB} name="name" onChange={this.titleChange}/>
                                </Stack>
                                    
                                    
                                </Box>
                                <Box>
                                    <Stack
                                        direction="row-reverse"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <IconButton aria-label="closes" size="small" onClick={this.closePopper}>
                                            <CloseIcon fontSize="small"/>
                                        </IconButton>
                                    </Stack>
                                </Box>
                            </Box>
                            
                                                    
                            
                            {/* <Draft otherInfo={{'title': 'this.textInput.current.value'}}></Draft> */}
                            <Draft title={this.state.title} communityName={this.props.location}></Draft>
                        </Box>
                    </Fade>
                    )}
                </Popper>
            </div>
        );
    }
}


export default Communities;