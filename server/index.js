const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const mongoose= require("mongoose");
const postRoutes=require("./routes/posts");
const userRoutes=require("./routes/users")
const bodyParser=require("body-parser");
const app=express();

dotenv.config();
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
//adding above 2 lines, allows user's to upload clearer pics
app.use(cors());
app.use(express.json());


app.use("/posts",postRoutes);
app.use("/user",userRoutes);

app.get("/",(req,res)=>{
    res.send("APP IS RUNNING... ...");
})

const PORT=process.env.PORT||5000;
mongoose.connect(process.env.MONGO_URI,
{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,console.log(`SERVER RUNNING ON PORT ${PORT}`)))
.catch((err)=>console.log(err));
