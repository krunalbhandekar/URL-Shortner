import axios from "axios";

export const postShortUrlApi=async(data)=>{
    let result=await axios.post("http://localhost:8080/short",data)
    return result.data
}