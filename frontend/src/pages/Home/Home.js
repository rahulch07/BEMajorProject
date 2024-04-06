import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { gState } from '../../store/gStates';

import { Link } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const history = useNavigate();
  const name = useRecoilValue(gState);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const handleButtonClick = () => {
    //history.push('/');
    localStorage.getItem('userName')==null  ? window.location.href='/auth'  :  window.location.href='/choice';

  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const gifStyle = {
    width: '300px',
    height: '300px',
    position: 'absolute',
    right: 0,
    bottom: scrollY / 3.5, // Adjust the divisor for desired speed
    transform: `translateY(50%) translateX(0%) translateY(${scrollY}px)`,
    transition: 'bottom 0.3s ease-out', // Add a smooth transition
  };

  return (
    <div className='home-container'>
      
      <div
        className="main-dash"
        style={{
          position: 'relative',
          zIndex: -2,
          background: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: '80px',
          height: '80vh',
        }}>
        <h1 className="home-heading text-white ">A Yoga AI Trainer</h1>
        <h2 className="description text-white">Enhancing the world of Yoga with AI.</h2>
       
        {/* <div className="home-main"> */}
        
      </div>
      <div className="btn-section" style={{position: 'relative', top:'-270px', left: 'auto', marginLeft: '100px'}}>
          {/* Use onClick to handle button click */}
          <button className="btn btn-light btn-start" onClick={handleButtonClick}>
            Let's Start
          </button>
        </div>
      
      <div className='home-facts'>
        <div>
          <div>
            <h1 className="home-heading text-black" style={{ padding: '18px', position: 'absolute', backgroundRepeat: "no-repeat" }}>
              Welcome and Experience the new world of Yoga!!
            </h1>
          </div>
          <div className="overlap-image-container">
            <img
              className="overlap-image"
              src="https://media.tenor.com/D7iO2z0TM8sAAAAi/yoga-relax.gif"
              alt="Overlap Image"
              style={gifStyle}
            />
          </div>
          <h2 style={{ transform: 'translateY(300%)', width: '80%' }}>Some Facts about yoga:</h2>

          <div className='cardClass' style={{ transform: 'translateY(10%)', position:'relative' }}>
            <div className="card" style={{ width: '80%' }}>
              <div className="row">
                <div className="col-md-6" style={{ height: '100%' }}>
                  <img className="card-img-top" style={{ objectFit: 'contain', margin: '20px' }} src="https://go4ethnic.blog/wp-content/uploads/2021/07/Yoga-1024x683-1.jpg" alt="Card image" />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <p className="card-text text-center" style={{ padding: "10px", width: "100%", fontFamily: 'sans-serif', fontSize: '1.5rem' }}>
                      <b>Ancient Origins</b>: Yoga has ancient roots and originated in India over 5,000 years ago.
                      The word "yoga" comes from the Sanskrit word "yuj," meaning to yoke or unite, reflecting its goal of uniting the mind, body, and spirit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ width: '80%' }}>
              <div className="row">
                <div className="col-md-6 order-md-2">
                <img className="card-img-top" style={{ objectFit: 'contain', margin: '20px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Eight_Limbs_of_Yoga_diagram.svg/370px-Eight_Limbs_of_Yoga_diagram.svg.png" alt="Card image" />
                </div>
                <div className="col-md-6 order-md-1">
                  <div className="card-body">
                    <p className="card-text text-center" style={{ padding: "10px", width: "100%", fontFamily: 'sans-serif', fontSize: '1.5rem' }}>
                      <b>Eight Limbs of Yoga</b>: The classical system of yoga outlined by the sage Patanjali in the Yoga Sutras includes eight limbs: Yama (ethical standards), Niyama (self-discipline), Asana (physical postures), Pranayama (breath control), Pratyahara (withdrawal of senses), Dharana (concentration), Dhyana (meditation), and Samadhi (state of blissful absorption).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ width: '80%' }}>
              <div className="row">
                <div className="col-md-6">
                <img className="card-img-top" style={{ objectFit: 'contain', margin: '20px' }} src="https://www.crossidentity.com/wp-content/uploads/2023/06/Hatha-Yoga-%E2%80%93-How-it-differs-from-Patanjali-Yoga.png" alt="Card image" />

                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <p className="card-text text-center" style={{ padding: "10px", width: "100%", fontFamily: 'sans-serif', fontSize: '1.5rem' }}>
                      <b>Hatha Yoga</b>: The most commonly practiced form of yoga in the West is Hatha Yoga, which focuses on physical postures (asanas) and breath control (pranayama) to prepare the body for meditation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ width: '80%' }}>
              <div className="row">
                <div className="col-md-6 order-md-2">
                <img className="card-img-top" style={{ objectFit: 'contain', margin: '20px' }} src="https://www.easyayurveda.com/wp-content/uploads/2017/12/benefits-of-yoga1.jpg" alt="Card image" />

                </div>
                <div className="col-md-6 order-md-1">
                  <div className="card-body">
                    <p className="card-text text-center" style={{ padding: "10px", width: "100%", fontFamily: 'sans-serif', fontSize: '1.5rem' }}>
                      <b>Benefits for Mind and Body:</b> Regular practice of yoga has been shown to have numerous physical and mental health benefits. It can improve flexibility, strength, balance, and posture while reducing stress, anxiety, and depression.              </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
