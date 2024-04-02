import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import React, { useRef, useState, useEffect } from 'react'
import backend from '@tensorflow/tfjs-backend-webgl'
import Webcam from 'react-webcam'
import { count } from '../../utils/music'; 
 
import Instructions from '../../components/Instrctions/Instructions';

//import wtf from '../temp/'

import './Yoga.css'
 
import DropDown from '../../components/DropDown/DropDown';
import { poseImages } from '../../utils/pose_images';
import { POINTS, keypointConnections } from '../../utils/data';
import { drawPoint, drawSegment } from '../../utils/helper'



let skeletonColor = 'rgb(255,255,255)'


let interval

// flag variable is used to help capture the time when AI just detect 
// the pose as correct(probability more than threshold)
let flag = false


function Yoga({currPose}) {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)


  const [startingTime, setStartingTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [poseTime, setPoseTime] = useState(0)
  const [bestPerform, setBestPerform] = useState(0)
  const [currentPose, setCurrentPose] = useState('Tree')
  const [currentType, setCurrentType] = useState('BackPain')
  const [isStartPose, setIsStartPose] = useState(false)

  let poseList
let BackPain = [
  "Tree",
 "Crescent",
 "Sphinx",
]

let NeckShoulderPain = [
  "Triangle",
  "Camel",
  "Sphinx",
]


let KneePain = [
  "Camel",
  "Warrior",
  "Chair",
]
let typeList = [
  'BackPain', 'NeckShoulderPain', 'KneePain']

if(currentType==='BackPain'){
  poseList = BackPain
}
else if(currentType==='NeckShoulderPain'){
  poseList = NeckShoulderPain
}
else if(currentType==='KneePain'){
  poseList = KneePain
}

  
  useEffect(() => {
    const timeDiff = (currentTime - startingTime)/1000
    if(flag) {
      setPoseTime(timeDiff)
    }
    if((currentTime - startingTime)/1000 > bestPerform) {
      setBestPerform(timeDiff)
    }

    // Check if the pose time has stopped updating for a certain duration
  const poseTimeStopped = setTimeout(() => {
    if (poseTime === timeDiff) {
      console.log("Pose time stopped counting");
      // Add your console log or any other action you want to perform
    }
  }, 5000); // 5000 milliseconds (adjust as needed)

  // Clear the timeout on component unmount or when pose time updates
  return () => clearTimeout(poseTimeStopped);

  }, [currentTime])


  useEffect(() => {
    setCurrentTime(0)
    setPoseTime(0)
    console.log("Time set to zero")
    setBestPerform(0)
  }, [currentPose, poseTime, startingTime, bestPerform]);

  const CLASS_NO = {
    Crescent:0,
    'half moon pose':1,
    'bound angle pose':2,
     Chair:3,
     Cobra:4,
    'dog':5,
    'garland pose':6,
    'no pose':7,
     Sphinx:8,
    'shoulder_stand':9,
     Triangle:10,
     Tree:11,
     Camel:12,
     ExtendedPuppy:13,
     Warrior:14,

  }

  function calc_CenterPoint(landmarks, left_bodypart, right_bodypart) {
    let left = tf.gather(landmarks, left_bodypart, 1)
    let right = tf.gather(landmarks, right_bodypart, 1)
    const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5))
    return center
    
  }

  function get_pose_size(landmarks, torso_size_multiplier=2.5) {
    let hips_center = calc_CenterPoint(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
    let shoulders_center = calc_CenterPoint(landmarks,POINTS.LEFT_SHOULDER, POINTS.RIGHT_SHOULDER)
    let torso_size = tf.norm(tf.sub(shoulders_center, hips_center))
    let pose_center_new = calc_CenterPoint(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
    pose_center_new = tf.expandDims(pose_center_new, 1)

    pose_center_new = tf.broadcastTo(pose_center_new,
        [1, 17, 2]
      )
      // return: shape(17,2)
    let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0)
    let max_dist = tf.max(tf.norm(d,'euclidean', 0))

    // normalize scale
    let pose_size = tf.maximum(tf.mul(torso_size, torso_size_multiplier), max_dist)
    return pose_size
  }

  function normalize_pose_landmarks(landmarks) {
    let pose_center = calc_CenterPoint(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
    pose_center = tf.expandDims(pose_center, 1)
    pose_center = tf.broadcastTo(pose_center, 
        [1, 17, 2]
      )
    landmarks = tf.sub(landmarks, pose_center)

    let pose_size = get_pose_size(landmarks)
    landmarks = tf.div(landmarks, pose_size)
    return landmarks
  }

  function landmarks_to_embedding(landmarks) {
    // normalize landmarks 2D
    landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0))
    let embedding = tf.reshape(landmarks, [1,34])
    return embedding
  }

  function calculateAngle(point1, point2, point3) {
    const vector1 = [point1[0] - point2[0], point1[1] - point2[1], point1[2] - point2[2]];
    const vector2 = [point3[0] - point2[0], point3[1] - point2[1], point3[2] - point2[2]];
  
    const dotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1] + vector1[2] * vector2[2];
    const magnitude1 = Math.sqrt(vector1[0] ** 2 + vector1[1] ** 2 + vector1[2] ** 2);
    const magnitude2 = Math.sqrt(vector2[0] ** 2 + vector2[1] ** 2 + vector2[2] ** 2);
  
    const cosineTheta = dotProduct / (magnitude1 * magnitude2);
    const angleInRadians = Math.acos(cosineTheta);
  
    // Convert radians to degrees
    const angleInDegrees = (angleInRadians * 180) / Math.PI;
  
    return angleInDegrees;
  }

  const runMovenet = async () => {
    const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER};
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    const poseClassifier = await  tf.loadLayersModel('http://localhost:5000/model')
    // const response = await fetch('http://localhost:5000/model');
    //   console.log(response);

  //   let poseClassifier=0;
  //   fetch('http://localhost:5000/model')
  // .then(response => response.json())
  // .then(async (data) => {
  //   poseClassifier = await tf.loadLayersModel(data)
  //   console.log(poseClassifier);
  //   const countAudio = new Audio(count)
  //   countAudio.loop = true
  //   interval = setInterval(() => { 
  //       detectPose(detector, poseClassifier, countAudio)
  //   }, 100)
  // })
  // .catch(error => console.error(error));
    
  console.log(typeof poseClassifier);
    const countAudio = new Audio(count)
    countAudio.loop = true
    interval = setInterval(() => { 
        detectPose(detector, poseClassifier, countAudio)
    }, 100)
    
  }

  const detectPose = async (detector, poseClassifier, countAudio) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      let notDetected = 0 
      const video = webcamRef.current.video
      const pose = await detector.estimatePoses(video)
      console.log(pose)
      const ctx = canvasRef.current.getContext('2d')
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      try {
        const keypoints = pose[0].keypoints 
        console.log('201')
        let input = keypoints.map((keypoint) => {
          if(keypoint.score > 0.4) {
            if(!(keypoint.name === 'left_eye' || keypoint.name === 'right_eye')) {
              drawPoint(ctx, keypoint.x, keypoint.y, 8, 'rgb(255,255,255)')
              let connections = keypointConnections[keypoint.name]
              console.log('207')
              console.log(connections)
              try {
                connections.forEach((connection) => {
                  let conName = connection.toUpperCase()
                  drawSegment(ctx, [keypoint.x, keypoint.y],
                      [keypoints[POINTS[conName]].x,
                       keypoints[POINTS[conName]].y]
                  , skeletonColor)
                })
              } catch(err) {

              }
              
            }
          } else {
            notDetected += 1
          } 
          return [keypoint.x, keypoint.y]
        }) 
        if(notDetected > 4) {
          skeletonColor = 'rgb(255,255,255)'
          return
        }
        console.log('process')
        const processedInput = landmarks_to_embedding(input)
        const classification = poseClassifier.predict(processedInput)
        console.log('classifications: '+classification)

        classification.array().then((data) => {  
          console.log(data)       
          const classNo = CLASS_NO[currentPose]
          console.log(data[0][classNo])
          if(data[0][classNo] > 0.97) {
            
            if(!flag) {
              countAudio.play()
              setStartingTime(new Date(Date()).getTime())
              flag = true
            }
            setCurrentTime(new Date(Date()).getTime()) 
            skeletonColor = 'rgb(0,255,0)'
          } else {
            flag = false
            skeletonColor = 'rgb(255,255,255)'
            countAudio.pause()
            countAudio.currentTime = 0
          }
        })
      } catch(err) {
        console.log(err)
      }
      
       try {
        const keypoints = pose[0].keypoints;
        let input = keypoints.map((keypoint) => {
          // ... existing code ...
          return [keypoint.x, keypoint.y, keypoint.z || 0]; // Use z if available, otherwise default to 0
        });
    
        // Calculate the 3D angle between right_wrist, right_elbow, and right_shoulder
        const rightWrist = input[POINTS.RIGHT_WRIST];
        const rightElbow = input[POINTS.RIGHT_ELBOW];
        const rightShoulder = input[POINTS.RIGHT_SHOULDER];

        const leftWrist = input[POINTS.LEFT_WRIST];
        const leftElbow = input[POINTS.LEFT_ELBOW];
        const leftShoulder = input[POINTS.LEFT_SHOULDER];
    
        const angle = calculateAngle(leftWrist, leftElbow, leftShoulder);
        const angle2 = calculateAngle(rightWrist, rightElbow, rightShoulder);
        // Display the 3D angle on the lower left corner
        const angleDisplay1 = document.getElementById('angle-display');
        const angleDisplay2 = document.getElementById('angle-display2');
        angleDisplay1.innerText = `LE: ${angle.toFixed(2)} degrees`;
        angleDisplay2.innerText = `RE: ${angle2.toFixed(2)} degrees`;
      } catch (err) {
        console.log(err);
      }
      
    }
  }

  function startYoga(){
    setIsStartPose(true) 
    runMovenet()
  } 

  function stopPose() {
    setIsStartPose(false)
    clearInterval(interval)
  }

    

  if(isStartPose) {
    return (
      <div className="yoga-container" style={{height:300}}>
        <div className="performance-container">
            <div className="pose-performance">
              <h4>Pose Time: {poseTime} s</h4>
            </div>
            <div className="pose-performance">
              <h4>Best: {bestPerform} s</h4>
            </div>
          </div>
        <div>
          
          <Webcam 
          width='640px'
          height='480px'
          id="webcam"
          ref={webcamRef}
          style={{
            position: 'absolute',
            left: 120,
            top: 100,
            padding: '0px',
          }}
        />
          <canvas
            ref={canvasRef}
            id="my-canvas"
            width='640px'
            height='480px'
            style={{
              position: 'absolute',
              left: 120,
              top: 100,
              zIndex: 1
            }}
          >
          </canvas>
        <div>
            <img 
              src={poseImages[currentPose]}
              className="pose-img"
            />
          </div>
         
        </div>
        <button
          onClick={stopPose}
          className="secondary-btn"    
        >Stop Pose</button>
      </div>
    )
  }

  return (
    <div
      className="yoga-container"
    >

<div
        className='dropdown dropdown-container'
         
      >
        <button 
            className="btn btn-secondary dropdown-toggle"
            type='button'
            data-bs-toggle="dropdown"
            id="pose-dropdown-btn"
            aria-expanded="false"
        >{currentType}
        </button>
        <ul class="dropdown-menu dropdown-custom-menu" aria-labelledby="dropdownMenuButton1">
            {typeList.map((pose) => (
                <li onClick={() => setCurrentType(pose)}>
                    <div class="dropdown-item-container">
                        <p className="dropdown-item-1">{pose}</p>
                        {/* <img 
                            src={poseImages[pose]}
                            className="dropdown-img"
                        /> */}
                        
                    </div>
                </li>
            ))}
            
        </ul>
              
          
      </div>

      <DropDown
        poseList={poseList}
        currentPose={currentPose}
        setCurrentPose={setCurrentPose}
      />
      <Instructions
          currentPose={currentPose}
        />
      <button
          onClick={startYoga}
          className="secondary-btn"    
        >Start Pose</button>
    </div>
  )
}

export default Yoga