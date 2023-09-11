
import UserDetails from './userdetails.jsx'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import { parseCookies} from 'nookies/dist'
import Avatar from "@mui/material/Avatar";
const Profile = () =>{
  const {user,userdata} = useAuth()
  const router = useRouter()
  const userData = parseCookies()
  return(
    <>
      <style jsx>{`
        .editbtn{
  border: 0;
  outline: 0;
  background-color: transparent;
}
      .profileImgEdit{
  position: relative;
  top:-60px;
  opacity: 0.5;
  transition: opacity 0.5s ease-in-out;
}
.profileImgEdit:hover{
  opacity: 1;
  transform: scale(2);
}
.card-body{
  background-color:var(--second-bg-color) !important;
  color:var(--text-color) !important;
}
      `}</style>
    <div className="row">
      <div className="col">
        <nav aria-label="breadcrumb" className="rounded-3 p-3 mb-4">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item active" onClick={()=>{router.push('/')}}>Home</li>
            <li className="breadcrumb-item active" aria-current="page"><b>User Profile</b></li>
          </ol>
        </nav>
      </div>
    </div>
   <div className="row">
     <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-body text-center">
            <div className="profileimg justify-content-center d-flex">
            <Avatar src={userData.profilepic} sx={{ width: 150, height: 150 }} />
             </div>
             <div className="profileImgEdit">
                <button className="editbtn" onClick={()=>router.push('setprofile')}>
                  <i className="bi bi-pencil-square"></i>
                </button>
              </div>
            
            <p className=" mb-1">{userData.email}</p>
            <p className=" mb-2">{userData.displayName}</p>
          </div>
        </div>
        <div className="card mb-4 mb-lg-0">
          <div className="card-body p-0">
            <ul className="rounded-3">
              <li className="d-flex justify-content-between align-items-center p-3">
                <i className="bi bi-facebook"></i>
                <p className="mb-0">Facebook</p>
              </li>
              <li className="d-flex justify-content-between align-items-center p-3">
                <i className="bi bi-instagram"></i>
                <p className="mb-0">Instagram</p>
              </li>
              <li className="d-flex justify-content-between align-items-center p-3">
                <i className="bi bi-linkedin"></i>
                <p className="mb-0">Linkedin</p>
              </li>
              <li className="d-flex justify-content-between align-items-center p-3">
                <i className="bi bi-whatsapp"></i>
                <p className="mb-0">WhatsApp</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

<UserDetails/>
     
      </div>
    </>
  )
}
export default Profile