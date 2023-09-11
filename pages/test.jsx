import { collection, onSnapshot, query } from "@firebase/firestore";
import {useState, useEffect} from "react"
import {db} from "../firebase.js"
const Test = () => {
  const [user,getUser] = useState([])
  useEffect(()=>{
    const collectionRef = collection(db, "customer")
    const q = query(collectionRef)
    
    const customer = onSnapshot(q,(querySnapshot)=>{
      getUser(querySnapshot.docs.map(doc=>({...doc.data()})))
  });
  return customer;
},[])
  return(<>
    {user.map(u=><div className="mt-5 p-5" key={u.id}>{u.displayName}&emsp;&emsp;{u.email}&emsp;&emsp;{u.phoneNumber}</div>)}
  </>)
}
export default Test