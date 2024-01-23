// import { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
// import axios from "axios";

const Login=()=>{
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (values, onSubmitProps) => {
    // const response= await axios.post('http://localhost:3000/login',values)
    // console.log(response)
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    console.log(response)
    const loggedIn = await response.json();
    onSubmitProps.resetForm();
    if(loggedIn){
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
        
      );
      navigate("/");
      // console.log(loggedIn.user)
      
    }
  };

  return(
    <div>
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={{  email:'',password:''}}
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
    })=>(
      <form onSubmit={handleSubmit} style={{display:'block'}}>
        <div>
        <label>email</label>
          <input type="text"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}></input>
        </div>

<div>
        <label>password</label>
          <input type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}></input>
</div>
<button type="submit">
             Submit
           </button>
      </form>

    )}
    </Formik>
    </div>
  )

}

export default Login;
