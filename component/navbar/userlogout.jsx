import { useAuth } from '../../context/AuthContext'
const Userlogout = function({loggingout}){
  const { logout } = useAuth()
  return (<>
    <style jsx>{`
      @media only screen and (max-width: 992px){
  .logoutcheckbox{
  width:80%;
  }
  .labeltext{
  font-size:16px;
  }
}
.logoutcheckbox{
  position:fixed;
  left:50%;
  top:50vh;
  transform: translate(-50%, 0);
  visibility: visible !important;
  display: block !important;
  background-color: white;
  padding: 1% 3%;
  z-index: 7;
  text-align: center;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.8) !important;
  border-radius: 5px;
}
      .labeltext{
  font-size:20px;
  }
#div-overlay{
    width: 100%;
    height: 150%;
    position: fixed;
    visibility: visible !important;
    display: block !important;
    left:0;
    top:0;
    z-index: 6;
    background-color: rgba(0,0,0, 0.6);
}        
#logoutyes, #logoutno{
  padding: 5px 15px;
  border-radius: 5px;
  outline: none;
  border:0;
  box-shadow:0 2px 4px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.25);
  margin-top: 20px;
}
#logoutyes{
  float:right;
}
#logoutno{
  float:left;        
}
    `}</style>
    <div className="div-overlay" id="div-overlay" onClick={() => { loggingout(false)}}/>
          <div className="logoutcheckbox">
            <label className="labeltext">Are you sure you want to logout?</label><br />
            <button className="bg-danger" id="logoutno" onClick={() => { loggingout(false) }}>No</button><button className="bg-success" id="logoutyes" onClick={() => { logout().then(function(){
            loggingout(false)
            }) }}>Yes</button>
    </div>
  </>)
}
export default Userlogout