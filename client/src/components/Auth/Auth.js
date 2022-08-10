import React,{useState} from "react";
import {Avatar,Button,Paper,Grid,Typography,Container,Grow} from "@material-ui/core"
import useStyles from "./styles";
import Input from './Input';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {signup,signin} from "../../actions/auth";

const Auth=()=>{

    const dispatch=useDispatch();
    const history=useHistory();

    const [form, setForm] = useState(
        { firstName: '', 
        lastName: '', 
        email: '', 
        password: '', 
        confirmPassword: '' }
    );

    const [isSignup, setIsSignup] = useState(false);
    const classes=useStyles();
    const [showPassword, setShowPassword] = useState(false);
    
    const handleShowPassword = () => setShowPassword(!showPassword)

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(form);

        if(isSignup)
        {
            await dispatch(signup(form,history))
        }
        else{
            await dispatch(signin(form,history))
        }
    }

    const handleChange = (e) => setForm
    ({ ...form, [e.target.name]: e.target.value });

    const switchMode = () => {
    setForm({ firstName: '', 
        lastName: '', 
        email: '', 
        password: '', 
        confirmPassword: '' });
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };


    return(
        <Grow in>
         <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                 <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                     <Grid container spacing={2} >
                        { isSignup && (
                            <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                        
                    </Grid>  
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>

                    <Grid container justifyContent="center">
                        <Grid item>
                         <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                        </Button>
                        </Grid>
                    </Grid>
          </form>
            </Paper>
         </Container>
         </Grow>
    )
}

export default Auth;