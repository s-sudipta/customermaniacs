import { useEffect, useState } from "react";

const StarRating = (props) => {
    const stars = Math.abs(Number(props.star))
    const blankstars = 5-Math.abs(Number(props.star));
    const [starcount,setStarcount] = useState([]);
    const [starcountblank,setStarcountblank] = useState([]);
    useEffect(()=>{
        const starlist=[];
        const blankstarlist=[];
        for(let i=1;i<=stars;i++){
            starlist.push(i);
        }
        for(let i=1;i<=blankstars;i++){
            blankstarlist.push(i);
        }
        setStarcountblank(blankstarlist);
        setStarcount(starlist);
    },[]);
    return ( <><style jsx>
        {`
        #ratingStar{
            background: -webkit-linear-gradient(0deg, yellow , orange);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size:20px;
            }
        `}
    </style>
    {starcount.map(e=>{
        return(<i id="ratingStar" key={e} className="bi bi-star-fill"></i>)
    })}
    
    {!Number.isInteger(Number(props.star)) && <>
        <i id="ratingStar" className="bi bi-star-half"></i>
    </>}
    {starcountblank.map(e=>{
            return(<i id="ratingStar" key={e} className="bi bi-star"></i>)
    })}
    </> );
}
export default StarRating;