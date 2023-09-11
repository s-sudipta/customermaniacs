import Avatar from "@mui/material/Avatar";
import Statusicon from "./statusicon.jsx";
import { getFirestore, collection, getDocs, where, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import customAlert from "../customalert"
import Rating from "./rating.jsx"
import { useState,useEffect } from "react";
import { parseCookies } from "nookies";
const Booklist =() =>{
    const [bookings, setBookings] = useState([]);
    const [filteredBookings,setFilteredBookings] = useState([]);

    const [ratingbyuser, setRatingbyuser] = useState(0);

    const handleChildValue = (value) => {
      setRatingbyuser(value);
    };

    const cookies = parseCookies();
    const uId = cookies.id;
    const getBookings = async () => {
        const db = getFirestore();
        const bookingsRef = collection(db, 'booking')
    
        const q = query(bookingsRef, where('cId', '==', uId), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        const bookings = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }));
        return bookings;
      }
      function handleRefresh(e){
        e.preventDefault();
        getBookings().then((b) => {setBookings(b);setFilteredBookings(b);customAlert("Data Refreshed")});
      }
      async function changeRating(bid,wid,prestar){
        try{
            //console.log(prestar+" "+ratingbyuser)
            const db = getFirestore();
            if(!isNaN(parseFloat(prestar)) && !isNaN(parseFloat(ratingbyuser))){
            await updateDoc(doc(db,"worker", wid), {star: (((parseFloat(prestar) + parseFloat(ratingbyuser)))/2)}).then(function(){
                customAlert("Rating Submitted Succesfully") 
            })
            }
            await updateDoc(doc(db, "booking", bid ), {statusDescription:"Previously Completed"}).then(function(){
                getBookings().then((b) => {setBookings(b);setFilteredBookings(b);});
            })
            setRatingbyuser(0);
          }catch(e){
              console.log(e);
              customAlert("error : " + e ,"error");
            }
      }
useEffect(() => {
  getBookings().then((b) => {setBookings(b);setFilteredBookings(b)});
}, []);
function handleClickForCategory(status) {
    let switcher = document.getElementById('category' + status.charAt(0).toUpperCase() + status.slice(1));
    let switchoff = document.getElementsByClassName('active');

    if (!switcher.classList.contains('active')) {
        Array.from(switchoff).forEach(element => {
            element.classList.toggle('active');
        });
        switcher.classList.toggle('active');
    }
    if(status === 'all'){
        setFilteredBookings(bookings);
    }
    else{
        const updatingBookings = bookings.filter(booking => booking.status === status);
        setFilteredBookings(updatingBookings);
    }
}
    return(<>
    <style jsx>{`
    a{
        color: grey;
    }
    a:hover, a:active,.active{
        color: var(--text-color);
        font-weight:bold;
    }
    .backgd{
        background-color: var(--back-gd-color); 
    }
    .theme-color{
        background-color: var(--second-bg-color); 
        color: var(--text-color);
    }
    #status{
        position:absolute;
        top:0;
        right:0;
        width:auto;
        padding-right: 2vw;
    }
    .active{
        color: black;
    }
    .inactive{
        color: grey;
    }
    .refreshbtn {
        background-color:transparent;
        outline:none;
        border:none;
        padding:0;
        font-size:35px;
        color: var(--main-theme-color);
    }
    .refreshbtn span{
        font-size:16px;
        color: var(--text-color);
        opacity:0;
    }
    .refreshbtn:hover span{
        opacity:1;
    }
    .refreshdiv{
        text-align: right;
    }
    #eachItem {
        opacity: 1;
        transform: translateY(0);
        animation: slideIn 0.5s ease-in-out;
      }
      
      @keyframes slideIn {
        0% {
          opacity: 0;
          transform: translateY(-20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
    <div className="container text-center m-top">
      <h2 id="sub-heading">Your Booking List</h2>
    </div>
    <div className="container">
        <div className="row">
        <div className="mx-auto mb-3 col-12 col-sm-10 col-md-3 col-xl-3 col-lg-3">
            <div className="card">
                <div className="card-body theme-color">
                    <div className="row">
                        <a className="active" id="categoryAll" 
                        onClick={() => handleClickForCategory('all')}>All</a>
                    </div>
                    <div className="row">
                        <a className="" id="categoryOngoing" 
                        onClick={() => handleClickForCategory('ongoing')}>Ongoing</a>
                    </div>
                    <div className="row">
                        <a className="" id="categoryUpcoming" 
                        onClick={() => handleClickForCategory('upcoming')}>Upcoming</a>                         
                    </div>
                    <div className="row">
                        <a className="" id="categoryPrevious" 
                        onClick={() => handleClickForCategory('previous')}>Previous</a>
                    </div>
                    <div className="row">
                        <a className="" id="categoryCancelled" 
                        onClick={() => handleClickForCategory('cancelled')}>Cancelled</a>
                    </div>
                </div>
            </div>
        </div>

        <div className="mx-auto mb-3 col-12 col-sm-10 col-md-8 col-xl-8 col backgd">
        <div className="refreshdiv"><button onClick={(e)=>handleRefresh(e)} className="refreshbtn"><span>Click to Refresh</span><i className="bi bi-arrow-clockwise"></i></button></div>
        {filteredBookings.map(u=>       
            <div id="eachItem" key={u.id} className="mb-3 card">
                <div className="card-body row theme-color"> 
                    
                    <div className="col-3 col-md-2">
                    <div className="image-container">
                        <Avatar src={u?.wProfilePic} sx={{ width: 56, height: 56 }} style={{"backgroundColor":"var(--light-type-color)"}}/>
                    </div>
                    </div>
                    
                    <div className="col-9 col-md-10 row">
                        <div id="status" className="status">
                            <Statusicon status={u.status}/>&nbsp;Status
                        </div>
                        <div id="typename" className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 ">
                            <b>Type:</b> {u.wType}
                        </div>
                        <div id="fullname" className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 ">
                            <b>Date:</b> {u.timestamp.toDate().toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                            })}
                        </div>
                        <div id="statusupdate" className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 ">
                            <b>{u.statusDescription}</b>
                        </div>
                        <div id="typename" className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 ">
                            <b>Name:</b> {u.wName}
                        </div>
                        <div id="fullname" className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 ">
                            <b>Time:</b> {u.timestamp.toDate().toLocaleTimeString('en-GB', {
                             hour: 'numeric',
                             minute: 'numeric',
                             hour12: true,
                            })}
                        </div>
                        <div id="billamount" className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 ">
                            <b>Bill:</b> Rs {u.bill==null?"--.--":u.bill}
                        </div>
                        {u?.OTP !== null && u?.statusDescription =="Confirmed" ?<>
                        <div id="otpvalue" className="col-12 col-sm-6 col-md-12 col-xl-4">
                            <b>OTP:</b> {u.OTP}
                        </div></>:<></>}
                        {u?.statusDescription == "Completed"
                            && <div id="rating" className="col-12 sol-sm-12 col-md-12 col-xl-12 col">
                                <b>Rating:</b> <Rating onChildValue={handleChildValue}/> {ratingbyuser>0 &&<button className="btn bg-primary text-light" onClick={()=>changeRating(u.id,u.wId,u.wStar)}>Submit</button>}
                            </div>
                        }
                    </div>  
                </div>
            </div>
        )}
        </div>
        </div>
    </div>
    </>)
}
export default Booklist

