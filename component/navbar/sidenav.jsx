import {useRouter} from 'next/router'
import {useState,useEffect} from 'react'
import { useAuth } from '../../context/AuthContext'
import Userlogout from './userlogout.jsx'
import Theme from '../changetheme/theme.jsx'
const Sidenav = function({DisplaySidenav}) {
  const router = useRouter()
  const { user } = useAuth()
  const [userLogout, setUserLogout] = useState(false)
  const loggingout = flag => {
  setUserLogout(userLogout => true && flag)
}
  return(
  <>
    <style jsx>{`
   
      a {
  color: var(--light-type-color) !important;
  text-decoration: none;
}
a:hover, a:active{
  color: rgb(255, 255, 255) !important;
  background-color: transparent !important;
  font-weight:bold;
}
    #navbar-nav{
    position: fixed;
    left:0;
    top:0;
    z-index: 7;
    background-color: var(--sub-theme-color);
    color: rgb(119, 119, 119);
    width: 400px;
    padding: 10vh 2vh !important;
    height: 100%;
    text-align: center;
    list-style: none;
    animation: 0.5s ease-in-out 0s 1 slideInFromLeft;
}
#div-overlay{
    width: 100%;
    height: 150%;
    position: fixed;
    left:0;
    top:0;
    z-index: 5;
    background-color: rgba(0,0,0, 0.6);
    animation: 0.5s ease 0s 1 FadeIn;
    backdrop-filter: blur(3px);
    animation-fill-mode: forwards;
}
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes FadeIn {
  0% {
    background-color: rgba(0,0,0,0);
  }
  100% {
    background-color: rgba(0,0,0,0.6);;
  }
}
@media only screen and (max-width: 600px) {
    #navbar-nav{
        width: 80%;
    }
}

.navitem{
  padding: 10px;
  margin: 0px 25%;
  cursor:pointer;
}
.navlink{
  padding: 5px;
}
.navitem:hover, navitem:active{
    background-color: var(--main-theme-color);
    color:rgb(255, 255, 255);
}
.navitem:hover a , .navitem:active a{
  color: rgb(255,255,255) !important;
  font-weight: bold !important;
}
.navbar-footer{
  position: absolute;
  background-color: var(--sub-theme-color);
  top:100%;
  transform:translate(0,-100%);
  text-align: left;
  padding-bottom:5%;
  justify-content: center;
}
      `}</style>
    <div className="container-fluid" id="navbar-container">
    <div className="toggler-items" id="toggler-items">
      <div className="div-overlay" id="div-overlay" onClick={event => DisplaySidenav(false)}/>
      <ul className="navbar-nav" id="navbar-nav">
        {user? 
        <>
        <li className="navitem" onClick={()=>{router.push("/dashboard").then( event => DisplaySidenav(false))}}>
          <a className="navlink" >
            My Profile
          </a>
        </li>
        <li className="navitem" onClick={()=>{router.push("/bookings").then( event => DisplaySidenav(false))}}>
          <a className="navlink">
            Bookings
          </a>
        </li>
        <li className="navitem"  onClick={()=>{router.push("/settings").then( event => DisplaySidenav(false))}}>
          <a className="navlink">
            Settings
          </a>
        </li>
          <hr/>
          <li className="navitem" onClick={()=>{router.push("/").then( event => DisplaySidenav(false))}}>
          <a className="navlink" >
            Home
          </a>
        </li>
        <li className="navitem" onClick={()=>{router.push("/about").then( event => DisplaySidenav(false))}}>
          <a className="navlink" >
            About Us
          </a>
        </li>
        <li className="navitem" onClick={()=>{router.push("/description").then( event => DisplaySidenav(false))}}>
          <a className="navlink" >
            Our Company
          </a>
        </li>
        <hr/>
        <li className="navitem">
          <a className="navlink" onClick={() => {setUserLogout(true)}}>
            Logout
          </a>
        </li>
        <div className="navbar-footer">
          <div className='row'>
            <Theme/>
          </div>
          <div className="row">
            <b>Follow Us</b>
          </div>
          <div className="col">
            <a className="btn-outline-light btn-floating m-1" role="button">
              <i className="bi bi-facebook m-3" />
            </a>
            <a className="btn-outline-light btn-floating m-1" role="button">
              <i className="bi bi-twitter m-3" />
            </a>
            <a className="btn-outline-light btn-floating m-1" role="button">
              <i className="bi bi-google m-3" />
            </a>
            <a className=" btn-outline-light btn-floating m-1" role="button">
              <i className="bi bi-instagram m-3" />
            </a>
          </div>
        </div>
        </> 
          : <>
        <li className="navitem">
          <a className="navlink">
            Customer
          </a>
        </li>
        <li className="navitem">
          <a className="navlink" href="https://job-worker.vercel.app/">
            Worker
          </a>
        </li>
        <hr/>
        <li className="navitem" onClick={()=>{router.push("/").then( event => DisplaySidenav(false))}}>
          <a className="navlink" >
            Home
          </a>
        </li>
        <li className="navitem" onClick={()=>{router.push("/about").then( event => DisplaySidenav(false))}}>
          <a className="navlink" >
            About Us
          </a>
        </li>
        <li className="navitem" onClick={()=>{router.push("/description").then( event => DisplaySidenav(false))}}>
          <a className="navlink" >
            Our Company
          </a>
        </li>
        <div className="navbar-footer">
          <div className="row">
            <div className="col-12">
              <a className="nav-link"  onClick={()=>{router.push('/login').then( event => DisplaySidenav(false))}}>
                Do you already have axisting account?
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <a className="nav-link" onClick={()=>{router.push('/signup').then( event => DisplaySidenav(false))}}>
                Register for a new account
              </a>
            </div>
          </div>
          <div className="row">
            <b>Follow Us</b>
          </div>
          <div className="col">
            <a className="btn-outline-light btn-floating m-1" role="button">
              <i className="bi bi-facebook m-3" />
            </a>
            <a className="btn-outline-light btn-floating m-1" role="button">
              <i className="bi bi-twitter m-3" />
            </a>
            <a className="btn-outline-light btn-floating m-1" role="button">
              <i className="bi bi-google m-3" />
            </a>
            <a className=" btn-outline-light btn-floating m-1" role="button">
              <i className="bi bi-instagram m-3" />
            </a>
          </div>
        </div>
        </> }
        
      </ul>
    </div>
  </div>
    {
        userLogout && <Userlogout loggingout={loggingout}/>
    }
  </>  
  )
}
export default  Sidenav