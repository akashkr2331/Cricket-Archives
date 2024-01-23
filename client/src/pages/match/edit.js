import {Formik } from "formik";
import {useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';

import { useState,useEffect } from "react";

const EditMatch = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [match,setmatch]=useState([]);

  useEffect(() => { 
    // console.log(id)
    async function fetchData() {
        try {
            const res = await axios.get(`http://localhost:3000/match/${id}`); 
            // console.log(res)
            setmatch(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    fetchData();
}, [id]);

console.log(match);


    const handleFormSubmit=async (values, onSubmitProps)=>{

    const response= await axios.put(`http://localhost:3000/match/edit/${id}`,values)
    if(response){
      console.log(response);
      navigate(`/show/${id}`);
    }
    }
    return(

    <div>
     <Formik
       initialValues={{ tournament: match.tournament, srl: match.srl, status:match.status,potm:match.potm,name1:match.name1, name2:match.name2, 
       run1:match.run1,run2:match.run2, over1:match.over1,over2:match.over2, wkt1:match.wkt1,wkt2:match.wkt2 }}
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
         <form onSubmit={handleSubmit}>
            <div>
            <label >tournament name</label>
           <input
             type="text"
             name="tournament"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.tournament}
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
           />

           </div>

           <div>
           <label>Date</label>
           <input
             type="text"
             name="date"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.date}
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

           <div>
           <label>Team1</label>
           <input
             type="text"
             name="name1"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name1}
           />

          <label>Run</label>
           <input
             type="text"
             name="run1"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.run1}
           />

            <label>wkt</label>
           <input
             type="text"
             name="wkt1"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.wkt1}
           />

            <label>over</label>
           <input
             type="text"
             name="over1"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.over1}
             />
           </div>

           <div>
           <label>Team2</label>
           <input
             type="text"
             name="name2"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name2}
           />

`          <label>Run</label>
           <input
             type="text"
             name="run2"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.run2}
           />

            <label>wkt</label>
           <input
             type="text"
             name="wkt2"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.wkt2}
           />

            <label>over</label>
           <input
             type="text"
             name="over2"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.over2}
             />
           
           </div> 

           <button type="submit">
             Submit
           </button>
         </form>
       )}
     </Formik>
    </div>
    )
  };
  
  export default EditMatch;