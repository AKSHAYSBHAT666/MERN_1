import React from "react";
import Post from "./Post/Post";
import {Grid,CircularProgress} from "@material-ui/core";
import {useSelector} from "react-redux";
import useStyles from "./styles";


const Posts=({setCurrentId})=>{

    const posts=useSelector((state)=>{return state.posts})
    
    const classes=useStyles();
    
    return(
       !posts.length?<CircularProgress></CircularProgress>:(
        <Grid className={classes.container} container alignItems="stretch" spacing={2}>
            {
                posts.map((post)=>(
                    <Grid key={post._id} item xs={12} sm={6}>
                    <Post post={post} setCurrentId={setCurrentId}>

                    </Post>
                    </Grid>
                ))
            }
        </Grid>
       )
    )
}

export default Posts;