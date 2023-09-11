const Whychooseus = () => {
    return (<>
    <style jsx>{`
#features {
  padding: 82px 0 100px 0;
  background-image: url(${require("../../public/img/choose/bg.png").default.src});
  background-repeat: no-repeat;
  background-size: 100% 104%;
  text-align: center;
  background-position-y: center;
}
#features figure {
  margin: 0 auto 15px auto;
  width: 200px;
  height: 165px;
}
#features h5 {
  font-size: 28px;
  line-height: 35px;
  margin-bottom: 20px;
  font-weight: bold;
  color: var(--main-theme-color);
}
#features p {
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 0;
  font-weight: 300;
  cursor: pointer;
}
#features figure img {
  max-width: 200px;
  max-height: 165px;
}
img {
  vertical-align: middle;
  max-width: 100%;
  height: auto;
  -ms-interpolation-mode: bicubic;
}
#features h2 {
    font-size: 48px;
    line-height: 52px;
    margin-bottom: 40px;
    margin-top: 0px;
    font-weight:bold;
    text-align: left;
    position: relative;
  }
#features h2::before {
    position: absolute;
    content: "";
    background: url(${require("../../public/img/choose/icon28.png").default.src}) no-repeat;
    width: 68px;
    height: 61px;
    left: -75px;
    top: -40px;
}
`}
</style>
<div id="features">
      <div className="container">
        <h2>Why Choose Us</h2>
        <div className="row">

         <div className="col-sm-4 col-12">
            <figure>
              <img src={require("../../public/img/choose/choose1.png").default.src} alt="icon" loading="lazy"/>
            </figure>
            <h5>Trained and Reliable</h5>
            <p> We’re not an agency, but a young startup run by a passionate group of professionals. We train our workers at certified training centers.</p>
          </div>
         
          <div className="col-sm-4 col-12">
            <figure>
              <img src={require("../../public/img/choose/choose2.png").default.src} alt="icon" loading="lazy"/>
            </figure>
            <h5>Transparent Pricing</h5>
            <p>You get what you pay for. Additionally, you get replacement guarantee, Covid-19 test reports, verification documents and more!</p>
          </div>

           <div className="col-sm-4 col-12">
            <figure>
              <img src={require("../../public/img/choose/choose3.png").default.src} alt="icon" loading="lazy"/>
            </figure>
            <h5>Customer Support</h5>
            <p>Our executives will always be there to hear you out and solve your issues</p>
          </div>

        </div>
      </div>
    </div>
    </>  );
}
export default Whychooseus