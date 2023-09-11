import customAlert from "../component/customalert";
import Avatar from "@mui/material/Avatar";

import { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { useState, useEffect } from "react";
import {useRouter} from 'next/router'
import { storage } from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {parseCookies, setCookie} from 'nookies/dist'
import { db } from '../firebase.js'
import { doc, updateDoc } from "firebase/firestore";



const Setprofile = () =>{
  const router = useRouter()
  const userData = parseCookies()
  const [image, setImage] = useState(userData.profilepic);
  const [upload,setUpload] = useState(null);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [opencrop,setOpencrop] = useState(false);
  const [btntext,setBtntext] = useState("Upload Image")
  const cropperRef = useRef(image)

useEffect(()=>{
  if(upload){
    setBtntext("Change Image")
  }else{
    setBtntext("Upload Image") 
  }
},[upload])
  const clickBrowser = () =>{
  
  document.getElementById("browserimage").click()
}
  const handleImageChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result)
    };
    reader.readAsDataURL(files[0]);
    setOpencrop(true)
  }
  
 const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
  };
const getCropData = () => {
    if (typeof cropper !== "undefined") {
      var canvas = cropper.getCroppedCanvas()
      canvas.toBlob(function(blob){
        setUpload(blob)
         setCropData(URL.createObjectURL(blob))
       },'image/jpeg');
      //setCropData(canvas.toDataURL());
      
      setOpencrop(false)
    }
  };
  


  const handleSubmit = () => {
    if(upload == null) return
    const imageRef = ref(storage, userData.displayName + userData.id + "/profile.jpeg");
    uploadBytesResumable(imageRef, upload)
      .then(() => {
        getDownloadURL(imageRef)
          .then(async(url) => {
            setCookie(null, "profilepic", url ,{secure:true,maxAge: 30 * 24 * 60 * 60 * 60 * 365,sameSite: "strict"})
            await updateDoc(doc(db, "customer", userData.id), {profilepic:url}).then(function(){
           customAlert("successfully added","success");
         })
          })
          .catch((error) => {
            customAlert(error.message, "error");
          });
        setUpload(null);
      })
      .catch((error) => {
        customAlert(error.message,"error");
      });
    router.push('dashboard')
  }

  return (<>
    <style jsx>{`
      
     .avatar{
    position: relative;
    width:150px;
    left: 50%;
    transform: translate(-50%,0);
  }
      .croppicture{
        position:absolute;
        top:54.5px;
        left:50%;
        transform: translate(-50%,0);
        width:90vw;
        margin:0;
        border:0;
        background-color: white;
      }
     .browserbtn,.submitbtn,.cropbtn {
  margin:20px 20px 0 20px;
  border: 2px solid #6c5ce7;
  padding: 0.2em 0.4em;
  border-radius: 0.2em;
  background-color: #a29bfe;
  transition: 1s;
}

.browserbtn:hover, .submitbtn:hover, .cropbtn:hover, .browserbtn:active, .submitbtn:active, .cropbtn:active {
  background-color: #81ecec;
  border: 2px solid #00cec9;
}
  
  .submitCropbtn{
    margin:10px;
    padding: 0.2em 0.4em;
    border-radius: 0.2em;
    background-color: lime;
  }
  .cancelCropbtn{
    margin:10px;
    padding: 0.2em 0.4em ;
    border-radius: 0.2em;
    background-color: tomato; 
  }
      

    `}</style>
    <div className="container text-center m-top">
      <h2 id="sub-heading">Set your Profile Picture</h2>
      <div className="avatar">
      <Avatar src={cropData!="#"?cropData:userData.profilepic} sx={{ width: 150, height: 150 }} />
      </div>
      
      <input type="file" id="browserimage" style={{"display":"none"}} accept="image/png, image/jpg, image/webp, image/jpeg" onChange={handleImageChange} />
      <button className="browserbtn" onClick={clickBrowser}><i className="bi bi-pencil-square"></i>&nbsp;{btntext}</button>
      <br/>
      {upload && <>
      <button className="cropbtn" onClick={()=>setOpencrop(true)}><i className="bi bi-crop"></i>&nbsp;Crop</button>
      <button className="submitbtn" onClick={handleSubmit}><i className="bi bi-check2-square"></i>&nbsp;Submit</button>
      </>
      }
    </div>
    { opencrop &&
      <div className="croppicture">
      <Cropper
      src={image}
      style={{ height: 400, width: "100%" }}
      aspectRatio={1}
      guides={true}
      background={false}
      responsive={true}
      crop={onCrop}
      ref={cropperRef}
      minCropBoxWidth={1}
      minCropBoxHeight={1}
      autoCropArea={1}
      checkOrientation={false}
      onInitialized={(instance) => {
            setCropper(instance);
      }}
      />
    <div className="text-center">
      <button className="submitCropbtn bg-success" onClick={getCropData}>Crop</button>
      <button className="cancelCropbtn bg-danger" onClick={()=>setOpencrop(false)}>Cancel</button>
    </div>
      
    </div>
    }
    </>
  );
}
export default Setprofile