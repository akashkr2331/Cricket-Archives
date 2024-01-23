
import { useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import { Container } from "@mui/material";

const MatchBar=function({match}){

    const navigate = useNavigate();

    return(
        <Container sx={{justifyContent:'start'}}>
    <Button variant="contained" sx={{
  bgcolor: '#57787D',
  boxShadow: 5,
  borderRadius: 5,
  p: 3,m: 3,
  minWidth: "400px",
  fontSize:"1.5em"

}} onClick={() => {
  navigate(`/show/${match._id}`)
}}>
  {/* <Link to= {`/show/${match._id}`}> */}
    {match.status}
    {/* </Link> */}
</Button>
    </Container>
    )
}

export default MatchBar;