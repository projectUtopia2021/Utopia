import * as React from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import editorStyles from './PostPageStyles.module.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';
import { styled } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Draft from "../DraftJS/Draft";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CommunitySidebar from "../Communities/CommunitySidebar";

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


class PostPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            closeBtn: true,
            anchorEl: null,
            open: false,
            otherInfo: "",
        };
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
            otherInfo: {'title': event.target.value},
        });
    }

    render() {

        const {closeBtn} = this.state;

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


                    <Box mt={5} ml={10} mr={60}  sx={{ flexGrow: 1 }}>
                        <Grid container spacing={5}>
                            <Grid item xs={4}>
                                <CommunitySidebar/>
                            </Grid>
                            <Grid item xs={8}>
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

                                <List sx={{ width: '100%', bgcolor: 'background.paper', paddingLeft: '10px', paddingRight: '20px', marginTop: '20px'}} >
                                    {[0, 1, 2, 3].map((value) => (
                                        <ListItem
                                            key={value}
                                            disableGutters
                                            style={{marginBottom: 8}}
                                            secondaryAction={
                                                <Stack direction="row" spacing={1}>
                                                    <Chip label="General" />

                                                    <IconButton>
                                                        <StyledBadge badgeContent={value} color="secondary">
                                                            <ChatBubbleOutlineIcon fontSize="large"/>
                                                        </StyledBadge>
                                                    </IconButton>
                                                </Stack>

                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar aria-label="recipe" >
                                                    W
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`Here is the ${value} Main title!`}
                                                secondary={
                                                <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Javen W.
                                                </Typography>
                                                {" — That sounds good!!!"}
                                                </React.Fragment>
                                            }
                                            />
                                        </ListItem>
                                    ))}
                                </List>


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
                                            <Draft otherInfo={this.state.otherInfo}></Draft>
                                        </Box>
                                    </Fade>
                                    )}
                                </Popper>





                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <div>
                    <div id="popperPoint" className={editorStyles.editor}></div>
                </div>
            </div>
        );
    }
}


export default PostPage;