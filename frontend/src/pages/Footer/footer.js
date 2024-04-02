import React from 'react'

export default function Footer() {
  return (
    <div className='footer-class' style={{ position: 'relative', display: 'flex' }}>

        <>
          {/* Footer */}
          <footer className="bg-dark text-center text-white" style={{ transform: "translateY(50%)",bottom: 0, width: "100%" }} >
            {/* Grid container */}
            <div className="container p-4">
             Social Media
              <section className="mb-4">
                Facebook
                <a
                  data-mdb-ripple-init=""
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                Twitter
                <a
                  data-mdb-ripple-init=""
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-twitter" />
                </a>
                Google
                <a
                  data-mdb-ripple-init=""
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-google" />
                </a>
                Instagram
                <a
                  data-mdb-ripple-init=""
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-instagram" />
                </a>
                Linkedin
                <a
                  data-mdb-ripple-init=""
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
                Github
                <a
                  data-mdb-ripple-init=""
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-github" />
                </a>
              </section>
              {/* Section: Social media */}
              {/* Section: Form */}
              <section className="">
                <form action="">
                  {/*Grid row*/}
                  <div className="row d-flex justify-content-center">
                    {/*Grid column*/}
                    <div className="col-auto">
                      <p className="pt-2">
                        <strong>Sign up for our newsletter</strong>
                      </p>
                    </div>
                    {/*Grid column*/}
                    {/*Grid column*/}
                    <div className="col-md-5 col-12">
                      {/* Email input */}
                      <div data-mdb-input-init="" className="form-outline mb-4">
                        <input
                          type="email"
                          id="form5Example24"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form5Example24">
                          Email address
                        </label>
                      </div>
                    </div>
                    {/*Grid column*/}
                    {/*Grid column*/}
                    <div className="col-auto">
                      {/* Submit button */}
                      <button
                        data-mdb-ripple-init=""
                        type="submit"
                        className="btn btn-outline mb-4"
                      >
                        Subscribe
                      </button>
                    </div>
                    {/*Grid column*/}
                  </div>
                  {/*Grid row*/}
                </form>
              </section>
              {/* Section: Form */}
              {/* Section: Text */}
              <section className="mb-4">
                <p>
                  All Rights Reserved. Copyright © 2024.
                </p>
              </section>
              {/* Section: Text */}
              {/* Section: Links */}
              <section className="">
                {/*Grid row*/}
                <div className="row">
                  {/*Grid column*/}
                  <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase"></h5>
                    
                  </div>
                  {/*Grid column*/}
                  {/*Grid column*/}
                  <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase"></h5>
                    
                  </div>
                  {/*Grid column*/}
                  {/*Grid column*/}
                  <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase"></h5>
                    
                  </div>
                  {/*Grid column*/}
                  {/*Grid column*/}
                  <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase"></h5>
                    
                  </div>
                  {/*Grid column*/}
                </div>
                {/*Grid row*/}
              </section>
              {/* Section: Links */}
            </div>
            {/* Grid container */}
            {/* Copyright */}
            <div
              className="text-center p-3"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            >
              © 2024 Copyright:
              <a className="text-reset fw-bold" href="#">
                yoga.com
              </a>
            </div>
            {/* Copyright */}
          </footer>
          {/* Footer */}
        </>

      </div>
  )
}
