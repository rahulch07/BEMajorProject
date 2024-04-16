import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { painState } from "../../store/atom/currentpain";
import backpain from "../../utils/images/backpain.jpg";
import kneepain from "../../utils/images/kneepain.png";
import shoulderneckpain from "../../utils/images/shoulderneckpain.jpg"
import "./Choice2.css"

const Rootpain2 = () => {
    const setCurrentType = useSetRecoilState(painState);
    const navigate = useNavigate();
  return (
    <div className="choicemain">
      <div className='rootpaintitlemain'>
        <div className='rootpaintitle'> Select Your Area Of Discomfort</div>
      </div>
      {/* card1 */}

      <div className="choiceyogamain">
        <div class="choicecontainer">
          <div className="prehovercard">
            <img src={backpain} alt="hathyoga Image" />
            <div className="prehovertextmain">
              <div className="prehovertitle">
                <h3>Back Pain</h3>
              </div>
              <div className="prehovertext">
                Discover soothing yoga poses to alleviate and prevent back pain.
                Explore gentle stretches and strengthening exercises to promote
                a healthy and pain-free spine.
              </div>
            </div>
          </div>

          <div class="choicediv">
            <button
              class="button"
              onClick={() => {
                setCurrentType({
                  currentType: "BackPain",
                  poseList: ["Tree", "Crescent", "Sphinx"],
                });
                navigate("/keypain");
              }}
            >
              Go here
            </button>
          </div>
        </div>
      </div>

      {/* card2 */}

      <div className="choiceyogamain">
        <div class="choicecontainer">
          <div className="prehovercard">
            <img src={kneepain} alt="hathyoga Image" />
            <div className="prehovertextmain">
              <div className="prehovertitle">
                <h3>Knee Pain</h3>
              </div>
              <div className="prehovertext">
                Experience relief from knee discomfort with our specialized yoga
                poses. Strengthen and nurture your knees with targeted exercises
                designed to enhance flexibility and reduce pain, fostering a
                path towards improved mobility
              </div>
            </div>
          </div>

          <div class="choicediv">
            <button
              class="button"
              onClick={() => {
                setCurrentType({
                  currentType: "KneePain",
                  poseList: ["Warrior", "Chair", "Camel"],
                });
                navigate("/keypain");
              }}
            >
              Go here
            </button>
          </div>
        </div>
      </div>

      {/* card3 */}

      <div className="choiceyogamain">
        <div class="choicecontainer">
          <div className="prehovercard">
            <img src={shoulderneckpain} alt="hathyoga Image" />
            <div className="prehovertextmain">
              <div className="prehovertitle">
                <h3>Shoulder Neck Pain</h3>
              </div>
              <div className="prehovertext">
                Ease tension and find relief for your shoulder and neck pain
                through purposeful yoga poses. Discover movements that promote
                relaxation and alleviate discomfort, guiding you towards a more
                comfortable and pain-free upper body.
              </div>
            </div>
          </div>

          <div class="choicediv">
            <button
              class="button"
              onClick={() => {
                setCurrentType({
                  currentType: "NeckShoulderPain",
                  poseList: ["Triangle", "Camel", "Sphinx"],
                });
                navigate("/keypain");
              }}
            >
              Go here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rootpain2
