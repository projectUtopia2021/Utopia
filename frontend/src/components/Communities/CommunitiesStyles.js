import Tabs from "@material-ui/core/Tabs";
import { withStyles } from "@material-ui/styles";
import Tab from "@material-ui/core/Tab";
import { styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: "column"
  },
  indicator: {
    display: "none"
  },
  tabsRoot: {
    alignItems: "left"
  }
}))(Tabs);

const TheTab = withStyles(theme => ({
    root: {
      textAlign: "left"
    },
    selected: {
      color: "#AB83FF",
      fontWeight:'bold',
      backgroundColor: "#EBFC9F",
      borderRadius:'2px',
      alignItems:"left"
    },
    label: {
      textTransform: "lowercase"
    }
  }))(Tab);

 const MainContainer = withStyles(theme => ({
      position: 'relative',
      display: 'flex',
      width: "90%",
 }))(Container);

 const CommunityBar = styled('div')(theme => ({
   flex: 3,
   height: 'calc(100vh - 50px)'
 }));

 const PostDisplay = styled('div')(theme => ({
  flex: 11
}));


export {MainContainer, CommunityBar, PostDisplay, VerticalTabs, TheTab};