import customAlert from '../component/customalert';
import { useState,useEffect, useRef} from 'react';
import {db} from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

import Avatar from "@mui/material/Avatar";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


import {useRouter} from 'next/router'
import { storage } from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {parseCookies, setCookie} from 'nookies/dist'
import { doc, updateDoc } from "firebase/firestore";



function WorkerPage() {
  const [typeArray,setTypeArray] = useState([]);
  const [ratingArray,setRatingArray] = useState([]);
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');
  const [star,setStar] = useState('');
  const [availability,setAvailability] = useState('Yes');


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
    const fetchdata = () =>{
      const typeList = require("../component/homecomponent/json/categoriesJson.js")
      const temptypeArray = typeList.map((item) => item.type);
      setTypeArray([...temptypeArray]);
      setRatingArray([1,1.5,2,2.5,3,3.5,4,4.5,5]);
    }
    fetchdata();
  },[])
  const handleOptionChange = (event) => {
    setProfession(event.target.value);
  };
  const handleOptionChangeForStar = (event) =>{
    setStar(event.target.value);
  }
  const handleAnswerChange = (event) => {
    setAvailability(event.target.value);
  };
  async function handleSubmit(event) {
    event.preventDefault();
   
    try {
      if(upload == null) return
      const imageRef = ref(storage, name + email + "/profile.jpeg");
      uploadBytesResumable(imageRef, upload)
      .then(() => {
        getDownloadURL(imageRef)
          .then(async(url) => {
      await addDoc(collection(db, "worker"), {
        name,
        profession,
        email,
        availability,
        phone,
        address1,
        address2,
        pincode,
        state,
        country,
        age,
        star,
        profilepic:url
      })})});
      customAlert("Worker added successfully");
        setName("");
        setProfession("");
        setEmail("");
        setAvailability("");
        setPhone("");
        setAddress1("");
        setAddress2("");
        setPincode("");
        setState("");
        setCountry("");
        setAge("");
        setStar("");
        setCropData("#");
    } catch (error) {
      customAlert(error.message,"error")
    }
  }
 

  

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

  // const handleSubmit = () => {
  //   if(upload == null) return
  //   const imageRef = ref(storage, name + email + "/profile.jpeg");
  //   uploadBytesResumable(imageRef, upload)
  //     .then(() => {
  //       getDownloadURL(imageRef)
  //         .then(async(url) => {
  //           await updateDoc(doc(db, "worker", ), {profilepic:url}).then(function(){
  //          customAlert("successfully added","success");
  //        })
  //         })
  //         .catch((error) => {
  //           customAlert(error.message, "error");
  //         });
  //       setUpload(null);
  //     })
  //     .catch((error) => {
  //       customAlert(error.message,"error");
  //     });
  //   router.push('dashboard')
  // }

  return (
    <div className="container mt-5">


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
     <h2 id="sub-heading" className='sub-heading text-center'>Add Demo Workers</h2>

       <div className="avatar">
       <Avatar src={cropData!="#"?cropData:"https://dummyimage.com/400x400/9c8c9c/080808&text=add+a+pic"} sx={{ width: 150, height: 150 }} />
       </div>
       
       <input type="file" id="browserimage" style={{"display":"none"}} accept="image/png, image/jpg, image/webp, image/jpeg" onChange={handleImageChange} />
       <button className="browserbtn" onClick={clickBrowser}><i className="bi bi-pencil-square"></i>&nbsp;{btntext}</button>
       <br/>
       {upload && <>
       <button className="cropbtn" onClick={()=>setOpencrop(true)}><i className="bi bi-crop"></i>&nbsp;Crop</button>
        {/* <button className="submitbtn" onClick={handleSubmit}><i className="bi bi-check2-square"></i>&nbsp;Submit</button> */}
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






      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="profession">Profession:</label>
          <select className="form-control" id="profession" value={profession} onChange={handleOptionChange}>
            <option value="" disabled>Select an option</option>
            {typeArray.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input type="text" className="form-control" id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="address1">Address Line 1:</label>
          <input type="text" className="form-control" id="address1" value={address1} onChange={(event) => setAddress1(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="address2">Address Line 2:</label>
          <input type="text" className="form-control" id="address2" value={address2} onChange={(event) => setAddress2(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input type="text" className="form-control" id="pincode" value={pincode} onChange={(event) => setPincode(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input type="text" className="form-control" id="state" value={state} onChange={(event) => setState(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input type="text" className="form-control" id="country" value={country} onChange={(event) => setCountry(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="text" className="form-control" id="age" value={age} onChange={(event) => setAge(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="star">Rating:</label>
          <select className="form-control" id="rating" value={star} onChange={handleOptionChangeForStar}>
            <option value="" disabled>Select an option</option>
            {ratingArray.map((rating) => (
              <option key={rating} value={rating}>
                {rating} STAR
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 form-group">
      <label>Are you Available?</label>
      <div>
        <label className='m-2'>
          <input
            type="radio"
            value="Yes"
            checked={availability === 'Yes'}
            onChange={handleAnswerChange}
          />
          Yes
        </label>
        <label className='m-2'>
          <input
            type="radio"
            value="No"
            checked={availability === 'No'}
            onChange={handleAnswerChange}
          />
          No
        </label>
      </div>
    </div>
        <button type="submit" className="btn btn-primary">Add Worker</button>
      </form>
    </div>
  );
  
}

export default WorkerPage;
