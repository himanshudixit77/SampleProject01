const express=require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const zod=require( 'zod')
const bcrypt=require('bcrypt')
const jwtPassword = 'secret';

const app=express()
app.use(express.json())

mongoose.connect("mongodb+srv://himanshudixitdev:FirstPassword@cluster0.plpbgdg.mongodb.net/Project?authSource=admin",{useNewUrlParser:true,useUnifiedTopology:true})



const User=mongoose.model('Users',{userName:String,password:String,email:String,name:String})

   /*async function bcryptPassword(password){
return await bcrypt.hash(password,10);
  }
*/
  app.post("/signup",async(req,res)=>{

  const userName=req.body.userName
    const password=req.body.password
    const name=req.body.name
    const email=req.body.email
    
  const userInfo= await User.findOne({'email':email})
    if(userInfo){
    return   res.status(400).send({
        msg:'User already found there'
      })
    }

    const signature = jwt.sign({userName:userName},jwtPassword)
    
   // const hashpwd= await bcryptPassword(password)
   
    const userSchema=new User({
      userName:userName,
      password:password,
      email:email,
      name:name
    })
    User.insertMany([userSchema])
  return  res.json({ signature})
    
})


app.get("/allUser",function(req,res){

const a=["himanshuDixit@gmail.com","qwerty@gmail.com"]
  
const token=req.headers.autherisation;
  const email=req.headers.email;
  const verified=jwt.verify(token,jwtPassword)
  if(!verified){  
    res.status(400).send({msg:'Invalid token'})
  }
  else{

    const user1=verified.email;
    res.json({
      users: a.filter(function(value) {
        if (value == user1) {
          return false;
        }
        return true;
      })
    })



  }
})

app.listen(3000)
