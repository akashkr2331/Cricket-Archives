// import {useState} from "react";
import {Box, Typography,IconButton,Button,useMediaQuery} from "@mui/material"
import {LightMode,Person} from "@mui/icons-material"
import {useDispatch,useSelector} from "react-redux"
import { setMode, setLogout } from "../state";
import { useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse"; 
import CardHeader from "@mui/material/CardHeader"; 
import { useState } from "react";
import KeyboardArrowDownIcon from  
    "@mui/icons-material/KeyboardArrowDown"; 
import KeyboardArrowUpIcon from  
    "@mui/icons-material/KeyboardArrowUp"; 

const Navbar=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((state)=>state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [open, setOpen] = useState(false); 
    
    
    return(
        <Box sx={{display:'flex',gap:'1em',marginTop:'1em'}}>
            



        {isNonMobileScreens? 
    <Box sx={{display:'flex',gap:'1em'}}>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="#8f3d5b"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: "blue",
              cursor: "pointer",
            },
          }}
        >
          Cricket Archives 
        </Typography>
    <Button onClick={() => navigate("/Home")}>
    View Matches
    </Button>

    {user==null && (
        <Box display={"flex"}>
        <Button  onClick={() => navigate("/Login")}>
        Login
    </Button>
    <Button  onClick={() => navigate("/Signup")}>
        Signup
    </Button>
    </Box>
    )}

{user!=null && (
    <Box>
        <Button  onClick={() => navigate("/NewMatch")}>
    NewMatch
    </Button>
        <Button  onClick={() => dispatch(setLogout())}>
        Logout
    </Button>
    </Box>
)}

{user!=null && (
<IconButton onClick={() => navigate(`/Profile/${user._id}/posts`)}>
    <Person/>
</IconButton>
)}
<IconButton onClick={()=>dispatch(setMode())} sx={{position:'absolute',right:'1em'}}>
            <LightMode/>
        </IconButton>
    </Box>

    :

    <Box>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="#8f3d5b"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: "blue",
              cursor: "pointer",
            },
          }}
        >
          Cricket Archives 
        </Typography>
        {user!=null && (
    <IconButton onClick={() => navigate(`/Profile/${user._id}/posts`)}>
        <Person/>
    </IconButton>
    )}
        <IconButton onClick={()=>dispatch(setMode())}>
            <LightMode/>
        </IconButton>
        <CardHeader 
                    title="Menu"
                    action={ 
                        <IconButton 
                            onClick={() => setOpen(!open)} 
                            aria-label="expand"
                            size="small"
                        > 
                            {open ? <KeyboardArrowUpIcon /> 
                                : <KeyboardArrowDownIcon />} 
                        </IconButton> 
                    }
                ></CardHeader>
    <Box sx={{display:'flex',flexDirection:'column'}}>
        <Collapse timeout="auto" in={open}
                        unmountOnExit>
        <Button onClick={() => navigate("/Home")}>
            View Matches
        </Button>

        {user==null && (
            <Box sx={{display:'flex',flexDirection:'column'}}>
            <Button  onClick={() => navigate("/Login")}>
            Login
        </Button>
        <Button  onClick={() => navigate("/Signup")}>
            Signup
        </Button>
        </Box>
        )}

{user!=null && (
        <Box sx={{display:'flex',flexDirection:'column'}}>
            <Button  onClick={() => navigate("/NewMatch")}>
        NewMatch
        </Button>
            <Button  onClick={() => dispatch(setLogout())}>
            Logout
        </Button>
        </Box>
    )}



    </Collapse>
        </Box>
        
        </Box>
    }


        
        </Box>
        
    )
    
}

export default Navbar;