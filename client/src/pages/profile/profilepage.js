import {Box, Button, Container} from '@mui/material'
import { useNavigate } from "react-router-dom";


const ProfilePage=({id})=>{

const navigate=useNavigate();

    return(
        <Box>

        <Container>
            <Box sx={{display:'flex', justifyContent:'space-around'}}>
                <Button 
                sx={{
                    color:'bisque',width:'25%',border: 'solid 0.3em',
                padding: '0.5em'
            }}
                onClick={() => 
                navigate(`/Profile/${id}/posts`)
                }>
                    Posts 
                </Button>
                <Button 
                sx={{
                    color:'bisque',width:'25%',border: 'solid 0.3em',
                padding: '0.5em'
            }}
                onClick={() => 
                navigate(`/Profile/${id}/likes`)
                }>
                    Likes
                </Button>
                <Button 
                sx={{
                    color:'bisque',width:'25%',border: 'solid 0.3em',
                padding: '0.5em'
            }}
                onClick={() => 
                    navigate(`/Profile/${id}/comments`)
                    }>
                    Comments
                </Button>
            </Box>


        </Container>
        </Box>

    )
}

export default ProfilePage;