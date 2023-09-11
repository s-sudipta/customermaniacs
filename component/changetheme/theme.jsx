import { useEffect } from "react";
import { setCookie,parseCookies } from "nookies";
const Theme = () =>{
    const cookie = parseCookies()
    
    useEffect(()=>{
        if(cookie.theme == 'dark'){
            let checkbox = document.getElementById("switch");
            if ( !(checkbox.checked) ) {
                checkbox.click()
            }
        }
    });
    const handleChange = (e) =>
    {
        const body = document.getElementsByTagName('body')[0]
        let checkbox = document.getElementById("switch");
         if ( checkbox.checked ) {
            // document.documentElement.style.setProperty('--back-gd-color', '#1f2522');
            // document.documentElement.style.setProperty('--text-color', '#cdcdcd');
            // document.documentElement.style.setProperty('--second-bg-color', '#222220');
            body.classList.add('dark-mode')
           
            setCookie(null,'theme','dark',
            {secure:true,maxAge: 30 * 24 * 60 * 60 * 60 * 365,sameSite: "strict"})
          
            document.getElementById("themename").innerHTML="DARK"
        } else {
            // document.documentElement.style.setProperty('--back-gd-color', '#fff');
            // document.documentElement.style.setProperty('--text-color', '#212529');
            // document.documentElement.style.setProperty('--second-bg-color', ' #f0f7ff ');
            body.classList.remove('dark-mode')
            setCookie(null,'theme','light',
            {secure:true,maxAge: 30 * 24 * 60 * 60 * 60 * 365,sameSite: "strict"})
           
            document.getElementById("themename").innerHTML="LIGHT"
        }
    }
    return(
        <>
            <style jsx>{`
           .switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 21px;
            margin-left:20px;
          }
            input { 
            opacity:0;
            width: 0;
            height: 0;
          }
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: ease 0.4s;
            border-radius:25px;
            background-color:white;
          }
          
         .slider:before {
            position: absolute;
            content: "";
            height: 19px;
            width: 19px;
            left: 1px;
            bottom: 1px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
            border-radius:25px;
            background-color:var(--main-theme-color);
            }
            input:checked + .slider {
                background-color: black;
              }
              
              input:focus + .slider {
                box-shadow: 0 0 1px #2196F3;
              }
              
              input:checked + .slider:before {
                
                transform: translateX(20px);
              }
              
            `}
</style>
            <div className="row">
            <span><b>Theme</b></span>
                <div className="col">
                    <label className="switch">
                    <input type="checkbox" id="switch" value="" onClick={handleChange}/>
                    <span className="slider"></span>
                    </label>
                </div>
                <div className="col">
                    <span id="themename">LIGHT</span>
                </div>
            </div>
        </>
    )
}
export default Theme