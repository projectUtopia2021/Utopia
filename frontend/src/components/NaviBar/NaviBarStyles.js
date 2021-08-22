import { styled, alpha } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    float:'right',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const SectionDesktop = styled('div') (({theme}) => ({
    display: 'none',
    float:'right',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  }))

  const ButtonBox = styled(Box)(({theme}) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center','& > *': { m: 1,},
  }))

  const SectionMobile = styled('div')(({theme}) => ({
    display: 'flex',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
  }))
  export {Search, SearchIconWrapper, StyledInputBase, ButtonBox, SectionDesktop, SectionMobile};