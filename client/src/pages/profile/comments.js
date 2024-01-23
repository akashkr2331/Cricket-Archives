import { useEffect, useState } from "react";
import ProfilePage from "./profilepage";
import { useParams } from "react-router-dom";
import axios from 'axios';
import CommentBar from "../components/commentbar";
import { Box } from "@mui/material";

const Comments=function(){
    const {id}=useParams();
    const [comments,setcomments]=useState([]);

    useEffect(()=>{
        async function getcomments(){
            const response=await axios.get(`http://localhost:3000/user/${id}/comments`); 
        if(response)
        setcomments(response.data)
        // console.log(comments)
        }

        getcomments();
        
        // setcomments()
    },[])

    return (
        <Box>
            <ProfilePage id={id}/>
            <h2> Comments</h2>
            
            <CommentBar comments={comments} />
        </Box>
    )
}

export default Comments;
