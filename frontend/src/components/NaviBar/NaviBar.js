import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SvgIcon from "@material-ui/core/SvgIcon";
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import {Search, StyledInputBase, ButtonBox} from './NaviBarStyles';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { useUserContext } from '../Context/UserContext';
import { useSearchContext } from '../Context/SearchBarContext';

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
    const { setSearch } = useSearchContext();

    const handleLogOut = (event) => {
        event.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        setLogin(false)
    }

    const handleSearch = (event) => {
        event.preventDefault()
        history.push("/discovery")
    }
    
    React.useEffect(() => {
        if(localStorage.getItem("token")){
            setLogin(true)
            const name =  localStorage.getItem('username')? localStorage.getItem('username'): 'user';
            setLoginUsername(name)
        }
    }, [])

    return (
        <div>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                <HomeIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit">
                    Utopia
                </Typography>
                
                <Search>
                    <form onSubmit={handleSearch}>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(event) => {
                        setSearch(event.target.value)
                    }}
                    />
                    <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                    </IconButton>
                    </form>
                </Search>
                <ButtonBox>
                {isLoggedIn? (
                    <div style={{flexDirection: 'row', display:'flex'}}>
                        <Typography color='inherit' align='center' sx={{mr: 3}} nowrap>
                            Welcome, {username}
                        </Typography>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button style={{textTransform: 'none', }}
                        onClick={handleLogOut}>
                        Log Out
                        </Button>
                </ButtonGroup>
                    </div>
                    
                ): (
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button style={{textTransform: 'none',}}  
                                onClick = {() => {
                                    history.push("/login")
                            }}>
                                Log In
                        </Button>
                         <Button style={{textTransform: 'none', }} 
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
