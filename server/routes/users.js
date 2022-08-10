const express=require("express");
const { signin,signup } = require("../controllers/user");
const router=express.Router();

//for sending all details of the form to backend.
router.post("/signin",signin);
router.post("/signup",signup);

module.exports=router;