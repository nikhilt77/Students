const pool = require('../../db');
const queries= require('./queries');
const getStudentById=(req,res)=>{
    const id=parseInt(req.params.id);
    pool.query(queries.getStudentById,[id],(error,results)=>{
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
const getStudents=(req,res)=>{
    pool.query(queries.getStudents,(error,results)=>{
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const addStudent=(req,res)=>{
    const {name,email,age,dob}=req.body;
    //check if email already exists
    pool.query(queries.checkEmailExists,[email],(error,results)=>{
        if(error){
            throw error;
        }
        if(results.rows.length>0){
            res.status(400).send("Email already exists");
        }
        pool.query(queries.addStudent,[name,email,age,dob],(error,results)=>{
            if(error){
                throw error;
            }
            res.status(201).send("Student added successfully");
            console.log('Student added successfully');
        });
    }); 
};
const removeStudent=(req,res)=>{
    const id=parseInt(req.params.id);

    pool.query(queries.getStudentById,[id],(error,results)=>{
        if(error){
            throw error;
        }
        if(results.rows.length>0){
            pool.query(queries.removeStudent,[id],(error,results)=>{
                if(error){
                    throw error;
                }
                res.status(200).send("Student deleted successfully");
                console.log('Student deleted successfully');
            });
        }else{
            res.status(404).send("Student not found");
        }
    });
};
const updateStudent=(req,res)=>{
    const id=parseInt(req.params.id);
    const {name,email} = req.body;
    pool.query(queries.getStudentById,[id],(error,results)=>{
        if(error){
            throw error;
        }
        if(results.rows.length>0){
            pool.query(queries.updateStudent,[name,email,id],(error,results)=>{
                if(error){
                    throw error;
                }
                res.status(200).send("Student updated successfully");
                console.log('Student updated successfully');
            });
        }else{
            res.status(404).send("Student not found");
        }
    });
    };
module.exports={
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
};