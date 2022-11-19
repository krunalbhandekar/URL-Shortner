import React from "react";
import { Box, useColorModeValue ,Heading} from "@chakra-ui/react";
import Home from "./pages/Home"
import Footer from "./pages/Footer"
import Navbar from "./pages/Navbar";

function App() {
  return (
    <>
      <Navbar/>
      <Home/>
      <Footer/>
    </>
  );
}

export default App;
