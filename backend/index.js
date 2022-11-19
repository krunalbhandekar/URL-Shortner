const express=require("express")
const cors=require("cors")
require("dotenv").config()

const app=express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

const connection=require("./config/config")
const UrlRouter=require("./route/shorturlRoute")

app.use("/",UrlRouter)

app.get("/",(req,res)=>{
    return res.send("Homepage")
})

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("DB Connected")
    }
    catch(err){
        console.log(err);
    }
    console.log(`DB Connected at port ${process.env.PORT}`);
})