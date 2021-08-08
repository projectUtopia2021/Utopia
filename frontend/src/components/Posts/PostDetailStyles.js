import { styled } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/styles";
import Container from '@material-ui/core/Container';
import { autocompleteClasses } from '@material-ui/core';

const PostDetailContainer = withStyles(theme => ({
    position: 'relative',
    display: 'flex',
}))(Container);

const PostComment = styled('div')(theme => ({
    flex: 9,
    overflow: 'scroll',
}));

const PostSidebarContainer = styled('div')(theme => ({
    flex: 3,
}));

const PostContainer = styled('div')(theme => ({
    display: 'flex',
    flexFlow:'column',
    height:`calc(100vh - 50px)`,
}));

const DiscussionSection = styled('div')(theme => ({
    backgroundColor:'white',
    marginTop:'30px',
    flex: 'auto'
}));

const HeadSection = styled('div')(theme => ({
}));

const MainContainer = withStyles(theme => ({
    position: 'relative',
    display: 'flex',
    width: "90%",
}))(Container);

export {
    MainContainer,
    PostDetailContainer, 
    PostComment, 
    PostSidebarContainer, 
    PostContainer, 
    DiscussionSection,
    HeadSection
};