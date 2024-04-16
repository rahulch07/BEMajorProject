import React from 'react'
import "./Home2.css"
import vid from "../../utils/images/yogastartvideo.mp4"
import whyyoga from "../../utils/images/whyyoga.jpg"
import hathyoga from "../../utils/images/hathyoga.jpg"
import keypoints from "../../utils/images/keypoints.gif"

const Home2 = () => {
  return (
    <div className="main-wrapper">
      <div className="wrapper">
        <header>
          <video
            autoPlay
            type="video/mp4"
            loop
            muted
            style={{ width: "100vw" }}
            className="background"
          >
            <source src={vid} />
          </video>
          <h1 className="title">Enhancing the world of Yoga with AI</h1>
          <div className="startbtn">
            <a href="/choice" class="cta">
              <span>Start</span>
              <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </a>
          </div>
        </header>
        <section>
          <div className="introline">
            Welcome and Experience the new world of Yoga.
          </div>

          <div className="whymain">
            <div className="whytextmain">
              <div className="whytitle">Why Yoga ?</div>
              <div className="whytext">
                Yoga offers numerous benefits for both body and mind. Through
                its combination of physical poses, breathing techniques, and
                meditation, yoga improves flexibility, strength, and balance
                while reducing stress and promoting relaxation. Regular practice
                enhances mindfulness, boosts mood, and increases focus and
                concentration. It also supports cardiovascular health, aids in
                weight management, and boosts energy levels. With its gentle
                movements, yoga is accessible to people of all ages and fitness
                levels, providing a holistic approach to overall well-being.
              </div>
            </div>

            <img className="whyimg" src={whyyoga} alt="image of yoga posture" />
          </div>

          <div className="hathyogamain">
            <div class="hathcontainer">
              <img src={hathyoga} alt="hathyoga Image" />
              <div class="hathdiv">
                <div className="hathtitle">Hath Yoga : </div>
                <div className="hathtext">
                  Hatha Yoga, often referred to as the "yoga of balance,"
                  encompasses a wide range of physical practices that focus on
                  harmonizing the body and mind. Originating in ancient India,
                  Hatha Yoga aims to create a state of balance and union between
                  opposing forces, such as strength and flexibility, effort and
                  surrender, and activity and stillness. In Hatha Yoga practice,
                  emphasis is placed on holding yoga poses (asanas) with proper
                  alignment, allowing practitioners to develop physical
                  strength, flexibility, and endurance. These asanas are often
                  complemented by breath control techniques (pranayama), which
                  involve conscious regulation of the breath to enhance the flow
                  of life energy (prana) within the body. Pranayama practices
                  help calm the mind, increase focus, and promote relaxation.
                  One of the distinguishing features of Hatha Yoga is its focus
                  on preparing the body for meditation. Through the practice of
                  asanas and pranayama, practitioners cultivate physical and
                  mental stability, making it easier to sit comfortably for
                  extended periods of meditation. The ultimate goal of Hatha
                  Yoga is to achieve a state of inner balance and tranquility,
                  leading to greater self-awareness, clarity of mind, and
                  spiritual growth. In the Western world, Hatha Yoga has gained
                  widespread popularity due to its accessibility and emphasis on
                  physical fitness and stress relief. Many yoga classes offered
                  in gyms, studios, and wellness centers are based on Hatha Yoga
                  principles, making it one of the most accessible forms of yoga
                  for beginners and experienced practitioners alike.
                </div>
              </div>
            </div>
          </div>
          <div className="featuretitlediv">
            <div className="featuretitle">Why YogaWise ?</div>
          </div>

          <div className="featuremain">
            <img
              className="featureimg"
              src={keypoints}
              alt="keypoints gif was here"
            />
            <div className="featuretextmain">
              <div className="featuretext">
                <ul>
                  <li>
                    <div className="pointsbox">
                      <strong>Live Key Point Detection:</strong>
                    </div>
                    <div className="points">
                      Enable live tracking of yoga poses through keypoint
                      detection technology, providing real-time feedback on your
                      form and alignment.
                    </div>
                  </li>
                  <li>
                    <div className="pointsbox">
                      <strong>Pose Timer:</strong>
                    </div>
                    <div className="points">
                      Utilize a built-in timer feature to help you hold yoga
                      poses for specific durations, supporting consistency and
                      progression in your practice.
                    </div>
                  </li>
                  <li>
                    <div className="pointsbox">
                      <strong>Pain-Specific Sessions:</strong>
                    </div>

                    <div className="points">
                      Access tailored yoga sessions designed to address specific
                      areas of discomfort or pain, offering targeted relief and
                      rehabilitation.
                    </div>
                  </li>
                  <li>
                    <div className="pointsbox">
                      <strong>Progress Analytics:</strong>
                    </div>
                    <div className="points">
                      Monitor and analyze your yoga practice over time with
                      detailed analytics, allowing you to track your progress,
                      set goals, and make informed adjustments to your routine.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <footer>
            <div className="footerlogo">YogaWise</div>
            <div className='footertext'>created by : </div>
            <a href="/about">Rugved Shinde</a>
            <a href="/about">Rahul Chougule</a>
            <a href="/about">Amey Parle</a>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default Home2
