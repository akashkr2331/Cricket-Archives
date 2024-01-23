import { useParams } from "react-router-dom";
import ProfilePage from "./profilepage";
import { useState,useEffect } from "react";
import axios from "axios";
import MatchBar from "../components/matchbar";
import { Box } from "@mui/material";

const Posts=function(){
    const {id}=useParams();
    const [matches,setmatches]=useState([]);

    useEffect(()=>{
        async function getposts(){
            const response=await axios.get(`http://localhost:3000/user/${id}/posts`); 
        if(response){
        setmatches(response.data)
        // console.log(matches)
    }
        }

        getposts();
        
        // setcomments()
    },[])

    return (
        <Box>
            <ProfilePage id={id}/>
        <h2> Posts</h2>
        {matches && matches.map && matches.map((match)=>
                <MatchBar match={match} key={match._id}/>
            )}
        </Box>
    )
}

export default Posts;


