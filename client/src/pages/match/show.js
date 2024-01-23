import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { CssBaseline, Box, Button, Container, IconButton } from '@mui/material'
import { FavoriteBorder, Favorite } from '@mui/icons-material'
import { useSelector } from "react-redux"
import { Formik } from "formik";
import { useState, useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Show = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const token = useSelector((state) => state.token);
  const [match, setmatch] = useState([]);

  const [isLiked, setisLiked] = useState(false);
  const [likes, setlikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [author, setauthor] = useState('')
  const [found, setfound] = useState(false);

  async function fetchData() {
    try {
      // console.log(user)
      const res = await axios.get(`http://localhost:3000/match/${id}`);
      // console.log(res.data)
      const match = res.data
      if (match) {
        setfound(true);

      }
      // console.log(found)
      setmatch(match);
      setlikes(match.likes.length)
      setComments(match.comments)
      setauthor(match.author.username)
      if (user)
        match.likes.forEach(curr => {
          if (curr == user._id) {
            setisLiked(true)
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {

    fetchData();
  }, [id, user]);



  const handleDeleteMatch = async () => {
    const response = await axios.delete(`http://localhost:3000/match/${id}`);

    if (response) {
      navigate("/");
    }
  }


  const handleCommentSubmit = async (values, onSubmitProps) => {
    const response = await axios.post(`http://localhost:3000/match/${id}/comment`,
      { values, user }
    )
    if (response) {
      onSubmitProps.resetForm();
      fetchData();
    }
  }

  const patchLike = async () => {
    if (isLiked) {
      setlikes(likes - 1);
    }
    else {
      setlikes(likes + 1);
    }
    if (user == null) {
      navigate("/login")
    }
    else {
      const response = await fetch(`http://localhost:3000/match/${id}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, liked: isLiked }),
      });
      const updatedPost = await response.json();
      // console.log(updatedPost)
      setisLiked(!isLiked);

    }

  };

  return (
    <Box>
      <CssBaseline>

        {!found ? <h2>Not Found Go Back</h2> :
          <Box>
            <h3>
              <Button
                onClick={() => {
                  navigate(`/Profile/${match.author._id}/posts`)
                }}> <AccountCircleIcon /> {author}</Button> posted:
            </h3>

            <Box sx={{marginLeft:'2em',}}>
            <Box sx={{marginRight: '17%', marginLeft:'17%',marginBottom:'5em',padding:'3em',border: 'solid 0.3em'}}>
              <h2>{match.name1} Vs {match.name2} <span >,{match.srl}th match</span></h2>

              
              <Box
                sx={{
                  display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10em',
                  marginLeft: '4em', fontSize: '14px', marginBottom: '2em'
                }}>
                <Box >
                  <Box component="div" sx={{ display: 'inline', fontStyle: 'italic' }}>Series: </Box>
                  <Box sx={{ display: 'inline', fontWeight: '800' }}>{match.tournament}</Box>
                </Box>
                <Box> <Box component="div" sx={{ display: 'inline', fontStyle: 'italic' }}> Date and Time </Box>:
                  <Box sx={{ display: 'inline', fontWeight: '800' }}>{match.date}</Box>
                </Box>
              </Box >

              <Box sx={{
                height: '0.25em', backgroundColor:'red', marginBottom:'2em'
              }}></Box>

              <Box sx={{
                fontSize: '18px',
                fontWeight: 'bold', marginBottom:'2em'
              }}>
                <Box >
                  <Box sx={{ display: 'inline', fontStyle: 'italic', opacity: '80%' }}>{match.name1}</Box>
                  <Box sx={{ display: 'inline' }}> {match.run1}/{match.wkt1} ({match.over1}) </Box>
                </Box>
                <Box>
                  <Box sx={{ display: 'inline', fontStyle: 'italic', opacity: '80%' }}>{match.name2}</Box>
                  <Box sx={{ display: 'inline' }}>  {match.run2}/{match.wkt2} ({match.over2})</Box>

                </Box>
              </Box>

              <Box sx={{
                color: '#1866db',
                lineHeight: '1.5', marginBottom:'2em', fontSize:'1.2em'
              }}>
                {match.status}
              </Box>


              <Box sx={{marginBottom:'2em'}}>
                <Box sx={{ fontWeight: '700' }}>
                  Player of the Match:
                </Box>
                <Box sx={{fontWeight:'500'}}>
                  {match.potm}
                </Box>
              </Box>

            <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Box sx={{display:'flex', flexDirection:'column'}}>
             {user && user._id === match.author._id && (
                <Box sx={{display: 'inline'}}>
                  <Link to={`/edit/${match._id}`}>Edit</Link>
                </Box>
              )}
              {/* <Box> */}

              {user && user._id === match.author._id && (
                <Button onClick={handleDeleteMatch} sx={{display: 'inline'}}>Delete</Button>
              )}
             </Box>

              <Box sx={{display:'flex'}}>
              
                <IconButton onClick={patchLike} sx={{width:'20px'}}>
                  {!isLiked ? (
                    <FavoriteBorder />
                  ) : (
                    <Favorite sx={{ color: 'red' }} />
                  )}
                </IconButton>
                <Box sx={{marginTop:'0.75em',marginLeft:'0.5em'}}>
                {likes}
                </Box>
                
              </Box>
            </Box>

              </Box>



              <Formik
                initialValues={{ comment: "" }}
                onSubmit={handleCommentSubmit}>
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <textarea
                        type="text"
                        name="comment"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.comment}
                        minLength={1}
                        cols="40" rows="4"
                        style={{fontSize:'1.5em',padding:'0.5em'}}
                      />
                    </div>
                    <button type="submit"> Comment</button>
                  </form>
                )}
              </Formik>

              <Box>
                {comments && comments.map && comments.map((comment) => {
                  return (
                    <Container sx={{ justifyContent: 'start' }} key={comment._id} onClick={() => {
                      navigate(`../show/${comment.match}`)
                    }}>
                      <Box variant="contained" sx={{
                        bgcolor: '#57787D',
                        boxShadow: 5,
                        borderRadius: 5,
                        p: 3, m: 3,
                        minWidth: 300
                      }}>

                        <Button
                          sx={{ fontStyle: "italic" }}
                          onClick={() => {
                            navigate(`/Profile/${comment.author._id}/posts`)
                          }}>
                          {comment.author.username}
                        </Button>
                        <Box
                          sx={{ fontWeight: "bold", color: "green", backgroundColor: "yellow", width: "fitcontent", padding: "1em" }}>
                          {comment.description}
                        </Box>

                        {user && comment.author._id == user._id &&
                          <Button
                            onClick={async () => {
                              const response = await axios.delete(`http://localhost:3000/comment/${comment._id}`);

                              if (response) {
                                console.log(response);
                                fetchData()
                              }
                            }}
                            sx={{ marginLeft: "60%", backgroundColor: "red", fontWeight: "bold", marginTop: '1em' }}  >
                            delete
                          </Button>
                        }

                      </Box>
                    </Container>
                  )
                })}
              </Box>

            </Box>
          </Box>
        }

      </CssBaseline>

    </Box>


  )
}
export default Show;