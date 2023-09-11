import customAlert from "../customalert";

import { useState } from "react"
import { auth } from '../../firebase.js'
import { db } from '../../firebase.js'
import { doc, updateDoc } from "firebase/firestore";
import { parseCookies, setCookie, destroyCookie} from 'nookies/dist'
import {
    EmailAuthProvider,
    getAuth,
    reauthenticateWithCredential,
} from 'firebase/auth'


const CheckPass = function({setrepass}) {
  const userData = parseCookies()
  const [pwrd,setpwrd] = useState('')
  const [errormessage,seterrormessage] = useState('')
  
  async function reauthenticateUser(userProvidedPassword){
    const auth = getAuth()
    const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    userProvidedPassword
    )
    try{
      await reauthenticateWithCredential(
      auth.currentUser, 
      credential).then(async function(){
        setCookie(null,userData.changeTarget,userData.changeValue,{secure:true,maxAge: 30 * 24 * 60 * 60 * 60 * 365,sameSite: "strict"})
        destroyCookie(null,"changeTarget")
        destroyCookie(null,"changeValue")
        userData = parseCookies()
        const dataSet ={"altPhoneNumber":userData.altPhoneNumber,
                        "phoneNumber":userData.phoneNumber,
                       "address":userData.address
                       }
        console.log(dataSet)
         await updateDoc(doc(db, "customer", userData.id), {...dataSet}).then(function(){
           customAlert("successfully Added", "success");
         })
        setrepass(false)
      })
    }catch(err){
      seterrormessage("incorrect password!")
      document.getElementById("password").style.backgroundColor="#fe777f"
    }
  }
  return (
    <>
    <style jsx>
    {`
      .Checkpassword{
        position:fixed;
        left:50%;
        top:50%;
        background-color:white;
  transform: translate(-50%,-50%);
  border: 4px solid var(--sub-theme-color);
  border-radius: 25px;
  padding: 20px 10px;
  width: 350px;
  z-index:6;
      }
      .div-overlay{
    width: 100%;
    height: 150%;
    position: fixed;
    left:0;
    top:0;
    z-index: 6;
    background-color: rgba(0,0,0, 0.6);
    }
      button{
        color:var(--light-theme-color);
        margin-top:10px;
        padding:5px;
        border-radius:5px;
        outline:none;
        border:1px solid black;
      }
      button:hover{
        color:black;
        outline:black solid 1px;
      }
      .checkpassbtn{
        background-color: #5cb85c;
        float:left;
      }
      .cancelbtn{
        background-color: #d9534f;
        float:right;
      }
      #password{
        width:100%;
        
        padding: 5px 10px;
      }
      .errormessage{
        color:red;
      }
    `}
    </style>
      <div className="div-overlay" id="div-overlay"></div>
      <div className="Checkpassword text-center">
        <label><b>Enter Your Password</b></label>
        <input type="password" value={pwrd} id="password" className="password" onChange={(e)=>setpwrd(e.target.value)}/>
        <p className="errormessage" id="errormessage">{errormessage}</p>
        <button className="checkpassbtn" onClick={()=>reauthenticateUser(pwrd)}>Check Password</button>
        <button className="cancelbtn" onClick={event => setrepass(false)}>Cancel</button>
      </div>
    </>
  )
}
export default CheckPass