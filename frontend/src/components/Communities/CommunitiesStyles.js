import Tabs from "@material-ui/core/Tabs";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";

const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: "column"
  },
  indicator: {
    display: "none"
  },
  tabsRoot: {
    textAlign: "right"
  }
}))(Tabs);

const TheTab = withStyles(theme => ({
    root: {
      borderRight: "2px solid lightgray",
      textAlign: "right"
    },
    selected: {
      color: "#4ABDAC",
      borderRight: "3px solid #4ABDAC",
      textAlign: "right"
    },
    label: {
      fontSize: 20,
  
      textTransform: "initial"
    }
  }))(Tab);

export {VerticalTabs, TheTab};