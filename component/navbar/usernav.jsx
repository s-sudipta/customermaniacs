import { useAuth } from '../../context/AuthContext'
import { parseCookies } from 'nookies/dist'
import Avatar from "@mui/material/Avatar";

export default function UserNav() {
  const { user } = useAuth()
  const userData = parseCookies()
  return (
    <>
      <style jsx>{` 
.topnav{
  position:absolute;
  list-style:none;
  right:0;
}
.topitem{
  padding: calc(0.75vh + 0.35vw) calc(0.5vh + 0.25vw);
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  color:var(--light-type-color);
  font-family: Arial, Helvetica, sans-serif;
  font-size: calc(1.5vh + 0.5vw);
}
.topitem:hover, .topitem:active{
  color: rgb(255, 255, 255) !important;
}
.topimage{
  padding: 0 calc(1vh + 0.5vw);
}
      `}</style>
      <div className="p-1">
        <ul className="d-flex topnav">
          <li className="topitem">{userData.displayName?userData.displayName:(user.displayName?user.displayName:user.email)}
          </li>
          <li className="topimage"><Avatar src={userData.profilepic} sx={{ width: 35, height: 35 }} /></li>
        </ul>
      </div>
      
    </>
  )
}