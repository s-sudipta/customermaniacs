
import { useState, useEffect } from "react";
import GetGPS from './getgps.jsx'
import {useRouter} from 'next/router'
import { parseCookies,setCookie, destroyCookie } from 'nookies/dist'

export default function Searchbar() {
  const [gps, setGps] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const cookie = parseCookies()
  const router = useRouter()
  useEffect(()=>{
   if(router.pathname=='/search')
   {
      var input = document.getElementById("search")
      input.value = cookie.searchitem ? cookie.searchitem : ""
      input.focus();
   }
  },[router])
  const setgpslocation = flag => {
    setGps(gps => true && flag)
  }

  function Searchmenu(e){
    if(router.pathname == "/search")
    {
      setSearchTerm(e);
      console.log(searchTerm);
      destroyCookie(null, "searchitem")
    }
    if(e!=null && router.pathname == "/"){
      setCookie(null, "searchitem", e,
                  {secure:true,sameSite: "lax"})
      router.push('/search')
    }
    if(e==null || e=="" && router.pathname == "/search"){
       router.push('/')
    }
    
  }
  const handleSearch = (event) => {
    event.preventDefault();
    router.push(`/search/${searchTerm}`);
  };
  return (<>
    <style jsx>{`
      a{
        color:white !important;
      }
      a:hover{
  font-weight: bold;
}
      #content {
  margin: 0% 15% 0 15%;
}

@media only screen and (max-width: 992px) {
#content {
  margin: 0% 5% 0 4%;
}
  #contain{
    --bs-gutter-x: 0;
    width:100%;
  }

}
#locateMe{
    padding : calc(2vw + 1vh)  0 calc(1vw + 0.5vh) 0;        
}
      #setGPSLocation{
        font-size : calc(1.5vh + 0.7vw);
        text-decoration: none;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      }
.search-form {
  border-radius: 0.8rem 0 0 0.8rem;
  background-color: var(--light-type-color);
  border: 5px solid var(--main-theme-color);
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  outline:none;
  
  padding-left: 20px;
}
.search-form:focus{
  background-color: white;
}
        
.input-group {
  width:100%;
  z-index:2;
}

.input-group-btn {
  max-width:38px;
}

.search-btn {
  cursor:pointer;
  border-radius: 0 0.8rem 0.8rem 0; 
  background-color: var(--main-theme-color);
  color:white;
  outline:none;
  text-align: center;
  border: 0;
  padding: 10px 15px 15px 15px;
}
.search-btn:hover{
  color: var(--sub-theme-color) !important;
}
.search-btn:active{
  color: var(--main-theme-color) !important;
}
.input-group-btn{
    width:50px;          
}

    `}</style>

    <div id="locateMe" className="container-fluid text-center text-light mt-4" >
      <a onClick={() => setGps(true)} id="setGPSLocation"><i className="bi bi-geo-alt-fill"></i>&nbsp;Locate me</a>
    </div>
    <div className="container pb-5" id="contain">
      <div id="content" className="search-bar">
        <form className='form-inline' onSubmit={handleSearch}>
          <div className="input-group">
            <input type='text' id='search' className="search-form" placeholder="Type here to search...."
              autoComplete="off" onChange={(e) =>Searchmenu(e.target.value)}/>
            <span className="input-group-btn">
              <button id="search-this" type="button" className="pull-right search-btn">
                <i className="bi bi-search"></i>
              </button>
            </span>
          </div>
        </form>
      </div>
      {gps && <GetGPS setgpslocation={setgpslocation} />}
    </div>
  </>)
}