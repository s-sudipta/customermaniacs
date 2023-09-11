export default function Title(){
  return(
    <>
    <style jsx>{`
      #sloganbox{
      padding: calc(5.5vw + 9.45vh) 0 0 0;
      width: 100%;
      text-align: center;
      color:white; 
      }
      #slogan{
      font-family: 'Fairplay', Fallback, sans-serif;
      font-style: italic;
      font-size: calc(6vw + 3vh);
      }
      #subslogan{
      font-family: 'Hamish', Fallback, sans-serif;
      font-size: calc(2vw + 1vh);
      }
    `}</style>
        <div className="container-fluid" id="sloganbox">
        <h1 className="slogan" id="slogan">The Best Person</h1>
        <h4 className="subslogan" id="subslogan">FOR YOUR WORK</h4>
      </div>
      </>
  )
}