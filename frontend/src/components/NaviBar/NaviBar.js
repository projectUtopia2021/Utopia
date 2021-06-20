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

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
};

function NaviBar() {
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
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <ButtonBox>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button style={{textTransform: 'none'}} onClick = {() => {alert("log in")}}>Log In</Button>
                    <Button style={{textTransform: 'none'}} onClick = {() => {alert("sign up")}}>Sign Up</Button>
                    </ButtonGroup>
                </ButtonBox>
                </Toolbar>
            </AppBar>
        </div>
        
    );
}

export default NaviBar;
