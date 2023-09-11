//https://youtu.be/ZmpO65DhRN0 
//https://github.com/sairajchouhan/nextjs-firebase-auth/blob/main/pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css';
import Head from "next/head";
import type { AppProps } from 'next/app'
import Footer from "../component/footer/footer.jsx"
import Navbar from "../component/navbar/navbar.jsx"
import { AuthContextProvider } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies/dist'
import ProtectedRoute from '../context/ProtectedRoute'
import Loading from '../component/loading/loading'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const noAuthRequired = ['/', '/login', '/signup', '/search', '/about', '/description']

function MyApp({ Component, pageProps }: AppProps) {

const [loading, setLoading] = useState(true);
useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Simulate a 2 second loading time
    return () => clearTimeout(timer);
  }, []);

const router = useRouter()
const cookie = parseCookies()
useEffect(()=>{
  const body = document.getElementsByTagName('body')[0]
    if(cookie.theme == 'dark'){
      body.classList.add('dark-mode')
    }
  else{
    body.classList.remove('dark-mode')
  }
},[]);  
return (
  <>{loading ? <Loading /> : 
    <AuthContextProvider>
      <Head>
        <title>Miniacs</title>
        <link rel="icon" href="/icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <Navbar/>
      {noAuthRequired.includes(router.pathname) ? (
        <div className="main"><ToastContainer /><Component {...pageProps} /></div>
      ) : (
        <ProtectedRoute>
          <div className="main"><ToastContainer /><Component {...pageProps} /></div>
        </ProtectedRoute>
      )}
      <Footer/>
    </AuthContextProvider>}</>
  )
}
export default MyApp
