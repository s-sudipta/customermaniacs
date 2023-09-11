import { createContext, useContext, useEffect, useState } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies/dist'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase'
import { db } from '../firebase.js'
import { doc, getDoc } from "firebase/firestore";
import { updateProfile } from '@firebase/auth'
import customAlert from '../component/customalert'
import { error } from 'console'
const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userdata, setUserdata] = useState<any>(null)
  const cookie = parseCookies()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: cookie.displayName
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])
  useEffect(() => {
    if (userdata) {
      
      Object.entries(userdata).forEach(e => {
        let value: string
        value = typeof e[1] === 'string'? e[1] : 'undefined'
        setCookie(null, e[0],value,
                  {secure:true,maxAge: 30 * 24 * 60 * 60 * 60 * 365,sameSite: "strict"})
        
      });
      
    }
  }, [userdata])


  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password).catch(
        (err) => customAlert(err.message,"error")
      );
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).catch(
        (err) => customAlert(err.message,"error")
      );
  }


  const logout = async () => {
    setUser(null)
    const cookies = parseCookies()
    Object.entries(cookies).forEach(e => {
      destroyCookie(null, e[0])
    });
    await signOut(auth)
    customAlert("logged out","warning");
  }
  const dataset = (uid: string) => {
    getDoc(doc(db, "customer", uid)).then(docSnap => {
      if (docSnap.exists()) {
        const docObj = docSnap.data();
        setUserdata({ ...docObj,id:uid })
      }
    })
  }
  return (
    <AuthContext.Provider value={{ user, login, signup, logout, dataset}}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}