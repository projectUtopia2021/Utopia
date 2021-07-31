import * as React from 'react'
import { MainContainer } from '../CommunitiesStyles'
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import Cropper from 'react-easy-crop';
import { useCallback } from 'react';
import getCroppedImg from './CropImage.js'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';



const CREATE_COMMUNITY_API = '/api/community'

const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const imageMaxSize = 1000000000 // bytes
export default function CreateCommunity(props){
    const [communityName, setCommunityName] = useState('');
    const [cmnyDescription, setCmnyDescription] = useState("");
    // const [croppedImageUrl, setCroppedImageUrl] = useState();
    // const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [imageSrc, setImageSrc ] = useState();
    // const imageCanvasRef = React.createRef()
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)

    const handleCreate = () => {
        const communityData = {
            "description": cmnyDescription, 
            "name": communityName
        }
        const token = JSON.parse(localStorage.getItem('token')).jwtToken
        axios.post(CREATE_COMMUNITY_API, 
            communityData,{
            headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(
            response => {
                props.history.push('/')
            }
        ).catch(error => {
            alert(error)
        })
    }

    const imgSelectHandler = (event) => {
        setImageSrc(URL.createObjectURL(event.target.files[0]))
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
      }, [])
    
    const handleSaveCroppedImage = useCallback(async () => {
        try {
          const croppedImage = await getCroppedImg(
            imageSrc,
            croppedAreaPixels,
            // rotation
          )
          console.log('donee', { croppedImage })
          setCroppedImage(croppedImage)
        } catch (e) {
          console.error(e)
        }
        handleCloseDialog()
        setShow(true)
      }, [croppedAreaPixels])

      const handleCloseDialog = () => {
        setOpen(false)
        setImageSrc(null)
    }

    const  showCroppedImage = () => {
        setShow(true)
    }

    return(
        <React.Fragment>
            <MainContainer>
                <Box id="create_community_box" 
                sx={{
                    position: 'relative', 
                    display:'flex',
                    flexDirection:'column',
                     height:`calc(100vh - 50px)`, 
                     pt: 5
                     }}>
                    <Box id="title_box" style={{
                        flex:'1',
                    }}>
                        <Typography 
                            variant="h3"
                            gutterBottom>
                            Create Your Community
                        </Typography>
                    </Box>
                    <Box 
                        id="text_field_area" 
                        direction='column'
                        alignContent='center'
                        style={{
                            flex:'9',
                        }}>
                        <Box
                            id="create_community_form" 
                            // maxWidth="md" 
                            // width="60%"
                            xs={24}
                            sm={24}
                            md={3}
                            lg={3}
                            direction='column'
                            alignContent='center'
                            sx={{
                                flexWrap:'wrap',  
                                }}>
                            <form noValidate autoComplete="off">
                                <Box sx={{py:1,}} >
                                <TextField
                                    required
                                    id="community_name_field"
                                    label="Community Name"
                                    variant="outlined"
                                    fullWidth={true}
                                    onChange={(event) => {
                                        setCommunityName(event.target.value)
                                    }}
                                    />
                                </Box>
                                <Box sx={{py:1}}>
                                <TextField
                                required
                                    id="community_description_field"
                                    label="Community Description"
                                    variant="outlined"
                                    fullWidth={true}
                                    multiline={true}
                                    rows={4}
                                    onChange={(event) => {
                                        setCmnyDescription(event.target.value)
                                    }}
                                    />
                                </Box>
                                <div>
                                    {show && <img src={croppedImage} style={{paddingRight:'10px'}}/>}
                                    <input
                                        accept="image/*"
                                        style={{display:'none'}}
                                        id="contained-button-file"
                                        type="file"
                                        onChange={imgSelectHandler}
                                        />
                                    <label htmlFor="contained-button-file">
                                        <Button 
                                            variant="outlined" 
                                            component="span"
                                            >
                                        Upload
                                        </Button>
                                    </label>   
                                    <Dialog 
                                        open={imageSrc} 
                                        fullWidth={true}
                                        maxWidth='md'
                                        height='300px'
                                        onClose={handleCloseDialog} 
                                        aria-labelledby="crop-image-dialog">
                                            <DialogTitle id="crop-image-dialog">Community Image</DialogTitle>
                                            <DialogContent>
                                                <div style={{position:'relative', width:'100%', height:'500px'}}> 
                                                <Cropper
                                                    image={imageSrc}
                                                    crop={crop}
                                                    // rotation={rotation}
                                                    // zoom={zoom}
                                                    aspect={16 / 9}
                                                    onCropChange={setCrop}
                                                    // onRotationChange={setRotation}
                                                    onCropComplete={onCropComplete}
                                                    // onZoomChange={setZoom}
                                                    />
                                                    </div>
                                            </DialogContent>
                                            <DialogActions>
                                            <Button onClick={handleSaveCroppedImage} color="primary">
                                                Save
                                            </Button>
                                            </DialogActions>
                                    </Dialog>
                                </div>
                                <Box 
                                    id="submit_button_box"
                                    alignContent='right'
                                    width="50%"
                                    sx={{
                                        pt:1,
                                    }}>
                                    <Button 
                                        variant='contained'
                                        color="primary"
                                        onClick={handleCreate}
                                        size="medium">
                                        Create
                                    </Button>
                                </Box>
                                
                            </form>
                        </Box>
                    </Box>
                    <Box id="create_community_footer" style={{
                        flex:'1'
                    }}>
                    </Box>
                </Box>
            </MainContainer>
        </React.Fragment>
    )
}