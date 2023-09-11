
import {useState, useEffect} from 'react'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase.js'
import { parseCookies,setCookie} from 'nookies/dist'
import CheckPass from './checkpass.jsx'
const UserDetails = () =>{
  const {user} = useAuth()
  const userData = parseCookies()
  const [info,setInfo]= useState(false)
  const[edit,setEdit] = useState(false)
  const[repass,setRepass] = useState(false)
  const [userName,setUserName] = useState(userData.displayName)
  const [userEmial,setUserEmail] = useState(userData.email)
  const [userPassword,setUserPassword] = useState("")
  const [userPhoneNo,setUserPhoneNo] = useState(userData.phoneNumber)
  const [userAltphNo,setUserAltphNo] = useState(userData.altPhoneNumber)
  const [userAddress,setUserAddress] = useState(userData.address)
const setrepass = flag => {
  setRepass(repass => true && flag)
  setEdit(false)
}
function changeValue(t,v){
   setCookie(null,"changeTarget",t,{secure:true,sameSite: "strict"})
   setCookie(null,"changeValue",v,{secure:true,sameSite: "strict"})
}
  useEffect(()=>{
    if(edit==true){
      if(userData.phoneNumber != userPhoneNo){
        document.getElementById("showokbtn1").style.visibility = "visible";
        setUserAltphNo(userData.altPhoneNumber)
        setUserAddress(userData.address)
      }
      if(userData.phoneNumber == userPhoneNo)
      document.getElementById("showokbtn1").style.visibility = "hidden";
      if(userData.altPhoneNumber != userAltphNo){
      document.getElementById("showokbtn2").style.visibility = "visible";
      setUserPhoneNo(userData.phoneNumber)
      setUserAddress(userData.address)
      }
      if(userData.altPhoneNumber == userAltphNo)
      document.getElementById("showokbtn2").style.visibility = "hidden";
      if(userData.address != userAddress){
        document.getElementById("showokbtn3").style.visibility = "visible";
        setUserPhoneNo(userData.phoneNumber)
        setUserAltphNo(userData.altPhoneNumber)
      }
      if(userData.address == userAddress)
      document.getElementById("showokbtn3").style.visibility = "hidden";
    }
  },[userPhoneNo,userAltphNo,userAddress]);
  
  return(<>
    <style jsx>{` 
.edityourprofilebtn{
  background-color:transparent;
  position:relative;
  margin:5px;
  font-weight:bold;
  font-size:11px;
  padding:10px 20px;
  left:50%;
  transform:translate(-50%,0);
  border-bottom: 2px solid transparent;
    border-image: linear-gradient(var(--sub-theme-color),var(--main-theme-color));
    border-image-slice: 1;;
  transition: 0.5s ease-in;
  transition-property: background;
  border-radius:5px;
  color:var(--text-color);
}
.edityourprofilebtn:hover{
  background-image: linear-gradient(var(--sub-theme-color),var(--main-theme-color));
  color:var(--back-gd-color);
  transition: 0.5s ease-out;
  transition-property: background;
  transform: translate(-50%,0) scale(1.05);
}
.editbtn{
  background-color:transparent;
  outline:none;
  border:0;
  position:relative;
}
.editbtn i{
  color:green;
}
.showokbtn{
  visibility:hidden;
}
.inputedit{
  outline:none;
  border:0;
  padding:5px;
  background-color: var(--second-bg-color);
  color:var(--text-color);
  border-bottom: 3px solid #0275d8;
  width:80%;
}
.inputedit:focus{
  background-color: var(--back-gd-color);
}
.card-body{
  background-color:var(--second-bg-color) !important;
  color:var(--text-color) !important;
}
`}</style>
    {repass && <CheckPass setrepass={setrepass}/>} 
  <div className="col-lg-8">
      <div className="card mb-4">
          <div className="card-body">
            <button className="edityourprofilebtn" onClick={()=>setEdit(!edit)}>Edit Your Profile</button>
            <h3>Personal Details</h3>
            {!edit ? <>
              <div className="row" >
                <div className="col-sm-3">
      	        <p className="mb-0">Name</p>
                </div>
              <div className="col-sm-9">
               <p className=" mb-0">{userData.displayName}</p>
              </div>
             </div>
            <hr/>
            <div className="row">
               <div className="col-sm-3">
      	        <p className="mb-0">Email</p>
                </div>
              <div className="col-sm-9">
               <p className=" mb-0">{userData.email}</p>
              </div>
            </div>
          <hr/>
          <div className="row">
               <div className="col-sm-3">
      	        <p className="mb-0">Password</p>
                </div>
              <div className="col-sm-9">
               <p className=" mb-0">...........</p>
              </div>
          </div>
        
        <hr/>
            <div className="row">
               <div className="col-sm-3">
      	        <p className="mb-0">Phone</p>
                </div>
              <div className="col-sm-9">
               <p className=" mb-0">{userData.phoneNumber}</p>
              </div>
          </div>
        <hr/>
            <div className="row">
               <div className="col-sm-3">
      	        <p className="mb-0">Alternate Phone No.</p>
                </div>
              <div className="col-sm-9">
               <p className=" mb-0">{userData.altPhoneNumber}</p>
              </div>
          </div>
          <hr/>
            <div className="row">
               <div className="col-sm-3">
      	        <p className="mb-0">Address</p>
                </div>
              <div className="col-sm-9">
               <p className=" mb-0">{userData.address}</p>
              </div>
          </div>
        
              </>
              :
              <>
                <div className="row" >
                <div className="col-sm-3">
      	        <p className="mb-0">Name</p>
                </div>
              <div className="col-sm-9">
               <p className=" mb-0">{userData.displayName}</p>
              </div>
             </div>
            <hr/>
            <div className="row">
               <div className="col-sm-3">
      	        <p className="mb-0">Email</p>
                </div>
              <div className="col-sm-9">
               <p className=" mb-0">{userData.email}</p>
              </div>
            </div>
          <hr/>
            <div className="row">
               <div className="col-sm-3">
      	        <p className="mb-0">Password</p>
                </div>
              <div className="col-sm-9">
               <p className=" mb-0">...........</p>
              </div>
          </div>
        <hr/>
            <div className="row">
               <div className="col-sm-3">
      	        <p className="mb-0">Phone</p>
                </div>
              <div className="col-sm-9">
               <p className=" mb-0"><input className="inputedit" type="text" maxLength="10" value={userPhoneNo} onChange={(e)=>setUserPhoneNo(e.target.value)}/><span className="showokbtn" id="showokbtn1"><button className="editbtn" onClick={()=>{changeValue("phoneNumber",userPhoneNo);setrepass(true)}}><i className="bi bi-check2-square"></i></button></span></p>
              </div>
          </div>
        <hr/>
            <div className="row">
               <div className="col-sm-3">
      	        <p className="mb-0">Alternate Phone No.</p>
                </div>
              <div className="col-sm-9">
               <p className=" mb-0"><input className="inputedit" type="text" maxLength="10" value={userAltphNo} onChange={(e)=>setUserAltphNo(e.target.value)}/><span className="showokbtn" id="showokbtn2"><button className="editbtn" onClick={()=>{changeValue("altPhoneNumber",userAltphNo);setrepass(true)}}><i className="bi bi-check2-square"></i></button></span></p>
                
              </div>
          </div>
          <hr/>
            <div className="row">
               <div className="col-sm-3">
      	        <p className="mb-0">Address</p>
                </div>
              <div className="col-sm-9">
               <p className=" mb-0"><input className="inputedit" type="text" value={userAddress} onChange={(e)=>setUserAddress(e.target.value)}/><span className="showokbtn" id="showokbtn3"><button className="editbtn" onClick={()=>{changeValue("address",userAddress);setrepass(true)}}><i className="bi bi-check2-square"></i></button></span></p>
              </div>
          </div>
              </>
            }
        </div>
        </div>
    

       <div className="row">
          <div className="col-md-6">
            <div className="card mb-4 mb-md-0">
              <div className="card-body">
                <p className="mb-4">
                  <span className="text-primary font-italic me-1">
                    Status
                  </span> 
                  Your Activity
                </p>
              </div>
            </div>
          </div>
         <div className="col-md-6">
           <div className="card mb-4 mb-md-0">
              <div className="card-body">
                <p className="mb-4">
                  <span className="text-primary font-italic me-1">
                    Status
                  </span> 
                  Your Saving
                </p>
              </div>
            </div>
           <div className="card mb-4 mb-md-0">
              <div className="card-body">
                <p className="mb-4">
                  <span className="text-primary font-italic me-1">
                    Status
                  </span> 
                  Public Reaction
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  </>)
}
export default UserDetails