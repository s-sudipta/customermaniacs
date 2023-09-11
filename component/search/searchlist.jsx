import {useRouter} from 'next/router'
import {useState} from 'react'
const Searchlist = () =>{
  const typeList = require("../homecomponent/json/categoriesJson.js")
  const router = useRouter()
  const [changecolor,setchangecolor] = useState("")
  return(
    <>
      <style jsx>{`
      .cate{
        padding:20px;
        background-color: transparent;
        margin:20px;
        font-family: 'Fairplay', Fallback, sans-serif;
        font-weight:bold;
      }
      .cate:hover{
        background-image: linear-gradient(${changecolor},${changecolor}) !important;
        cursor:pointer;
      }
      `}</style>
    <div className="container d-flex justify-content-center row m-auto">
      {typeList.map((item)=>{
        return(
          <>
          <div key={item.key} className="cate col-4 col-sm-4 col-md-4 col-lg-2 text-center" style={{"backgroundImage":"linear-gradient("+item.color+", white)"}} onClick={()=>{router.push("search/"+item.type)}} onMouseEnter={()=>setchangecolor(item.color)}>{item.type}</div>
          </>
        )
      })}
    </div>
    </>
  )
}
export default Searchlist