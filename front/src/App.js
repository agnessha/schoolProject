import '../src/App.css';
import React, {useContext, useEffect, useState} from 'react';
import {  ChakraProvider } from '@chakra-ui/react'
import {connect} from "react-redux";
import { AuthCon } from './components/AuthenticatedApp';
import DotRing from "./components/DotRing/DotRing";
import { MouseContext } from "./context/mouse-context";
import jwtDecode from "jwt-decode";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import {loginWithGoogle} from "./services/api";
import {addToken, setPreloader} from "./redux/UserReducer";
import { FaGoogle } from 'react-icons/fa';
import { Spinner } from '@chakra-ui/react'



const CustomButton = (props) => {

    const login = useGoogleLogin({
        onSuccess: CodeResponse => {
            console.log(CodeResponse)
            props.setPreloader(true)
            loginWithGoogle(CodeResponse.access_token).then((result) => {
                const user = {
                    id: result.data[0]._id,
                    email: result.data[0].email,
                    name: result.data[0].name
                }
                props.setUser(user);
                let tokenTime =  new Date().getTime()
                localStorage.setItem('token', JSON.stringify(CodeResponse.access_token))
                localStorage.setItem('token date',  JSON.stringify(tokenTime))
            }).catch((err) => {
                console.log(err.toJSON())
            });

        },
        scope: 'openid'

    });
    return (
        <div className="login" onClick={() => login()}>

            {props.isPreloader ?
                <div className="spinner">
                    <Spinner size='xl' />
                </div>
                :
                <div className="loginBtn">
                    <span style={{padding: '15px'}}>Login with </span> <FaGoogle w={8} h={8} />
                </div>
            }

        </div>
    )
}


const App = (props) => {

    useEffect(() => {
        let creationDate = JSON.parse(localStorage.getItem('token date'))
        let nowTime = new Date().getTime()
        let elapsed = nowTime - creationDate
        if (elapsed > 1800000) {
            localStorage.clear()
        }
        let token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            props.setPreloader(true)
            loginWithGoogle(token).then((result) => {
                const user = {
                    id: result.data[0]._id,
                    email: result.data[0].email,
                    name: result.data[0].name
                }
                setUser(user);
            }).catch((err) => {
                console.log('error with token')
            })
        }
    }, [])


    const [user, setUser] = useState(props.user)

    console.log(user)
    const { cursorType, cursorChangeHandler } = useContext(MouseContext)

    return (
            <ChakraProvider>
                <GoogleOAuthProvider clientId="911709305934-0anb6t48fa5f38eqrckpp9u2b090v1ps.apps.googleusercontent.com">
                <DotRing />
                <div
                    onMouseEnter={() => cursorChangeHandler("hovered")}
                    onMouseLeave={() => cursorChangeHandler("")}
                >
                    {user ? <AuthCon user={user}/> :
                        <CustomButton setPreloader={props.setPreloader} isPreloader={props.isPreloader} setUser={setUser} />
                    }
                </div>
                </GoogleOAuthProvider>
            </ChakraProvider>
    )
}


let mapStateToProps = (state) => {
    return {
        user: state.user.user,
        isPreloader: state.user.isPreloader
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setPreloader: (isPreloader) => {dispatch(setPreloader(isPreloader))}
    }
}

export const AppCon = connect(mapStateToProps, mapDispatchToProps)(App)

