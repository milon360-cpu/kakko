const connection = require('../Config/db');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// get center info 
exports.centerInfo = async (req,res)=>
{
    const sqlQuery = "SELECT * FROM center_info WHERE area = ?"
    const area = req.params.area;
    try 
    {
       connection.query(sqlQuery,area,(err,result)=>
        {
            if(err)
            {
                res.status(401).send 
                (
                    {
                        success : false,
                        message : err.message,
                        status: 401
                    }
                )
            }
            else 
            {
                res.status(200).send 
                (
                    {
                        success : true,
                        message : "get all data successfully",
                        status : 200,
                        data : result
                    }
                )
            }
        }) 
    } 
    catch (error) 
    {
        res.status(401).send 
        (
            {
                success : false,
                message : err.message,
                status: 401
            }
        )
    }
   
}


//register user
exports.registerSingleUser = async (req,res)=>
{
    const {name,email,phone,nid,slot,password} = req.body;

    const sqlQuery =  "INSERT INTO `registration`(`name`, `email`, `phone`, `nid`,`slot`,`password`) VALUES (? , ? , ? , ? , ? , ?)";
    try 
    {
             connection.query(sqlQuery,[name,email,phone,nid,slot,password],(err,result)=>
            {
                if(err)
                {
                    res.status(401).send 
                    (
                        {
                            success : false,
                            message : err.message,
                            status : 401
                        }
                    )
                }
                else 
                {
                    res.status(201).send 
                    (
                        {
                            success : true,
                            message : "Successfully Register",
                            status : 201,
                            data : result
                        }
                    )
                }
            })  
    } 
    catch (error) 
    {
        res.status(401).send 
        (
            {
                success : false,
                message : err.message,
                status : 401
            }
        )
    }
}

// Login user 
exports.loginUser = async (req,res)=>
{

    try 
    {   
        const {nid,password} = req.body;
        const sqlQuery =  'SELECT * FROM registration WHERE nid = ?'
        connection.query(sqlQuery,[nid],(err,result)=>
        {
            if(result.length < 1)
            {
                res.status(401).send 
                (
                    {
                        success : false,
                        message : "User not found",
                        status : 401
                    }
                )
                return
            }
            else if(result && result.length > 0)
            {
                const pass = result[0].password;
                if(pass === password)
                {
                   
                    res.status(200).send
                    (
                        {
                            success : true,
                            message : 'Successfully login',
                            name : result[0].name,
                            nid : result[0].nid
                        }
                    )
                }
                else 
                {
                    res.status(401).send 
                (
                    {
                        success : false,
                        message : "Invalid Password",
                        status : 401
                    }
                )
                }
            }
            else if(err) 
            {
                res.status(401).send 
                (
                    {
                        success : false,
                        message : err.message,
                        status : 401
                    }
                )
            }
            
        })
       
    }
    catch (error) 
    {
        res.status(401).send 
        (
            {
                success : false,
                message : err.message,
                status : 401
            }
        )
    }
}


// scheduls 
exports.getSchedule = (req,res)=>
{
    const {nid,age,date,area,name,center} = req.body
    const sqlQuery =  "INSERT INTO `scheduls`(`nid`, `age`, `date`, `area`, `name`, `center`) VALUES (? , ? , ? , ?, ?, ?)";
    try 
    {
             connection.query(sqlQuery,[nid,age,date,area,name,center],(err,result)=>
            {
                if(err)
                {
                    res.status(401).send 
                    (
                        {
                            success : false,
                            message : err.message,
                            status : 401
                        }
                    )
                }
                else 
                {
                    res.status(201).send 
                    (
                        {
                            success : true,
                            message : "Successfully Added ",
                            status : 201,
                            data : result
                        }
                    )
                }
            })  
    } 
    catch (error) 
    {
        res.status(401).send 
        (
            {
                success : false,
                message : err.message,
                status : 401
            }
        )
    }
}



// check existed user 
exports.existedUser = (req,res)=>
{
    try 
    {
        const nid = req.params.nid;
    const sqlQuery =  'SELECT * FROM registration WHERE nid = ?'
    connection.query(sqlQuery,[nid],(err,result)=>
    {
        if(result.length > 0)
        {
            res.status(201).send 
            (
                {
                    success : true,
                    message : "This user already exist",
                    status : 200,
                    result
                }
            )
        }
        else 
        {
            res.status(401).send 
            (
                {
                    success : false,
                    message : "user not exist",
                    status : 401
                }
            )
        }
    })

    } 
    catch (error) 
    {
        res.status(401).send 
            (
                {
                    success : false,
                    message : "user not exist",
                    status : 401
                }
            )
    }
    
}