import React from 'react'
import "./Choice2.css"
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { painState } from "../../store/atom/currentpain";

import sessionimg from "../../utils/images/sessions.jpg"
import painimg from "../../utils/images/paincard.jpg";
import practiceimg from "../../utils/images/posepracticecard.jpg"
const Choice2 = () => {
    const setCurrentType = useSetRecoilState(painState);
    const navigate = useNavigate();
  return (
    <div className="choicemain">
      {/* card1 */}

      <div className="choiceyogamain">
        <div class="choicecontainer">
          <div className="prehovercard">
            <img src={sessionimg} alt="hathyoga Image" />
            <div className="prehovertextmain">
              <div className="prehovertitle">
                <h3>Sessions</h3>
              </div>
              <div className="prehovertext">
                Explore our preset yoga exercise sessions to jump right into
                your yoga practice. If you believe in the transformative power
                of yoga for mental and spiritual well-being, start your journey
                by clicking here.
              </div>
            </div>
          </div>

          <div class="choicediv">
            <button
              class="button"
              onClick={() => {
                setCurrentType({
                  currentType: "KneePain",
                  poseList: [
                    "Tree",
                    "Warrior",
                    "Chair",
                    "Crescent",
                    "Sphinx",
                    "Triangle",
                    "Camel",
                  ],
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
            <img src={painimg} alt="hathyoga Image" />
            <div className="prehovertextmain">
              <div className="prehovertitle">
                <h3>Pain</h3>
              </div>
              <div className="prehovertext">
                Are you grappling with discomfort and seeking relief? Embrace
                the healing power of yoga poses to alleviate pain,then click
                here !
              </div>
            </div>
          </div>

          <div class="choicediv">
            <button
              class="button"
              onClick={() => {
                navigate("/pain");
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
            <img src={practiceimg} alt="hathyoga Image" />
            <div className="prehovertextmain">
              <div className="prehovertitle">
                <h3>Pose Practice</h3>
              </div>
              <div className="prehovertext">
                Unlock the path to mastery! . Practice any pose of your liking
                and conquer those challenging ones. Your journey to strength,
                flexibility, and well-being starts here!
              </div>
            </div>
          </div>

          <div class="choicediv">
            <button
              class="button"
              onClick={() => {
                navigate("/yoga");
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

export default Choice2;
