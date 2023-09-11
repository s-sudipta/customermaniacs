import { setCookie } from "nookies";
import {getAddress} from "../../../tomtommap/getaddress"
import customAlert from "../../../customalert"
const GetGPS = function({setgpslocation}){

  const getGPSLocation = () =>{
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    customAlert("turn on GPS","warning")
  }
  }
function showPosition(position) {
  var inputGPS = document.getElementById("locationinput");
    setCookie(null, "gpslat",position.coords.latitude,
                  {secure:true,maxAge: 30 * 24 * 60 * 60 * 60 * 365,sameSite: "strict"})
    setCookie(null, "gpslon",position.coords.longitude,
                  {secure:true,maxAge: 30 * 24 * 60 * 60 * 60 * 365,sameSite: "strict"})
  getAddress(position.coords.latitude, position.coords.longitude)
  .then(address => {
    inputGPS.value = address;
  })
  .catch(error => {
    console.error(error);
  });
}
  return(
    <>
      <style jsx>{`
      
.display-location{
  background-color: var(--back-gd-color);
  position:absolute;
  left:50%;
  transform: translate(-50%,1%);
  border: 4px solid var(--sub-theme-color);
  border-radius: 25px;
  padding: 20px 10px;
  width: 350px;
  z-index:6;
}
a{
  line-height: 80px;
  color: var(--text-color);
  font-weight:500;
}
a:hover{
  font-weight:bold;
}
a:active{
  font-weight:bold;
  color: blue;
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
.loactioninput{
  background-color: var(--back-gd-color);
  color: var(--text-color);
  border: 3px solid var(--main-theme-color);
  padding: 10px 5px 10px 5px;
  outline:none;
  border-radius: 12.5px;
}
.loactioninput:focus{
  background-color: var(--second-bg-color);
}

    `}</style>
    <div className="container-fluid" id="GPS-div">
        <div className="div-overlay" id="div-overlay" onClick={event => setgpslocation(false)}></div>
        <div className="container">
        <div className="display-location text-center" id="display-location">
            <input type="text" className="loactioninput" id="locationinput"  placeholder="Enter manually"/><br/>
            <a id="autoGPS" onClick={getGPSLocation}><i className="bi bi-geo-alt"></i>&nbsp;Use GPS to locate me</a>
        </div>
        </div>
        </div>
        
    </>
  )
}
export default GetGPS