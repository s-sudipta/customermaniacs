import customAlert from "../component/customalert";
import { useRouter } from "next/router";
import {useState} from 'react';
import Forgotpass from "../component/forgotpassword/forgotpass.jsx"
import { useAuth } from '../context/AuthContext'

const Login = function() {
  const router = useRouter()
  const { user, login, dataset} = useAuth()
  
  const [showlogin,setshowlogin]= useState(true)
  const [forgot,setforgot] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false);
  const [loginViaPhone,setLoginViaPhone] = useState(false)

  
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const ForgotFunction = flag1 => {
    setforgot(forgot => true && flag1)
    setshowlogin(showlogin => !flag1)
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const logindone = await login(data.email, data.password)
      await dataset(logindone.user.uid)
      customAlert("logged","success")
      router.push('/')
    } catch (err) {
      // s
    }
  }
  function showPassword(){
    setPasswordShown(!passwordShown)
  }
  return(
    <>
      <style jsx>{`  
      #loginForm{
        background-color: var(--second-bg-color);
        height:auto;
        padding: 2.5%;
        margin: 100px 0px;
        
        border-radius:5%;
      }
        input[type=text], input[type=password]{
          outline: none;
          border-radius: 5px;
          border-color: var(--main-theme-color);
          border-width: 2px;
          background-color: var(--second-bg-color);
          padding: 10px 5px;
          width:100%;
          color:var(--text-color);
        }
        input[type=text]:focus, input[type=password]:focus{
          background-color: var(--back-gd-color);
          border-color: var(--sub-theme-color);
        }
        .showpassword{
          position:relative;
          padding: 10px 10px;
          top:-47.5px;
          float: right;
          border:none;
          outline:0;
          background-color:transparent;
        }
        .showpassword:hover #iconeye{
          color:blue;
        }
        label{
          font-size: 18px;
          margin: 5px;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: bold;
        }
        .loginSubmit{
          padding: 10px 20px;
          position:relative;
          left:50%;
          transform: translate(-50%,0);
          border-radius: 5px;
          outline: none;
          border:0;
          margin-top:4%;
          background-color: var(--main-theme-color);
        }
        .loginSubmit:hover, .loginSubmit:active{
          background-color: var(--sub-theme-color);
        }
        label{
          color:var(--text-color);
        }
        ::placeholder { 
  color: grey;
  opacity: 1; 
}
        .active, .inactive{
          padding:10px;
          color: white;
          outline:0;
          border:none;
        }
        .active{
          background-color: var(--main-theme-color);
        }
        .inactive{
          background-color: var(--sub-theme-color);          
        }
        a{
          color:var(--text-color);
        }
        a:hover ,a:active{
          color:var(--main-theme-color);
          font-weight:bold;
        }
    `}</style>
        <div className="d-flex justify-content-center">
        <div className="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-4" id="loginForm">
          <h1 className="text-center" id="sub-heading">Login</h1>
          <div className="justify-content-center d-flex"><button className={loginViaPhone?"inactive":"active"} onClick={()=>setLoginViaPhone(false)}>Email</button><button className={loginViaPhone?"active":"inactive"} onClick={()=>setLoginViaPhone(true)}>Phone</button></div>
      <label>{loginViaPhone ? "Phone" : "Email"}</label><br/>
      <input type="text"
         onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            value={data.email}
            required
            placeholder={loginViaPhone ? "Enter Phone Number" : "Enter Email Address"}
        /><br/>
      <label>Password</label><br/>
      <input type={passwordShown ? "text" : "password"} id="password"
        onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            value={data.password}
            required
            placeholder="Enter Password"
        />
          <button className="showpassword" id="showpassword" onClick={showPassword}>
            <i id="iconeye" className={!passwordShown ? "bi bi-eye-slash" : "bi bi-eye"}></i>
          </button><br/>
      <input type="checkbox" id="rememberMe" className="rememberMe" value="remember"/>
          <label>&nbsp;Remember me</label><br/>
          <a onClick={ForgotFunction}>Forgot Password?</a><br/>
      <button type="submit" className="loginSubmit" onClick={handleLogin} id="loginSubmit">Login</button>
        </div>
        </div>
      {forgot && <Forgotpass ForgotFunction={ForgotFunction}/>}


      
    </>
  )
}
export default Login