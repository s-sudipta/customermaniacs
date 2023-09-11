import {useRouter} from 'next/router'
import { useState, useEffect} from "react"
export default function NavDash(){
  const router = useRouter()
  return(
    <>
      <style jsx>{`
         a {
  color: var(--light-type-color) !important;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 2px;
  text-decoration: none;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}
a:hover, a:active{
  color: rgb(255, 255, 255) !important;
}
.topnav{
  position:absolute;
  list-style:none;
  right:0;
}
.topitem{
  padding: calc(0vh + 0.5vw) calc(1vh + 0.5vw);
}
input[type=text], input[type=password]{
          outline: none;
          border-radius: 5px;
          border-color: var(--main-theme-color);
          border-width: 2px;
          padding: 10px 5px;
          width:100%;
        }
input[type=text]:focus, input[type=password]:focus{
          background-color: var(--light-type-color);
          border-color: var(--sub-theme-color);
}
      `}</style>
    <div className="p-1">
      
        <ul className="d-flex topnav">
         <li className="topitem"><a className="toplink" onClick={()=> router.push('/login')}>Login</a></li>
          <li className="topitem"><a className="toplink" onClick={()=> router.push('/signup')}>Sign Up</a></li>
          
        </ul>
      </div>
    </>
  )
}