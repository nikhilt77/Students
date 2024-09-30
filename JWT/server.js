const express = require('express');
const app= express();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());

app.listen(3100, () => {
    console.log('Server is running on port 3100');
});
const users=[];
app.get('/users',authenticateToken,(req,res)=>{
    res.json(users.filter(user=>user.name===req.user.name));
});
app.post('/users',async(req,res)=>{
    try{
        const salt=await bcrypt.genSalt();
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        console.log(salt);
        console.log(hashedPassword);
        const user={name:req.body.name,password:hashedPassword,role:req.body.role};
        users.push(user);
        res.status(201).send();
    }
    catch{
        res.status(404).send("Error");
    }
});
/*const posts=[
    {
        "name":"John",
        "age":25,
    },
    {
        "name":"Jane",
        "age":30,
    }
];
app.post("/users",(req,res)=>{

/*app.get('/posts', (req, res) => {
    res.json(posts);
});*/
/* app.post('/users/login',async(req,res)=>{
    //Authenticate User

    const username=req.body.name;
    const user=users.find(user=>user.name=req.body.name)
    if(user==null){
        return res.status(400).send('Cannot find user');
    }
    console.log('User Password:', user.password); // Log the user password
    try{
        if(await bcrypt.compare(req.body.password,user.password)){
            const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
            console.log(accessToken); 
            return res.json({accessToken:accessToken});
            //res.send('Success');
        }
        else{
            res.send('Not Allowed');
        }
    }
    catch(error){
        console.error(error);
        res.status(500).send();
    }//const username=req.body.name;
});*/
function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];//if ew have authHeader then split it and take the second part
    if(token==null){
        return res.sendStatus(401);
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
            return res.sendStatus(403);
        }
        req.user=user;
        next();
    });
}
