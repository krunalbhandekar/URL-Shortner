import React,{useState} from 'react'
import copy from "copy-to-clipboard"
import {Box,Button,Flex,FormControl,FormHelperText,FormLabel,Input,InputGroup,InputLeftAddon,InputRightElement,useColorModeValue,useToast,} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import {postShortUrlApi} from "../action/action"


const initialState = {
    longUrl: "",
    customName: "",
};

const initialResult = {
    message: "",
    data: "",
};


const Home = () => {
  const [data, setdata] = useState(initialState)
  const [result, setresult] = useState(initialResult)
  const [error, seterror] = useState(false)
  const [loading, setloading] = useState(false)
  const [invalid, setinvalid] = useState(false)
  const [invalidUrl, setinvalidUrl] = useState(false)
  const toast = useToast();

  const handleOnchange=(e)=>{
    if(result.data != ""){
      setresult({...initialResult})
    }
    if(invalidUrl){
      setinvalidUrl(false)
    }
    if(invalid){
      setinvalid(false)
    }
    const {name,value}=e.target
    setdata({...data,[name]:value})
  }

  const handlesubmit=(e)=>{
    e.preventDefault()
    let hostcheck=data.longUrl.slice(0,5)
    if(hostcheck == "data:"){
      setinvalidUrl(true)
      toast({
        title: "Please enter correct url",
        status:"error",
        duration:2000,
        possition:"top"
      })
      return
    }
    else{
      getResult(data)
    }
  }

  const handlecopy=()=>{
    if(typeof result.data === "string"){
      copy(result.data)
      toast({
                title: "Text copied successfully",
                status: "success",
                duration: 1000,
                position: "top",
            });
    }
  }

  const getResult=(data)=>{
    setloading(true)
    seterror(false)
    setinvalid(false)
    setresult({...initialResult})
    postShortUrlApi(data).then((res)=>{
      setresult(res)
      toast({
                    title: `${res.message}`,
                    status: "success",
                    duration: 1000,
                    position: "top",
                });
    })
    .catch((err)=>{
      seterror(true)
      toast({
                    title: `${err?.response?.data?.message || err.message}`,
                    status: "warning",
                    duration: 1000,
                    position: "top",
                });

                if(err?.response?.data?.message=="Url already exits"){
                  setinvalid(true)
                }
    }).finally(()=>{
      setloading(false)
    })

  }

  return (
    <Box mt="80px" border="1px solid red">
      <form onSubmit={handlesubmit}>
        <Flex maxW="500px" m="auto" flexDir="column" gap="20px" p="20px 30px" rounded="md" bg={useColorModeValue("white","gray.700")}>
          <FormControl isRequired>
            <FormLabel>Enter Original Url</FormLabel>
            <Input type="text" isInvalid={invalidUrl} name="longUrl" value={data.longUrl} onChange={handleOnchange}/>
          </FormControl>
          <FormControl style={{display:`${result.data==""?"block":"none"}`}}>
            <FormLabel>Customize your link</FormLabel>
            <InputGroup>
            <InputLeftAddon maxW="50%" fontSize="15px" overflow="hidden" children="http://localhost:8080"/>
            <Input type="text" placeholder='Enter Custom Name' isInvalid={invalid} errorBorderColor="crimson" name="customName" value={data.customName} onChange={handleOnchange}/>
            </InputGroup>
            <FormHelperText color="red" display={invalid ? "block" :"none"} textAlign="right" >Url Name already exits...</FormHelperText>
          </FormControl>
          <FormControl style={{display:`${result.data !=""?"block":"none"}`}}>
            <FormLabel>short url</FormLabel>
            <InputGroup>
            <Input readOnly type="text" value={result.data}/>
            <InputRightElement>
            <Button onClick={handlecopy}><CopyIcon/></Button>
            </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button mt="30px" colorScheme="teal" variant="solid" type="submit" isLoading={loading} loadingText="Getting Ready..."  >Create Short Url</Button>
        </Flex>
      </form> 
    </Box>
  )
}

export default Home
