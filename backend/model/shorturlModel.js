const mongoose=require("mongoose")

const shorturlSchema=new mongoose.Schema({
    longUrl: String,
    shortUrl: String,
    urlCode: String,
})

const shorturlModel=mongoose.model("shorturl",shorturlSchema)

module.exports=shorturlModel