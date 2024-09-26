const express = require('express');
const studentRoutes = require('./src/Student/routes');
const app = express();
const port =3000;
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hello");
});
app.use('/api/v1/student',studentRoutes);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
