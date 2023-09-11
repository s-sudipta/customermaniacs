import "slick-carousel/slick/slick.css";
import Image from 'next/image'
import { useRouter } from 'next/router';
import Slider from "react-slick";
function Categories() {  
    const typeList = require("./json/categoriesJson.js")
    const router = useRouter()
    var settings = {
      infinite: true,
      margin: 20,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 2,
      initialSlide: 0,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1080,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
    };
    
    return ( 
      <>
      <style jsx>{`
        .card{
          transition: transform 0.3s;
          background-color:var(--second-bg-color);
        }
        .card:hover{
          transform:scale(1.1);
        }

        .navbar-brand{
  font-size: calc(0.5vw + 2vh);
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-right: 0 !important;
}
        .item {
      padding: 0 5px;
      }
      .card-img-top{
        position:relative;
        height: calc(10vw + 5vh);
      }
      .categories-item h4{
        font-weight: bold;
        color:var(--text-color);
        font-size: calc(0.8vw + 1.2vh);
      }
      #carousel-card{
        height: calc(3vh + 3vw);
        padding: calc(1vh + 1vw) calc(1vh + 1vw);
      }
      `}</style>
      <div className="container-lg mt-5 mb-5">
          <h1 className="text-center" id="sub-heading">Categories</h1>
        <div className="row">
          <div className="col-12">
              <Slider {...settings}>
                {typeList.map((index)=>{
                  return(  
          <div key={index.key} className="item">
            <a onClick={()=>router.push("/search/"+index.type.toLowerCase())}>
              <div className="card">
                <div className="card-img-top">
                <Image 
                  src={index.img}
                  alt={index.key}
                  fill
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                />
                </div>
                
                <div className="card-body" id="carousel-card">
                  <div className="card-title text-center categories-item" id="categories-item">
                    <h4>{index.type}</h4>
                  </div>
                </div>
              </div>
            </a>
          </div>
                  )
                })}
        </Slider>
      </div>
          </div>
        </div>
      </>);
  
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    style={{display: "flex",position: "absolute", backgroundColor: "rgba(255,255,255,0.5)",zIndex: "1", margin: "0 0",fontSize: "calc(0.15vh + 2.5vw)",color: "black",padding: "0 calc(0.25vh + 0.5vw) calc(0.25vh + 0.5vw) calc(0.25vh + 0.5vw)",right: "0",top:"50%", transform: "translate(0,-50%)" }}><i className="bi bi-chevron-right"></i></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
     style={{display: "flex",position: "absolute", backgroundColor: "rgba(255,255,255,0.5)",zIndex: "1", margin: "0 0",fontSize: "calc(0.15vh + 2.5vw)",color: "black",padding: "0 calc(0.25vh + 0.5vw) calc(0.25vh + 0.5vw) calc(0.25vh + 0.5vw)",left: "5px",top:"50%", transform: "translate(0,-50%)" }}><i className="bi bi-chevron-left"></i></div>
  );
}
export default Categories