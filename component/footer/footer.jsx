export default function Footer(){
  return(<>
  <style jsx>{`
        footer{
            background-color: var(--sub-theme-color);
      }
      p{
        color: var(--light-type-color);
      }
      a{
        color: var(--light-type-color);
      }
      a:hover{
        color: white;
        font-weight: bold;
      }
      `}</style>
    <footer className="container-fluid text-center text-lg-start text-white">
      <div className="p-4 pb-0">
        <section className="p-3 pt-0">
          <div className="row">
            <div className="col-md-6 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                Maniacs
              </h6>
              <p>
                A good newcomer service company based on daily wage worker booking platform at reseonable prices and provide quality services. 
              </p>
            </div>
            <hr className="w-100 clearfix d-md-none" />
            <div className="col-md-6 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Domains</h6>
              <p>
                <a>Customer Service</a>
              </p>
              <p>
                <a href="https://job-worker.vercel.app/">Join as Worker</a>
              </p>
              <p>
                <a>Join as Coordinator</a>
              </p>
              <p>
                <a>Admin</a>
              </p>
            </div>
            <hr className="w-100 clearfix d-md-none" />
            <div className="col-md-6 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                Useful links
              </h6>
              <p>
                <a>Your Account</a>
              </p>
              <p>
                <a>Become an Affiliate</a>
              </p>
              <p>
                <a>Seek for jobs</a>
              </p>
              <p>
                <a>Help</a>
              </p>
            </div>
            <hr className="w-100 clearfix d-md-none" />
            <div className="col-md-6 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p><i className="bi bi-home mr-3"></i>Kolkata,West Bengal,India</p>
              <p><i className="bi bi-envelope mr-3"></i> maniacs2023@gmail.com</p>
              <p><i className="bi bi-phone mr-3"></i> +91 98317 39043</p>
              <p><i className="bi bi-phone mr-3"></i> +91 97485 91532</p>
            </div>
          </div>
        </section>
        <hr className="my-3" />
        <section className="p-3 pt-0">
          <div className="row d-flex align-items-center">
            <div className="col-md-7 col-lg-8 text-center text-md-start">
              <div className="p-3">
                2022<i className="bi bi-c-circle" style={{"position":"relative","fontSize":"8px","bottom":"2ex"}}></i>&nbsp;Copyright :&nbsp;
                <a className="text-white" href="">Maniacs.com</a>
              </div>
            </div>
            <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
              <a className="btn-outline-light btn-floating m-1" role="button"><i
                  className="bi bi-facebook m-3"></i></a>
              <a className="btn-outline-light btn-floating m-1" role="button"><i
                  className="bi bi-twitter m-3"></i></a>
              <a className="btn-outline-light btn-floating m-1" role="button"><i
                  className="bi bi-google m-3"></i></a>
              <a className=" btn-outline-light btn-floating m-1" role="button"><i
                  className="bi bi-instagram m-3"></i></a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  </>)
}