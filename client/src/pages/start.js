// import login from "./login"
// import signup from "./signup"
// import { useState,useEffect } from "react";
import { Box } from "@mui/material";

const Start=()=>{
    return(
        <div>
            <Box sx={{}}>
            </Box>
            <Box sx={{display:"flex", justifyContent:"center",alignItems:"center", marginTop:"15%",    fontSize: "3em",
    color: "crimson",
    padding: "2em",
    backgroundColor: "#B8A4A4",
    // borderwidth: "10%",
    // width:"fit";
    marginLeft: "2em",
    marginRight: "2em",
    // borderRadius: "10%",
    // margin: "1em"
    width: "fitContent",
    backgroundImage: "url('https://images.unsplash.com/photo-1701122651126-612199155676?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D')",
    }}>
            Welcome to Cricket Archives
            </Box>

            {/* <Box sx={{position:''}}>
            <img src="https://images.unsplash.com/photo-1701122651126-612199155676?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"></img>
            </Box> */}
        </div>
        
    )
}
export default Start;