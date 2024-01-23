
import { Box, Button, Container, IconButton } from '@mui/material'
// import { FavoriteBorder, Favorite } from '@mui/icons-material'
import { useSelector } from "react-redux"
import axios from 'axios';
import {  useNavigate } from "react-router-dom";

const CommentBar=function({comments}){
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    return(
        <Box>
            {comments && comments.map && comments.map((comment) => {
              return (
                <Container sx={{ justifyContent: 'start' }} key={comment._id} onClick={()=>{
                  navigate(`../show/${comment.match}`)
                }}>
                  <Box variant="contained" sx={{
                    bgcolor: '#57787D',
                    boxShadow: 5,
                    borderRadius: 5,
                    p: 3, m: 3,
                    minWidth: 300
                  }} >
                    
                    <Box sx={{ fontWeight: "bold", color: "green", backgroundColor: "yellow", width: "fitcontent", padding: "1em" }}>{comment.description}</Box>
                    {user && comment.userId === user._id &&
                      <Button onClick={async () => {
                        const response = await axios.delete(`http://localhost:3000/comment/${comment._id}`);

                        if (response) {
                          console.log(response);
                        //   setisLiked();
                        }
                      }} sx={{ marginLeft: "80%", backgroundColor: "red", fontWeight: "bold", marginTop: '1em' }}  >delete</Button>
                    }
                  </Box>
                </Container>
              )
            })}
          </Box>
    )
}
export default CommentBar;
