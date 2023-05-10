import React from 'react'
import  '../../App.css'
import {HeaderNavCon} from "./HeaderNavbar";
import { Spacer, Box, Flex } from '@chakra-ui/react'

const Header = () => {
    return (
        <div className='header'>
            <Flex>
                <Box className="headerTitle">
                    Notes
                </Box>
                <Spacer/>
                <HeaderNavCon/>
            </Flex>
        </div>
    )
}




export default Header;