const express=require("express")
const validUrl=require("valid-url")
require("dotenv").config();
const shorturlModel=require("../model/shorturlModel")
const BaseUrl=process.env.BASE_URL
const UrlRouter=express.Router()
const { default: ShortUniqueId } = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });

UrlRouter.post("/short",async(req,res)=>{
    const {longUrl,customName}=req.body
    if (!validUrl.isUri(BaseUrl)) {
        return res.send({ message: "Invalid Base URL" });
    }
    if(validUrl.isUri(longUrl)){
        try{
            const url=await shorturlModel.findOne({longUrl})
            if(url){
                return res.send({message:"This url alreadt exits",data:url.shortUrl})
            }else{
                if(customName){
                    const shortUrl=`${BaseUrl}/${customName}`
                    const customUrl=await shorturlModel.findOne({shortUrl})
                    if(customUrl){
                        return res.send({message:"Url already exits"})
                    }else{
                        const newUrl=new shorturlModel({
                            urlCode:customName,longUrl,shortUrl
                        })
                        await newUrl.save()
                        return res.send({ message:"new short url generated successfully",data: shortUrl})

                    }
                }
                else{
                    const urlCode=uid()
                    const shortUrl=`${BaseUrl}/${urlCode}`;

                    const newUrl=new shorturlModel({
                        urlCode,longUrl,shortUrl
                    })

                    await newUrl.save()
                    return res.send({
                                message: "new short url generated successfully",
                                data: shortUrl,
                            })
                }
            }
        }
        catch(err){
            return res.send({ message: "Internal Server Error" })
        }
    }else{
         return res.send({ message: "Invalid Long URL" });
    }
})

UrlRouter.get("/:code",async(req,res)=>{
    const {code}=req.params
    try{
        const url=await shorturlModel.findOne({urlCode:code})
        if(url){
            return res.redirect(url.longUrl)
        }else{
            return res.send({ message: "Url not found" })
        }
    }
    catch(err){
        return res.send({ message: "Internal Server Error" });
    }
})

module.exports=UrlRouter