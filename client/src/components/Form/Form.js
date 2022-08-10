import React,{useState,useEffect} from "react";
import { TextField,Button,Paper,Typography } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch,useSelector } from "react-redux";
import { createPost,updatePost } from "../../actions/posts";
import FileBase from 'react-file-base64';
//FileBase used to upload files/images.

const Form=({currentId,setCurrentId})=>{
    const dispatch=useDispatch();
    const classes=useStyles();
    const post=useSelector((state)=>
    currentId!==0?state.posts.find((p)=>p._id===currentId):0
    );

    const user=JSON.parse(localStorage.getItem("profile"));
    const [postData,setPostData]=useState({
        
        title:"",
        message:"",
        tags:"",
        selectedFile:""
    });


    useEffect(()=>{
        if(post) setPostData(post);
    },[post])



    const clear=()=>{
        setCurrentId(0);
        setPostData({
            title:"",
            message:"",
            tags:"",
            selectedFile:""
        })
    }
    const handleSubmit=async function(e){
        e.preventDefault();
        if(currentId!==0)
        {
            await dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
            clear();
            /*
            function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
            }
            async function demo() {
            for (let i = 0; i < 5; i++) {
            console.log(`Waiting ${i} seconds...`);
            await sleep(i * 1);
            }
            //history.push("/chats");
            await sleep(0);
            console.log("done");
            window.location.reload();
            }
            demo();*/
        }
        else
        {
            await dispatch(createPost({...postData,name:user?.result?.name}));
            clear();
        }
        //just calling preserves values present in the form,since we 
        //have implemented it as holding current values
        //set to default postData
    }
    
    if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your reviews and like other's Review.
        </Typography>
      </Paper>
    );
  }

    return(
        <Paper className={classes.paper} >
           <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            
            <Typography variant="h6">{currentId?"Edit Review":"Create Review"}</Typography>
            
            <TextField 
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e)=>{return setPostData({...postData,title:e.target.value})}}></TextField>
            
            <TextField 
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e)=>{return setPostData({...postData,message:e.target.value})}}></TextField>
            
            <TextField 
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e)=>
            {return setPostData({...postData,tags:e.target.value.split(",")})}}>
            </TextField>
            
            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;