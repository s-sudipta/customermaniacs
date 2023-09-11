
import Title from './title/title.jsx'
import Searchbar from './searchbar/searchbar.jsx'
import {useEffect, useState} from 'react'
export default function Backgroundimage(){
  const [img,setImg] = useState("")
  const [count,setCount] = useState(0)
  const imageUrl=[
    require("../../../public/img/bg/bg1.webp").default.src,
    require("../../../public/img/bg/bg2.webp").default.src,
    require("../../../public/img/bg/bg3.webp").default.src,
    require("../../../public/img/bg/bg4.webp").default.src,
    require("../../../public/img/bg/bg5.webp").default.src,
    require("../../../public/img/bg/bg6.webp").default.src
  ]
  
  useEffect(() => {
    setImg(imageUrl[count])
    const interval = setInterval(() => {      
    if(count == (imageUrl.length-1)){
      setCount(0);
    }
    else{
      setCount(count+1);
    }
  }, 9000);
    return () => clearInterval(interval);
  },[count]);
 
  return(<>
    <style jsx>{`
#backgroundImage{
  position:relative;
  left:0;
  width: 100%;
  height: 100%;
  display: table;
  margin: 0;
  max-width: none;
  background-color:black;
  background-image: url('${img}');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: background-image linear 1s,visibility 0s 2s;
}


#overlayer{
  width: 100%;
  position:relative;
  background-color: transparent !important;
  background-image: linear-gradient(to bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.7)) ;
  left: 0;
  top:;
}

    `}</style>
    <div className="backgroundImage" id="backgroundImage">
    <div className="overlayer" id="overlayer">
      
  <Title/>
  <Searchbar/>
      </div>
      </div>
  </>)
}