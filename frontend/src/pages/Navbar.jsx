import React from 'react'
import { Flex ,Image} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex justifyContent="center" borderBottom="1px solid black" position="fixed" top={0} w="100%" height="80px" zIndex={10}>
          <Image src="https://stix.no/img/urlshort-preview.svg" w="300px" h="100%"/>
        </Flex>
  )
}

export default Navbar
