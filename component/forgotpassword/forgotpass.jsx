import {useState} from 'react'
const Forgotpass = function({ForgotFunction}) {
const [getOtp,setOtp]=useState(false)
  function submitOtp(){
    setOtp(true)
  }
  return(<>
 <style jsx>{`  
        #forgotBox{
           visibility: visible !important;
        }
      #forgotOverlay{
        position:fixed;
        height:100vh;
        z-index:0;
        left:0;
        top:0;
        background-color: rgba(0,0,0, 0.6);
      }
      #forgotForm{
        background-color: var(--second-bg-color);
        height:auto;
        position:absolute;
        padding: 2.5%;
        border-radius:5%;
        left:50%;
        top:0;
        transform: translate(-50%,50%);
      }
      label{
        color: var(--text-color);
      }
        input[type=text], input[type=password]{
          outline: none;
          border-radius: 5px;
          border-color: var(--main-theme-color);
          background-color: var(--second-bg-color);
          border-width: 2px;
          padding: 10px 5px;
          color:var(--text-color);
          width:100%;
        }
        .inputgroup{
          position: relative;
          display: flex;
          align-items: stretch;
        }
        input[type=text]:focus, input[type=password]:focus{
          background-color: var(--back-gd-color);
          border-color: var(--sub-theme-color);
        }
        label{
          font-size: 18px;
          margin: 5px;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: bold;
        }
        .forgotSubmit{
          padding: 10px 20px;
          position:relative;
          left:50%;
          transform: translate(-50%,0);
          border-radius: 5px;
          border:0;
          outline: none;
          background-color: var(--main-theme-color);
        }
        .otp-btn{
          background-color: var(--main-theme-color);
          border:2px solid var(--sub-theme-color);
          border-left-style: none;
          border-top-left-radius:0;
          border-bottom-left-radius:0;
          position:relative;
          right:6px;
        }
        button:hover, button:active{
          background-color: var(--sub-theme-color);
          color: var(--light-type-color);
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
  {!getOtp && <div id="forgotBox">
        <div className="d-flex justify-content-center">
          <div className="container-fluid" id="forgotOverlay" onClick={event => ForgotFunction(false)}></div>
        <div className="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-4" id="forgotForm">
          <div className="closeBox" id="closeBox" onClick={event => ForgotFunction(false)}><i className="bi bi-x-lg"></i></div>
          <h1 className="text-center" id="sub-heading">Forgot Password</h1>
      <label>Email/Phone no.</label><br/>
        <div className=" inputgroup">
           <input type="text" id="userinput"/>
          
            <button id="otp-btn" className="input-group-text otp-btn">Send OTP</button>
        </div>
      <label>Enter OTP</label><br/>
      <input type="text"/><br/><br/>
          <button type="submit" className="forgotSubmit" id="forgotSubmit" onClick={submitOtp}>Check OTP</button>
          </div>
        </div>
      </div>
          }
      {getOtp && 
      <div id="forgotBox">
        <div className="d-flex justify-content-center">
          <div className="container-fluid" id="forgotOverlay" onClick={event => ForgotFunction(false)}></div>
        <div className="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-4" id="forgotForm">
          <div className="closeBox" id="closeBox" onClick={event => ForgotFunction(false)}><i className="bi bi-x-lg"></i></div>
          <h1 className="text-center" id="sub-heading">Forgot Password</h1>
      <label>Enter New Password</label><br/>
      <input type="text"/><br/>
      <label>Retype New Password</label><br/>
      <input type="text"/><br/><br/>
          <button type="submit" className="forgotSubmit" id="forgotSubmit" onClick={event => ForgotFunction(false)}>Reset Password</button>
          </div>
        </div>
      </div>
      }

</>)
}
export default Forgotpass