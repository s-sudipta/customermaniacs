import customAlert from "../component/customalert";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore"; 
import { useState,useEffect,useRef } from "react";
import {db} from "../firebase.js"
import { useAuth } from '../context/AuthContext'
import 'firebase/firestore'

const Signup = function() {
  const [register,setRegister] = useState({displayName:"",email:"",phoneNumber:"",altPhoneNumber:"",address:""})
  const [passwordShown, setPasswordShown] = useState(false);
  const [fillup,setFillup] = useState(false);
  const [emailRef,setemailRef] = useState("")
  const [passwordRef,setpasswordRef] = useState("")
  const [repasswordRef,setrepasswordRef] = useState("")
  
  const router = useRouter()
  const { user, signup, dataset} = useAuth()
  
  
 
  const userIdRef = useRef()
  const userEmailRef = useRef()
  //used to show the password
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  //entry data to the database(firestore and authentication)
  const entryDataSet= async(e) => {
    e.preventDefault()
    try {
      const authRef = await signup(emailRef, passwordRef)
      userIdRef.current= authRef.user.uid
      customAlert("User Created","success");
      setFillup(true)
    }catch (err) {
      customAlert(err.message,"error")
    }
  }
  const entryDataDetails= async(e) => {
    e.preventDefault()
    try{
      if(userIdRef.current)
      {
        console.log(emailRef)
      await setDoc(doc(db, "customer", userIdRef.current), {...register,type:"user",email:emailRef});
      customAlert("Registered","success");
      await dataset(userIdRef.current)
      setRegister({displayName:"",email:"",phoneNumber:"",altPhoneNumber:"",address:""})
      router.push('setprofile')
      }
    }catch(err){
      customAlert(err.message,"error")
    }
  }
  
  return(
    <>
      <style jsx>{`  
      #signupForm{
        background-color: var(--second-bg-color);;
        height:auto;
        padding: 2.5%;
        margin: 100px 0px;
      }
        input[type=text], input[type=password],input[type=email]{
          outline: none;
          border-radius: 5px;
          border-color: var(--main-theme-color);
          background-color: var(--second-bg-color);
          border-width: 2px;
          padding: 10px 5px;
          color:var(--text-color);
          width:100%;
        }
        input[type=text]:focus, input[type=password]:focus,input[type=email]:focus{
          background-color: var(--back-gd-color);
          border-color: var(--main-theme-color);
        }
        input[type=checkbox]{
          width:15px;
          height: 15px;
        }
        label{
          color:var(--text-color);
        }
        label{
          font-size: 18px;
          margin: 5px;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: bold;
        }
        .signupSubmit{
          padding: 10px 20px;
          position:relative;
          left:50%;
          transform: translate(-50%,0);
          border-radius: 5px;
          outline: none;
          border:0;
          background-color: var(--main-theme-color);
        }
        .signupSubmit:hover, .signupSubmit:active{
          background-color: var(--sub-theme-color);
        }
        .closeBox{
          color: black !important;
          position:absolute;
          left:100%;
          top:0;
          transform: translate(-150%,0);
        }
        .closeBox i{
          font-size:20px;
          color: var(--main-theme-color);
          font-weight:bold;
        }
    `}</style>
      
        <div className="d-flex justify-content-center">
        <div className="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-4" id="signupForm">
          <h1 className="text-center" id="sub-heading">Sign Up</h1>
         
          {!fillup ?
          <>
      <label>Email</label><br/>
        <input id="email" 
        type="email" 
        value={emailRef} 
        onChange={e=>setemailRef(e.target.value)}/><br/>
      <label>Set Password</label><br/>
            <input id="password" 
        type={passwordShown ? "text" : "password"} 
        value={passwordRef} 
        onChange={e=>setpasswordRef(e.target.value)}/><br/>
      <label>Confirm Password</label><br/>
      <input id="repassword" 
        type={passwordShown ? "text" : "password"} 
        value={repasswordRef} 
        onChange={e=>setrepasswordRef(e.target.value)}/><br/>
      <input 
        type="checkbox" 
        id="rememberMe" 
        value="remember" onClick={togglePassword}/>
        <label>&nbsp;Show Password</label><br/>
      <button type="submit" className="signupSubmit" id="signupSubmit" onClick={entryDataSet}>Signup</button><br/>
          </>
            :
          <>
        <label>Name</label><br/>
        <input id="name" type="text" 
        value={register.displayName} 
        onChange={e=>setRegister({...register,displayName:e.target.value})}/><br/>
      <label>Phone no.</label><br/>
      <input id="phoneNo" type="text" 
        value={register.phoneNumber} 
        onChange={e=>setRegister({...register,phoneNumber:e.target.value})}/><br/>
      <label>Alternate Phone no.</label><br/>
      <input id="altPhoneNo" 
        type="text" 
        value={register.altPhoneNumber} 
        onChange={e=>setRegister({...register,altPhoneNumber:e.target.value})}/><br/>
      <label>Home address</label><br/>
      <input id="altPhoneNo" type="text" 
        value={register.address} 
        onChange={e=>setRegister({...register,address:e.target.value})}/><br/>
          <button type="submit" className="signupSubmit" id="signupSubmit" onClick={entryDataDetails}>Signup</button>
          </>}
        </div>
        </div>
      
    </>
  )
}
export default Signup