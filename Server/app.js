const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./Router/Router");


app.use(cors());
app.use(router);

// handel routing error 
app.use((req,res,next)=>
{
    res.status(404).send 
    (
        {
            success : false,
            message : "page not found",
            status  : 404
        }
    )
})

// server error 
app.use((err,req,res,next)=>
{
    res.status(500).send
    (
        {
            success : false,
            message : err.message,
            status : 500
        }
    )
})
module.exports = app;