import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SvgIcon from "@material-ui/core/SvgIcon";
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import {Search, SearchIconWrapper, StyledInputBase, ButtonBox} from './NaviBarStyles';
import { useHistory } from 'react-router-dom';
import Discovery from '../Discovery/Discovery';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';


const GET_COMMUNITIES_API = "/api/community/getCommunityByName"

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
};

function NaviBar() {
    const history = useHistory()
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [searchContent, setSearchContent] = React.useState('');
    const [searchResult, setSearchResult] = React.useState('');

    const handleLogOut = (event) => {
        event.preventDefault()
        localStorage.removeItem('token')
        setIsLoggedIn(false)
    }

    const handleSearch = (event) => {
        event.preventDefault()
        if(window.localStorage.getItem('token')){
            axios.defaults.headers.common['Authorization'] = `Bearer` + ' ' +JSON.parse(window.localStorage.getItem('token')).jwtToken
        }
        console.log(axios.defaults.headers.common['Authorization'])
        history.push("/discovery")
    }

    React.useEffect(() => {
        if(localStorage.getItem('token')){
            setIsLoggedIn(true)
        }
    }, [])
    
    
    return (
        <div>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                <HomeIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit" noWrap>
                    Utopia
                </Typography>
                
                <Search>
                    {/* <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>  */}
                    <form onSubmit={handleSearch}>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(event) => {
                        setSearchContent(event.target.value)
                    }}
                    />
                    <IconButton type="submit" aria-label="search"
                         //onPointerEnter={handleSearch}
                         //onClick={handleSearch}
                         >
                    <SearchIcon />
                    </IconButton>
                    </form>
                </Search>
                
                <ButtonBox>
                {isLoggedIn? (
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button style={{textTransform: 'none'}}
                        onClick={handleLogOut}>
                    Log Out
                    </Button>
                </ButtonGroup>
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
                </ButtonBox>
                </Toolbar>
            </AppBar>
        </div>
        
    );
}

export default NaviBar;
