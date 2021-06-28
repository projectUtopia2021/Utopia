import Tabs from "@material-ui/core/Tabs";
import { withStyles } from "@material-ui/styles";
import Tab from "@material-ui/core/Tab";

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
      //border: "2px solid lightgray",
      textAlign: "left"
    },
    selected: {
      color: "#AB83FF",
      //border: "3px solid #FFFFFF",
      backgroundColor: "#EBFC9F",
      borderRadius:"12px",
      alignItems:"left"
    },
    label: {
      //fontSize: 20,
      textTransform: "lowercase"
    }
  }))(Tab);

export {VerticalTabs, TheTab};