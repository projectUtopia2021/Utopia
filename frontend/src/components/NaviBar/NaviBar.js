import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SvgIcon from "@material-ui/core/SvgIcon";
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import {Search, StyledInputBase, ButtonBox, SectionDesktop, SearchIconWrapper, SectionMobile} from './NaviBarStyles';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { useUserContext } from '../Context/UserContext';
import { Avatar, Menu } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
};

function NaviBar(props) {
    const history = useHistory()
    const { username, isLoggedIn, setLogin, setLoginUsername } = useUserContext()
    const [searchContent, setSearchContent] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const handleLogOut = (event) => {
        event.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        setLogin(false)
        setAnchorEl(null)
    }
 
    const handleSearch = (event) => {
        event.preventDefault()
        history.push(`/discovery/${searchContent}`)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleToProfile = () => {
        history.push('/profile')
    }
    
    const handleViewCommunities = () => {
        history.push('/community')
    }

    const handleCreateCommunity = () => {
        history.push('/createCommunity')
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    const handleMobileClose = () => {
        setMobileMoreAnchorEl(null);
    }

    React.useEffect(() => {
        if(localStorage.getItem("token")){
            setLogin(true)
            const name =  localStorage.getItem('username')? localStorage.getItem('username'): 'user';
            setLoginUsername(name)
        }
    }, [])

    return (
        <div style={{
            flexGrow:1,}}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                <HomeIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit">
                    Utopia
                </Typography>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <form onSubmit={handleSearch}>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(event) => {
                        setSearchContent(event.target.value)
                    }}
                    />
                    </form>
                </Search>
                {/* <ButtonBox> */}
                <div style={{
                    flexGrow:1,
                    }}>
                <SectionDesktop>
                {isLoggedIn? (
                    <div style={{
                        flexDirection: 'row', 
                        display:'flex',
                        alignItems:'center',
                        }}>
                        <Typography color='inherit'>
                            Welcome, {username}
                        </Typography>
                        <Button aria-controls="homepage-menu" aria-haspopup="true" onClick={handleClick}>
                            <Avatar src="/broken-image.jpg" 
                                style={{
                                        height: '28px',
                                        width: '28px'
                                }}/>
                        </Button>
                        <Menu
                         id="homepage-menu"
                         anchorEl={anchorEl}
                         keepMounted
                         open={Boolean(anchorEl)}
                         onClose={handleClose}>
                            <MenuItem onClick={handleToProfile}>Profile</MenuItem>
                            <MenuItem onClick={handleViewCommunities}>My Communities</MenuItem>
                            <MenuItem onClick={handleCreateCommunity}>Create a community</MenuItem>
                            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                        </Menu>
                    </div>
                    
                ): (
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button style={{textTransform: 'none'}}  
                                onClick = {() => {
                                    history.push("/login")
                            }}>
                                Log In
                        </Button>
                         <Button style={{textTransform: 'none'}} 
                                onClick = {() => {
                                history.push("/register")
                            }}>
                                    Sign Up
                    </Button>

                    </ButtonGroup>
                    
                )}
                </SectionDesktop>
                <SectionMobile sx={{float:'right'}}>
                    {isLoggedIn? (
                        <div>
                        <IconButton
                        // aria-label="show more"
                        aria-controls='mobilePage-menu-login'
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                        >
                    <MoreIcon />
                    </IconButton>
                    
                    <Menu
                        id="mobilePage-menu-login"
                        anchorEl={mobileMoreAnchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        open={Boolean(mobileMoreAnchorEl)}
                        onClose={handleMobileClose}>
                            <MenuItem onClick={handleToProfile}>Profile</MenuItem>
                            <MenuItem onClick={handleViewCommunities}>My Communities</MenuItem>
                            <MenuItem onClick={handleCreateCommunity}>Create a community</MenuItem>
                            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Menu>
                    </div>
                    ):(
                        <div>
                        <IconButton
                        // aria-label="show more"
                        aria-controls='mobilePage-menu'
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                        >
                    <MoreIcon />
                    </IconButton>
                    
                    <Menu
                        id="mobilePage-menu"
                        anchorEl={mobileMoreAnchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        open={Boolean(mobileMoreAnchorEl)}
                        onClose={handleMobileClose}>
                            <MenuItem onClick={() => {
                                history.push('/login')
                            }}>Login</MenuItem>
                            <MenuItem onClick={() => {
                                history.push('/register')
                            }}>Sign Up</MenuItem>
                    </Menu>
                    </div>
                    )}
                </SectionMobile>
                </div>
                {/* </ButtonBox> */}
                </Toolbar>
            </AppBar>
        </div>
        
    );
}

export default NaviBar;
