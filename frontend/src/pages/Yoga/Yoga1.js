import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import React, { useRef, useState, useEffect } from 'react'
import backend from '@tensorflow/tfjs-backend-webgl'
import Webcam from 'react-webcam'
import { count } from '../../utils/music';

import Instructions from '../../components/Instrctions/Instructions';

import './Yoga.css'

import DropDown from '../../components/DropDown/DropDown';
import { poseImages } from '../../utils/pose_images';
import { POINTS, keypointConnections } from '../../utils/data';
import { drawPoint, drawSegment } from '../../utils/helper'



let skeletonColor = 'rgb(255,255,255)'
let poseList = [
    'Tree', 'Chair', 'Cobra', 'Warrior',
    'Shoulderstand', 'HalfMoonPose', 'Crescent'
]

let interval

// flag variable is used to help capture the time when AI just detect 
// the pose as correct(probability more than threshold)
let flag = false


function Yoga() {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)


  const [startingTime, setStartingTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [poseTime, setPoseTime] = useState(0)
  const [bestPerform, setBestPerform] = useState(0)
  const [currentPose, setCurrentPose] = useState('Tree')
  const [isStartPose, setIsStartPose] = useState(false)


  useEffect(() => {
    const timeDiff = (currentTime - startingTime) / 1000
    if (flag) {
      setPoseTime(timeDiff)
    }
    if ((currentTime - startingTime) / 1000 > bestPerform) {
      setBestPerform(timeDiff)
    }
  }, [currentTime])


  useEffect(() => {
    setCurrentTime(0)
    setPoseTime(0)
    setBestPerform(0)
  }, [currentPose])

  const CLASS_NO = {
    Chair: 0,
    Cobra: 1,
    HalfMoonPose:1,
    Crescent:0,
    Shoulderstand: 4,
    Traingle: 5,
    Tree: 6,
    Warrior: 7,
  }

  function get_center_point(landmarks, left_bodypart, right_bodypart) {
    let left = tf.gather(landmarks, left_bodypart, 1)
    let right = tf.gather(landmarks, right_bodypart, 1)
    const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5))
    return center

  }

  function get_pose_size(landmarks, torso_size_multiplier = 2.5) {
    let hips_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
    let shoulders_center = get_center_point(landmarks, POINTS.LEFT_SHOULDER, POINTS.RIGHT_SHOULDER)
    let torso_size = tf.norm(tf.sub(shoulders_center, hips_center))
    let pose_center_new = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
    pose_center_new = tf.expandDims(pose_center_new, 1)

    pose_center_new = tf.broadcastTo(pose_center_new,
      [1, 17, 2]
    )
    // return: shape(17,2)
    let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0)
    let max_dist = tf.max(tf.norm(d, 'euclidean', 0))

    // normalize scale
    let pose_size = tf.maximum(tf.mul(torso_size, torso_size_multiplier), max_dist)
    return pose_size
  }

  function normalize_pose_landmarks(landmarks) {
    let pose_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
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
    let embedding = tf.reshape(landmarks, [1, 34])
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
    const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER };
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    const poseClassifier = await tf.loadLayersModel('https://models.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json')
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
      const ctx = canvasRef.current.getContext('2d')
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      try {
        const keypoints = pose[0].keypoints
        let input = keypoints.map((keypoint) => {
          if (keypoint.score > 0.4) {
            if (!(keypoint.name === 'left_eye' || keypoint.name === 'right_eye')) {
              drawPoint(ctx, keypoint.x, keypoint.y, 8, 'rgb(255,255,255)')
              let connections = keypointConnections[keypoint.name]
              try {
                connections.forEach((connection) => {
                  let conName = connection.toUpperCase()
                  drawSegment(ctx, [keypoint.x, keypoint.y],
                    [keypoints[POINTS[conName]].x,
                    keypoints[POINTS[conName]].y]
                    , skeletonColor)
                })
              } catch (err) {

              }

            }
          } else {
            notDetected += 1
          }
          return [keypoint.x, keypoint.y]
        })
        if (notDetected > 4) {
          skeletonColor = 'rgb(255,255,255)'
          return
        }
        const processedInput = landmarks_to_embedding(input)
        const classification = poseClassifier.predict(processedInput)
        //console.log(classification);

        classification.array().then((data) => {
          const classNo = CLASS_NO[currentPose]
          console.log(data[0])
          if (data[0][classNo] > 0.97) {

            if (!flag) {
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
      } catch (err) {
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

        const leftHip = input[POINTS.LEFT_HIP];
        const leftKnee = input[POINTS.LEFT_ELBOW];
        const leftAnkle = input[POINTS.LEFT_ANKLE];

        const rightHip = input[POINTS.RIGHT_HIP];
        const rightKnee = input[POINTS.RIGHT_ELBOW];
        const rightAnkle = input[POINTS.RIGHT_ANKLE];
    
        const angle = calculateAngle(leftWrist, leftElbow, leftShoulder);
        const angle2 = calculateAngle(rightWrist, rightElbow, rightShoulder);
        const angle3 = calculateAngle(leftAnkle, leftKnee, leftHip);
        const angle4 = calculateAngle(rightAnkle, rightKnee, rightHip);
        // Display the 3D angle on the lower left corner
        const angleDisplay1 = document.getElementById('angle-display');
        const angleDisplay2 = document.getElementById('angle-display2');
        const angleDisplay3 = document.getElementById('angle-display3');
        const angleDisplay4 = document.getElementById('angle-display4');
        angleDisplay1.innerText = `${angle.toFixed(2)} degrees`;
        angleDisplay2.innerText = `${angle2.toFixed(2)} degrees`;
        // angleDisplay3.innerText = `LE1: ${angle3.toFixed(2)} degrees`;
        // angleDisplay4.innerText = `RE2: ${angle4.toFixed(2)} degrees`;
      } catch (err) {
        console.log(err);
      }
    }
  }

  function startYoga() {
    setIsStartPose(true)
    runMovenet()
  }

  function stopPose() {
    setIsStartPose(false)
    clearInterval(interval)
  }



  if (isStartPose) {
    return (
      <div className="yoga-container">
        <div className="performance-container">
          <div className="pose-performance">
            <h4>Pose Time: 32 s</h4>
          </div>
          <div className="pose-performance">
            <h4>Best: 45 s</h4>
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
              style={{top:100}}
            />
          </div>


          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="angle-display card p-3" style={{width:200, top: 100, left:40}}>
                  <h5 className="card-title">Left Elbow</h5>
                  <p className="card-text" id="angle-display">0.00 degrees</p>
                  <h5 className="card-title">Right Elbow</h5>
                  <p className="card-text" id="angle-display2">0.00 degrees</p>
                  <h5 className="card-title">Left Knee</h5>
                  <p className="card-text" id="angle-display3">42.25 degrees</p>
                  <h5 className="card-title">Right Knee</h5>
                  <p className="card-text" id="angle-display4">178.22 degrees</p>
                </div>
              </div>
              <div className="col-md-6">
                {/* Your existing Yoga.js content */}
              </div>
            </div>
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