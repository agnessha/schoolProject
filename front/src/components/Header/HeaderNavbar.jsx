import React from 'react'
import '../../App.css'
import { Flex } from '@chakra-ui/react'
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {addToken, addUser, setPreloader} from "../../redux/UserReducer";



function HeaderNavbar(props) {

    return (
        <div className='headerLinks' >
            <Flex>
            <div className='headerNotes' >
                <NavLink to='/'>
                    <span>Notes</span>
                </NavLink>
            </div>
            <div className='headerCalendar' >
                <NavLink to='/calendar'>
                    <span>Calendar</span>
                </NavLink>
            </div>
                <div className="headerLogout">
                    <span onClick={() => {
                        localStorage.clear();
                        window.location.reload(false);
                        props.setPreloader(false)
                    }}>Log out</span>
                </div>
            </Flex>
        </div>
    )
}

let mapDispatchToProps = (dispatch) => {
    return {
        setPreloader: (isPreloader) => {dispatch(setPreloader(isPreloader))}
    }
}

export const HeaderNavCon = connect(null, mapDispatchToProps)(HeaderNavbar)
