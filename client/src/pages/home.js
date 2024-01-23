// import Matchbar from "./matchbar"
// import { useNavigate} from "react-router-dom";
import axios from 'axios';
// import Button from '@mui/material/Button';

import { useState,useEffect } from "react";
import { Box,useMediaQuery } from "@mui/material";

import MatchBar from "./components/matchbar";

const Home = () => {
  // const navigate = useNavigate();
  let [matches,setmatches]=useState([]);
  
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  useEffect( () => { 
    document.title='Cricket Archives'
    async function fetchData() {
        try {
            const res = await axios.get('http://localhost:3000/all'); 
            (res.data).sort((a,b)=> (-a.likes.length+b.likes.length))
            // console.log(res);
            setmatches(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    fetchData();
}, []);

    return(
      <div>
        {isNonMobileScreens?
      <Box sx={{display:'flex', marginTop:"3em"}}>
      <Box  sx={{backgroundColor:'#', width:"50%", marginLeft:"2em",
       position: 'relative'}}>

{matches && matches.map && matches.map((match) => 
<MatchBar match={match} key={match._id}/>
)}

      </Box>

      <Box sx={{width:'250px', height:'400px', position:'sticky', margin:'3em'}}>
      <img src="https://www.insidesport.in/wp-content/uploads/2021/11/WhatsApp-Image-2021-11-19-at-1.03.02-PM.jpeg" width={"400px"} alt=""></img>
      </Box>
      </Box>
      :
      <Box>
        <Box sx={{width:'250px', height:'400px', position:'sticky', margin:'3em'}}>
      <img src="https://www.insidesport.in/wp-content/uploads/2021/11/WhatsApp-Image-2021-11-19-at-1.03.02-PM.jpeg" width={"400px"} alt=""></img>
      </Box>
      <Box  sx={{backgroundColor:'#', width:"50%", marginLeft:"2em",
       position: 'relative'}}>

{matches && matches.map && matches.map((match) => 
<MatchBar match={match} key={match._id}/>
)}
      </Box>  
      </Box>
      }
      


      </div>
    )
  };
  
  export default Home;