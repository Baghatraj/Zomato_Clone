import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import style from "../style/modal.module.css";
import { GoogleLogin, GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import jwtDecode from "jwt-decode";
import axios from 'axios';

const Header = (props) => {
    const [path, setPath] = useState('')
    const [bgcolor, setBgcolor] = useState('')
    const [display, setDisplay] = useState('')
    const [message, setMessage] = useState('')
    const [messagePos, setMessagePos] = useState('')
    const [username, setusername] = useState(undefined);
    const [islogged, setIslogged] = useState(false)
    const [modal, setmodal] = useState(false)
    const [modalAcc, setmodalAcc] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "350px",
        },
    };
    // state for create Account
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNo, setPhoneNo] = useState(Number)
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')



    useEffect(() => {
        setPath(location.pathname)
    }, [location.pathname])

    useEffect(() => {
        if (path === '/' || path === '/home') {
            setBgcolor('rgba(0,0,0,0.5)')
            setDisplay('none')
        } else {
            setBgcolor('tomato')
            setDisplay('block')
        }
    }, [path])

    const handleClick = () => {
        setmodal(true)
    }

    const handleClickAcc = () => {
        setmodalAcc(true)
    }

    const handleClose = () => {
        setmodal(false)
        setMessage('')
    }

    const handleCloseAcc = () => {
        setmodalAcc(false)
        setMessage('')
        setMessagePos('')
    }

    const resGoogle = (response) => {
        setIslogged(true)
        const creds = jwtDecode(response.credential);
        setusername(creds.given_name);
    }

    const logout = () => {
        googleLogout();
        setIslogged(false)
        sessionStorage.clear()
    }

    const handleHome = () => {
        navigate('/')
    }

    const handleSubmit = () => {
        setMessage('')
        setMessagePos('')
        if(!name || !email || !phoneNo || !address || !password){
             return setMessage('enter details please') 
        }else{
            const data = {
                Name: name,
                email: email,
                phoneNo: phoneNo,
                address: address,
                password: password
            }
            axios.post('http://localhost:8800/register', data)
            .then(res => setMessagePos(res.data.message))
            .catch(err => setMessage(err.response.data.message))
        }
    
    }

    const handleLogin = () => {
        setMessage('')
        if(email.length === 0 || password.length === 0){
             return setMessage('enter details please') 
        }else{
            const login = {
                email: email,
                password: password
            }
            axios.post('http://localhost:8800/login', login)
            .then((res) => {
                const token = res.data.token
                axios.get('http://localhost:8800/auth', { headers: { 'Authorization': token } })
                    .then(res1 => {
                        setusername(res1.data.Name)
                        setIslogged(true)
                        setmodal(false)
                        sessionStorage.setItem('data', JSON.stringify(res1.data.user))
                    })
                    .catch((error) => console.log(error));
            })
            .catch(err => setMessage(err.response.data.message)) // change here first
        }
    }

    return (
        <div>
            <div className="main" style={{ backgroundColor: bgcolor }}>
                <div className="flex">
                    <div className="logo" style={{ display: display }} onClick={handleHome}>e!</div>
                    {!islogged ? (
                        <div className="buttons">
                            <button className="login" onClick={handleClick}>Login</button>
                            <button className="create" onClick={handleClickAcc}>Create an Account</button>
                        </div>
                    ) : (
                        <div className="buttons">
                            <button className="login" >{username}</button>
                            <button className="create" onClick={logout}>Logout</button>
                        </div>
                    )}

                </div>
            </div>
            <Modal isOpen={modal} style={customStyles} ariaHideApp={false}>
                <div className={style.header}>
                    <h3>Login</h3>
                    <button onClick={handleClose} className={style.xbtn}>x</button>
                </div>
                <div>
                    <input type="email" placeholder="Email" className={style.input} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input type="password" placeholder="Password" className={style.input} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className={style.btn} >
                    <button className={style.yes} onClick={handleLogin}>Login</button>
                    <button className={style.no} onClick={handleClose}>Cancel</button>
                </div>
                <div className={style.msg}>
                    {message ? message : null}
                </div>
                <div className={style.acc}>
                    <div>
                        <GoogleOAuthProvider clientId="697792381089-u4d64h1rbr6k387rmqmtnjm9mag3phkn.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={resGoogle}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                width={"308px"}
                            />
                        </GoogleOAuthProvider>
                    </div>
                    <button className={style.fb}>Continue with Facebook Account</button>
                </div>
            </Modal>
            <Modal isOpen={modalAcc} style={customStyles} ariaHideApp={false}>
                <div>
                    <h3>New Account</h3>
                    <div>
                        <label htmlFor="name">Name:</label><br />
                        <input id="name" type="text" placeholder="Enter your Name" className={style.input} required onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label><br />
                        <input id="email" type="text" placeholder="Enter your Email" className={style.input} required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="phone">PhoneNo:</label><br />
                        <input id="phone" type="number" placeholder="Enter your Name" className={style.input} required onChange={(e) => setPhoneNo(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label><br />
                        <input id="address" type="text" placeholder="Enter your Name" className={style.input} required onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label><br />
                        <input id="password" type="password" placeholder="Enter your Name" className={style.input} required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className={style.msgpos}>
                        {messagePos ? messagePos : null}
                    </div>
                    <div className={style.msg}>
                        {message ? message : null}
                    </div>
                    <div className={style.btn}>
                        <button className={style.yes} onClick={handleSubmit}>Submit</button>
                        <button className={style.no} onClick={handleCloseAcc}>Close</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Header