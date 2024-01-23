import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import axios from "axios";

const Register=()=>{
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (values, onSubmitProps) => {
    const response= await axios.post('http://localhost:3000/user/signup', 
      values
    )
    if(response){
      dispatch(
        setLogin({
          user: response.user,
          token: response.token,
        })
      );
      navigate("/");
    }
  };

  return(
    <div>
    
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={{ username: '', email:'',password:''}}
      // validationSchema={isLogin ? loginSchema : registerSchema}
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>username</label>
          <input
             type="text"
             name="username"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.username}
           />
        </div>

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

export default Register;