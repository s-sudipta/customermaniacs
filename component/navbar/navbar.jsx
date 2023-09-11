import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import {useState ,useEffect} from 'react';
import logo from '../../public/icon.png';
import Image from 'next/image';
import NavDash from "./navdash.jsx"
import UserNav from "./usernav.jsx"

import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router';

const Sidenav = dynamic(() => import('./sidenav.jsx'), {
  suspense: true,
})


export default function Navbar(){
const {userdata,user} = useAuth()
const router = useRouter()
const [windowHeight, setwindowHeight] = useState(0);
const [visible, setVisible] = useState(true);
const [sidenav,setsidenav] = useState(false);

useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  
  function handleScroll() {
    const currentYOffset = window.pageYOffset;
    const visibleFlag = (windowHeight > currentYOffset);
    setwindowHeight(window.scrollY);
    setVisible(visibleFlag);
  }
useEffect(() => {
    const navBar = document.getElementById("topnavbar");
  navBar.style.backgroundColor = "var(--sub-theme-color)";
  
  if (windowHeight == 0) {
    if(router.pathname == '/')//checking for home page
    {
      navBar.style.backgroundColor = "transparent";
    }
  }
  if(visible == true || sidenav){
    navBar.style.transform = "translateY(0%)";
    navBar.style.visibility= "visible";
    if(sidenav){
      navBar.style.backgroundColor = "transparent";
    }
  }
  else{
    navBar.style.transform = "translateY(-100%)";
    navBar.style.visibility= "hidden";
  }
  }, [windowHeight, sidenav]);

  const DisplaySidenav = flag =>{
    setsidenav(sidenav => true && flag)
    if(flag==false){
      if(document.getElementById("togglericon").classList[2] == 'bi-x-lg'){
        document.getElementById("togglericon").classList.replace("bi-x-lg","bi-list");
        document.getElementById("topnavbar").style.backgroundColor = "var(--sub-theme-color)";
        document.body.style.overflowY = 'scroll';
      }
    }
  }

 
  function changeToggler(){
  var toggler = document.getElementById("togglericon");
  if(toggler.classList[2] == 'bi-list'){
       toggler.classList.replace("bi-list", "bi-x-lg");
      document.getElementById("topnavbar").style.backgroundColor = "transparent";
    document.body.style.overflowY = 'hidden';
    window.history.pushState({id:1},null,null)
      setsidenav(true)
  }
  else{
    toggler.classList.replace("bi-x-lg","bi-list");
    document.getElementById("topnavbar").style.backgroundColor = "var(--sub-theme-color)";
    document.body.style.overflowY = 'scroll';
    setsidenav(false)
  }
  
}
  return(
    <>
      <style jsx>{`
        a {
  color: var(--light-type-color) !important;
  text-decoration: none;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}
a:hover, a:active{
  color: rgb(255, 255, 255) !important;
}
.col a:hover, .col a:active{
  color: rgb(255, 255, 255) !important;
  background-color:var(--sub-theme-color);
}
.navbar-brand a{
  font-size: calc(0.8vw + 2.5vh);
  font-family: "BBfont", Fallback, sans-serif;
  
}

.navbar{
  padding: 0 5px 0 5px !important; 
}
nav{
  transition: ease-in-out 0.5s;
}
#toggler{
  border: 3px solid var(--main-theme-color);
  width: calc(4vh + 1.5vw);
  padding: 0 0 calc(3vh + 1vw) 0;
  height: calc(1vh + 1.5vw);
  color:white;
  font-size: calc(0.5vw + 2vh);
  background: rgba(0, 45, 57,0.5);
  outline-style: none;
  position: relative;
}

#toggler i{
  font-size: calc(0.5vw + 2vh);
  color: var(--main-theme-color);
  transition: ease-in-out 0.5s;
}

#toggler:active, #toggler:hover{
  background-color: var(--main-theme-color);
  border-color: var(--light-type-color);
}
#toggler:active i,#toggler:hover i{
  color: white;
}
      `}</style>
  <nav
    id="topnavbar"
    className="navbar navbar-expand-lg fixed-top navbar-dark"
  >
    <div className="d-flex justify-content-center">
      <div className="p-1 ps-2">
        <button
          className="toggler"
          id="toggler"
          type="button"
          onClick={changeToggler}
        >
          <a>
            <i id="togglericon" className="bi bi-list" />
          </a>
        </button>
      </div>
      
      <div className="p-1 navbar-brand d-flex">
        <div className="nav-logo">
        <Image 
          src={logo}
          alt="logo"
          width="38"
          height="35"
          />
         </div>
         <a onClick={()=>{router.push('/')}}>Maniacs</a>
      </div>
      
      {(user==null) ? <NavDash/> : <UserNav/>}     
    </div>
  </nav>
      {sidenav && <> 
    <Suspense>
      <Sidenav DisplaySidenav={DisplaySidenav}/>
    </Suspense> 
      </>}
</>
  )
}