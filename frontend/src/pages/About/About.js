import React from 'react'
import image from "../../utils/images/missionimg.jpg"
//import StackIcon from "tech-stack-icons";
import sessions from "../../utils/images/sessions.jpg"
import { AiFillGithub } from "react-icons/ai";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";
import './About.css';
const About = () => {
   

  return (
    <div className="missionmain">
      <div className="missionpage">
        <div className="missiontext">
          <span className="headers" id="test">
            "Our mission is to empower individuals on their journey to holistic
            well-being through the fusion of technology and yoga philosophy.
          </span>
          <span className="headers" id="test">
            By leveraging cutting-edge pose detection algorithms, our app
            provides users with real-time pose analysis, enabling them to deepen
            their yoga practice anywhere, anytime."
          </span>
        </div>
        <div className="missionimg">
          <img src={image} alt="" />
        </div>
      </div>

      <div className="techstackmain">
        <div className="techstacktext"> TECH STACK</div>
        <div className="techstackicons">
          <div className="iconsdiv">
            {/* <StackIcon className="icon" name="reactjs" />
            <StackIcon className="icon" name="nodejs" />
            <StackIcon className="icon" name="html5" />
            <StackIcon className="icon" name="css3" />
            <StackIcon className="icon" name="materialui" />
            <StackIcon className="icon" name="mongodb" />
            <StackIcon className="icon" name="python" /> */}
          </div>
        </div>
      </div>

      <div className="teammain">
        <div className="techstacktext">TEAM</div>
        <div>
          <div className="teaminfomain">
            <div className="teaminfo" id="hello">
              <img src={sessions} alt="" />
              <div className="teaminfoname">AMEY PARLE</div>
              <div className="teaminfolinks">
                <div className="infoiconcircle">
                  <AiFillGithub className="infoicon" />
                </div>
                <div className="infoiconcircle">
                  <BiLogoLinkedin className="infoicon" />
                </div>

                <div className="infoiconcircle">
                  <BsInstagram className="infoicon" />
                </div>
                <div className="infoiconcircle">
                  <BiLogoGmail className="infoicon" />
                </div>
              </div>
            </div>

            <div className="teaminfo" id="hello">
              <img src={sessions} alt="" />
              <div className="teaminfoname">RUGVED SHINDE</div>
              <div className="teaminfolinks">
                <div className="infoiconcircle">
                  <AiFillGithub className="infoicon" />
                </div>
                <div className="infoiconcircle">
                  <BiLogoLinkedin className="infoicon" />
                </div>

                <div className="infoiconcircle">
                  <BsInstagram className="infoicon" />
                </div>
                <div className="infoiconcircle">
                  <BiLogoGmail className="infoicon" />
                </div>
              </div>
            </div>

            <div className="teaminfo" id="hello">
              <img src={sessions} alt="" />
              <div className="teaminfoname">RAHUL CHOUGULE</div>
              <div className="teaminfolinks">
                <div className="infoiconcircle">
                  <AiFillGithub className="infoicon" />
                </div>
                <div className="infoiconcircle">
                  <BiLogoLinkedin className="infoicon" />
                </div>

                <div className="infoiconcircle">
                  <BsInstagram className="infoicon" />
                </div>
                <div className="infoiconcircle">
                  <BiLogoGmail className="infoicon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="footerlogo">YogaWise</div>
        <div className="footertext">created by : </div>
        <a href="/about">Rugved Shinde</a>
        <a href="/about">Rahul Chougule</a>
        <a href="/about">Amey Parle</a>
      </footer>
    </div>
  );
}

export default About
