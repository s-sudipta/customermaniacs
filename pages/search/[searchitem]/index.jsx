import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { collection, onSnapshot, query } from "@firebase/firestore";
import {db} from "../../../firebase.js"


const WorkersPage = () => {
  const router = useRouter();

  const [workers, setWorkers] = useState([]);
  
  const { searchitem } = router.query;
  
  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, "worker");
      const q = query(collectionRef);
      const querySnapshot = await new Promise((resolve, reject) => {
        onSnapshot(q, (snapshot) => {
          resolve(snapshot);
        }, reject);
      });
      const workers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const filteredWorkers = workers.filter((worker) => {
        if (searchitem) {
          const searchRegex = new RegExp(searchitem, "i");
          return searchRegex.test(worker.name) || searchRegex.test(worker.profession);
        } else {
          return true;
        }
      });
      setWorkers(filteredWorkers);
    };
    fetchData();
  }, [searchitem]);
  useEffect(() => {
    if(workers.length != 0){
      console.log(workers)
    }
  },[workers])
 const handleClick = (id) => {
    router.push(`/worker/profile/${id}`);
  };
  return(<>
    <style jsx>{`
    .row > *{
    padding-right: 0;
    padding-left: 0;
  }
  #workerList {
    background-color: rgba(0,0,0,0.05) !important;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  }
  #profile-image{
    height: calc(10vh + 4vw);
    border-radius: 5px;  
  }
  col {
    padding-right: 0 !important;
  }
  .title {
    font-weight: bold;
    text-align: center;
  }
  .title{
    margin:0 1vw;
  }
  label{
    font-size: calc(1.5vh + 0.15vw)
  }
  #item-row{
    background-color: rgba(0,154,255,0.5);
    margin: 0 10px 5px 0px;
    border-radius: 5px;
  }
 #preview-btn{
    float: left;
    margin: 2.5% 2.5%;
    font-size: calc(1.5vh + 0.15vw);
    outline:0;
    border:0;
    padding: 5px;
    border-radius: 5px;
    background-color: var(--sub-theme-color);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }
 #preview-btn:hover, #preview-btn:active {
    background-color: var(--main-theme-color);
  }
  #searchText{
    text-align: center;
    font-size: 26px;
    
    font-weight: bold;
  }
  #searchText,.title,.textvalue{
    color: var(--text-color);
  }
    `}</style>
    <div id="searchText" className="m-auto mt-5"><p>You Have Search For : {searchitem}</p></div>
 <div className="m-auto container-lg">
    {workers.map(u=>
    <div id="workerList" key={u.id} className="p-2 mx-auto mb-5 col-12 col-sm-12 col-md-10 col-xl-6">
      <div className=" row justify-content-center d-flex">
        <div className="col-4 justify-content-center d-flex">
          <div className="mb-auto mx-auto mt-2">
            <img id="profile-image" src={(u?.profilepic!=null)?(u?.profilepic):"https://dummyimage.com/400x400/9c8c9c/080808&text=profile+pic"} />
          </div>
        </div>
        <div className="col-8">
          <div className="row" id="item-row">
            <div className="col"><label className="title">Name</label></div>
            <div className="col"><label className="textvalue">{u.name}</label></div>
          </div>
          <div className="row" id="item-row">
            <div className="col"><label className="title">Profession</label></div>
            <div className="col"><label className="textvalue">{u.profession}</label></div>
          </div>
          <div className="row" id="item-row">
            <div className="col"><label className="title">Age</label></div>
            <div className="col"><label className="textvalue">{u.age}</label></div>
          </div>
          <div className="row" id="item-row">
            <div className="col"><label className="title">Availability</label></div>
            <div className="col"><label className="textvalue">{u.availability}</label></div>
          </div>
          <div className="row">
          <div className="col">
            <button id="preview-btn" className="text-light" onClick={() => handleClick(u.id)}>Preview and Book</button>
          </div>
        </div>
      </div>
    </div>
    </div>)}
   </div>
  </>)
}
export default WorkersPage;