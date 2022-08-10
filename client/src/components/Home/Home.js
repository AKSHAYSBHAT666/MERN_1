import React,{useEffect,useState} from "react";
import {Container,Grow,Grid} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
//import useStyles from "./styles";
import {getPosts} from "../../actions/posts";
import { useDispatch} from "react-redux";


const Home=()=>{

    //const classes=useStyles();
    const dispatch=useDispatch();
    const [currentId,setCurrentId]=useState(0);
    //const post=useSelector((state)=>state);
    useEffect(()=>{
        dispatch(getPosts());
    },[currentId,dispatch])


    return(
    <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={4}>
                        
                        <Grid item xs={12} sm={7}>
                            <Posts 
                            setCurrentId={setCurrentId}/>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Form 
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                            />
                        </Grid>

                    </Grid>
                </Container>

    </Grow>
    );
}

export default Home;