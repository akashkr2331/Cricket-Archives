import { useEffect, useState } from "react";
import ProfilePage from "./profilepage";
import { useParams } from "react-router-dom";
import axios from 'axios';
import MatchBar from "../components/matchbar";
import { Box } from "@mui/material";

function Likes(){
    const {id}=useParams();

    const [likes,setlikes]=useState([]);

    useEffect(()=>{
        async function getlikes(){
            const response=await axios.get(`http://localhost:3000/user/${id}/likes`); 
        if(response){
        setlikes(response.data)
        // console.log(response)
    }
        }

        getlikes();
        
        // setcomments()
    },[])

    return (
        <Box>
            <ProfilePage id={id}/>
            <h2> Likes</h2>

            {likes && likes.map && likes.map((match)=>
                <MatchBar match={match} key={match._id}/>
            )}
        </Box>
        
    )
}

export default Likes;


