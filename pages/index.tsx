import Styles from '../styles/Home.module.css'
import Categories from '../component/homecomponent/categories.jsx'
import Features from '../component/homecomponent/features.jsx'
import Offers from '../component/homecomponent/offers.jsx'
import Hometemplate from "../component/template/hometemplate.jsx"
import Description from "../pages/description.jsx"
import Whychooseus from "../component/homecomponent/whychooseus"
function Home() {
  
  return (
    <>
      <Hometemplate>
      
      <Offers/>
      
      <Categories/>
      <Features/>
      <Whychooseus/>
      <Description/>
      </Hometemplate>
    </>
  )

}

export default Home