import React from "react";
// import "../../"
import {Formik } from "formik";
import {useNavigate } from "react-router-dom";
import axios from 'axios';
import {  useSelector } from "react-redux";
import { Box } from "@mui/material";
import "../../styles/newMatch.css"

const NewMatch = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const user= useSelector((state) => state.user);
    // console.log(user);

    const handleFormSubmit=async (values, onSubmitProps)=>{
      // console.log(values)
    const response= await axios.post('http://localhost:3000/new', 
    {values,user}
    )
    if(response){
      // console.log(response);
      navigate("/");
    }
    }
    return(

    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
     <Formik
       initialValues={{ tournament: '', srl: '', status:'', date:'', potm:'',name1:'', name2:'', 
       run1:'',run2:'', over1:'',over2:'', wkt1:'',wkt2:'' }}
       onSubmit={handleFormSubmit}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit} >
            <div>
            <label >tournament name</label>
           <input
             type="text"
             name="tournament"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.tournament}
             required
           />
            </div>
            
           <div>
           <label>Match no.</label>
           <input
             type="text"
             name="srl"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.srl}
             required
           />
           </div>

           <div>
           <label>status</label>
           <input
             type="text"
             name="status"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.status}
             required
           />

           </div>

           <div>
           <label>Player of the match</label>
           <input
             type="text"
             name="potm"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.potm}
           />

           </div>

           <div className="team">

           <div>
           <label>Team1</label>
           <input
             type="text"
             name="name1"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name1}
             required
           />
           </div>

           <div>
          <label>Run</label>
           <input
             type="text"
             name="run1"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.run1}
             required
           />
           </div>

           <div>
            <label>wkt</label>
           <input
             type="text"
             name="wkt1"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.wkt1}
             required
           />
           </div>

           <div>
            <label>over</label>
           <input
             type="text"
             name="over1"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.over1}
             required
             />
           </div>
           </div>

           <div className="team">
            <div>
            <label>Team2</label>
           <input
             type="text"
             name="name2"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name2}
             required
           />
            </div>
           
           <div>
          <label>Run</label>
           <input
             type="text"
             name="run2"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.run2}
             required
           />
           </div>

           <div>
            <label>wkt</label>
           <input
             type="text"
             name="wkt2"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.wkt2}
             required
           />
           </div>

           <div>
            <label>over</label>
           <input
             type="text"
             name="over2"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.over2}
             required
             />
             </div>
           
           </div> 

           <button type="submit">
             Submit
           </button>
         </form>
       )}
     </Formik>
    </Box>
    )
  };
  
  export default NewMatch;
