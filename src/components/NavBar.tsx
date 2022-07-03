/* eslint-disable */
import {
  notification,
} from 'antd'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './Auth/Login'
import Register from './Auth/Register'
import{
  axiosRegister,
  axiosLogin,
  axiosLogout,
} from '../Api/AuthAxios'
import { useCookies } from 'react-cookie';

type NotificationType = 'error'|'success'|'info'|'warning';

const openNotification = (type: NotificationType, message: string) => {
  notification[type]({
    message: message,
  });
};

const NavBar = () => {

  const [cookies, setCookie, removeCookie] = useCookies();

  //ModalState
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false)

  const handleRegister = (body:any) => {
    axiosRegister(body)
      .then((res) => {
        openNotification('success', 'Register Successful, Please Login');
      })
      .catch((err) => {
        openNotification('error', 'Register Failed');
      })
  }

  const handleLogin = (body:any) => {
    axiosLogin(body)
      .then((res) => {
        setCookie('user', res.data.user.role, { path: '/' });
        setCookie('token', res.data.access_token, { path: '/' });
        setLoggedIn(true)
        openNotification('success', 'Login Successful');
      })
      .catch((err) => {
        openNotification('error', 'Login Failed');
      })
  }

  const handleLogout = (token:string) => {
    axiosLogout(token)
      .then((res) => {
        removeCookie('token');
        removeCookie('user');
        openNotification('success', 'Logout Successful');
        setLoggedIn(false)
      })
      .catch((err) => {
        openNotification('error', 'Logout Failed');
      })
  }

  useEffect(() => {
    if(cookies.token){
      setLoggedIn(true)
    }
  }, [cookies.token])

  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">ARCHIVE</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>
          {!loggedIn && <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" onClick={() => setShowModalRegister(true)}>Register</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => setShowModalLogin(true)}>Login</a>
              </li>
            </ul>
          </div>}
          {loggedIn && <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" onClick={() => handleLogout(cookies.token)}>Logout</a>
              </li>
            </ul>
          </div>}
        </div>
      </div>
      <Login 
        showModal={showModalLogin} 
        handleClose={() => setShowModalLogin(false)}
        handleLogin={(body) => handleLogin(body)}
      ></Login>
      <Register
        showModal={showModalRegister} 
        handleClose={() => setShowModalRegister(false)}
        handleRegister={(body) => handleRegister(body)}
      ></Register>
    </nav>
  )
}

export default NavBar;