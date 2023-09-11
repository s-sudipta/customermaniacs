// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyCnDrfw1kAl_Ijj0qWUQXkmBzHXHZ2CSW4",

  authDomain: "database-firebase-a64f5.firebaseapp.com",

  databaseURL: "https://database-firebase-a64f5-default-rtdb.firebaseio.com",

  projectId: "database-firebase-a64f5",

  storageBucket: "database-firebase-a64f5.appspot.com",

  messagingSenderId: "551975788398",

  appId: "1:551975788398:web:c2748b27488e116c556b7f"

};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app);