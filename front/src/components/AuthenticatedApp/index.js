import React, {useEffect} from 'react';
import Header from "../Header/Header";
import {Route, Routes} from "react-router-dom";
import TodayCon from "../Today/Today";
import CalendarCon from "../Calendar/Calendar";
import {addToken, addUser} from "../../redux/UserReducer";
import {connect} from "react-redux";



function AuthenticatedApp(props) {

    props.addUser(props.user)

    return (
        <div className="App">
            <div>
                <Header />
            </div>
            <div className='AppInner'>
                <Routes>
                    <Route path='/' element={<TodayCon/>}/>
                    <Route path='/calendar' element={<CalendarCon />}/>
                </Routes>
            </div>
        </div>
    )
}

let mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => {dispatch(addUser(user))},

    }
}

const AuthCon = connect(null, mapDispatchToProps)(AuthenticatedApp);


export { AuthCon };