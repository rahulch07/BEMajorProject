import React, { useState, useEffect } from 'react';
import { Grid, Typography, Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import explorevid from "../../utils/videos/explore2.mp4";
import benefitvid from "../../utils/videos/benefits.mp4";
import '../explore/explore.css'; // Import the CSS file

function App() {
  const [selectedTile, setSelectedTile] = useState(null);
  const tiles = [
    {
      id: 0,
      img: `url('https://upload.wikimedia.org/wikipedia/commons/b/b6/Ustrasana_Yoga-Asana_Nina-Mel.jpg')`,
      text: 'Camel Pose',
      popupImg: 'https://www.verywellfit.com/thmb/laBHBTxItMaAl80ZbK6edfnmtxg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Verywell-14-3566690-CamelPose01-837-598cbfbe845b3400106f10ee.gif',
      alt: 'Camel Pose GIF',
      instructions: ['Stand on your knees at the front of the mat.', 
      ' Place your fingertips at the spine’s base.', 
      ' Look up and back, slowly leaning backward.', 
      ' Reach for your heels.', 
      ' Breathe.', 
      ' Exit the pose.']
    },
    {
      id: 1,
      img: `url('https://www.yogaclassplan.com/wp-content/uploads/2021/01/34-treepose.jpg')`,
      text: 'Tree Pose',
      popupImg: 'https://i.pinimg.com/originals/bd/e1/aa/bde1aa43224edbc15fcaed511347e98b.gif',
      instructions: [
        'Get into position. Tree pose often starts from mountain pose (or Tadasana), with both feet planted firmly on the ground and your weight adequately distributed so that you are balanced.',
        'Bend one leg at the knee. Choose the leg you are going to fold in first. If your left leg is your standing leg, keep your left foot planted on the ground, and slowly bend in your right leg at the right knee so that the sole of your right foot rests against your left inner thigh (known as the half-lotus position in Bikram yoga). Point the knee of your bent leg outward, away from your body.',
        'Lengthen your body. Clasp your hands together in Anjali Mudra (also called the “prayer position”)',
        'Hold and repeat. Hold the pose for as long as necessary, making sure to breathe properly. When you’re ready to switch legs, exhale, and return to mountain pose to start again.'
        ]
    },
    {
      id: 2,
      img: `url('https://pocketyoga.com/assets/images/full/HalfMoon_R.png')`,
      text: 'Half Moon Pose',
      popupImg: 'https://i.makeagif.com/media/6-09-2015/PgyqwN.gif',
      instructions: ['Start in Triangle Pose with your right leg towards the top of your mat in a straightened position and your left foot parallel-ish to the back of your mat. Keep your torso long as possible and press the crown of your head towards the front of your mat. Bring your right hand to your shin or a block placed just outside your right foot and lift your left arm towards the ceiling. The higher you keep your right hand on your shin, the easier the transition.',

        'Begin to bend into your right knee while keeping your hand on your right shin, kind of like a super squishy Extended Side Angle. Once you can\'t bend into your right knee any further, begin to lift your left leg by pressing your left heel towards the back of your mat and pulling up from your left glute. Either keep your right hand on your right shin for an extra challenge to your balance or bring it to the mat in front of your right foot.']
    },
    {
      id: 3,
      img: `url('https://www.yogaclassplan.com/wp-content/uploads/2021/06/27-boundangle.jpg')`,
      text: 'Bound Angle Pose',
      popupImg: 'https://media.post.rvohealth.io/wp-content/uploads/sites/2/2020/08/Bound-Angle-Pose.gif',
      instructions: ['Begin in Staff Pose. Sit directly on top of your sitting bones, rather than behind them.',
     'Bend your knees and allow them to fall open to the sides.',
     'Draw the soles of your feet together and use your hands to open them as if you were opening the pages of a book.',
      'Press your shoulder blades against your upper back to lift through your sternum or chest. Clasp your ankles to help you find lift along your torso.',
      'To exit the pose, gently release your feet and come back to Staff Pose.']
    },
    {
      id: 4,
      img: `url('https://www.yogaclassplan.com/wp-content/uploads/2021/01/31-warrior-2.jpg')`,
      text: 'Warrior III Pose',
      popupImg: 'https://i.makeagif.com/media/6-09-2015/Z74jl2.gif',
      instructions: ['Stand with your feet at the top of your mat, about hips-width distance apart.',
      'Inhale, extend your arms to the ceiling.',
      'Begin to balance on your right leg.',
      'Ground down through your right foot.',
      'Exhale, begin to hinge forward with your upper body.',
      'Lift and kick your left leg out behind you.',
      'Find core engagement to aid in your balance.',
      'Keep your left foot flexed.',
      'Square your hips and upper body down to your mat.',
      'Wrap your biceps in towards your face.',
      'Direct your gaze towards the floor.',
      'To release, return slowly to standing and then repeat on the other side']
    },
    {
      id: 5,
      img: `url('https://www.yogaclassplan.com/wp-content/uploads/2021/06/Bhujangasana-Cobra-Pose.png')`,
      text: 'Cobra Pose',
      popupImg: 'https://i.makeagif.com/media/11-10-2016/7BOUe6.gif',
      instructions: ['Lie down in a prone position.',
    'Bring your hands underneath the shoulder blades.',
    'Begin to lift your upper body.',
    'Use lower back muscles to lift higher.',
    'Look slightly forward and up.',
    'Lower down gently.'
    ]
    },
    {
      id: 6,
      img: `url('https://www.yogaclassplan.com/wp-content/uploads/2021/06/10-garland-pose.jpg')`,
      text: 'Garland Pose',
      popupImg: 'https://www.verywellfit.com/thmb/CPD5pOBPhRzq-ohK3MaW5Akoqbc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Verywell-4-3567193-GarlandPose02-661-598b666103f4020010b46e15.gif',
      instructions: ['Stand at the front of your yoga mat with your feet a bit wider than your hips.',
      'Turn your toes out about 45 degrees.',
      'Bend your knees and lower your butt as close to the floor as possible.',
      'Once you are in a position you can sustain, let your butt sink toward the floor and lift your chest.',
      'Take your elbows to the insides of your knees. Bring your hands to Anjali Mudra at your heart. You can apply a little pressure with your elbows to widen the knees.',
      'Stay here for five to ten cycles of breath.',
      'Straighten your legs to come out.']
    },
    {
      id: 7,
      img: `url('https://pocketyoga.com/assets/images/full/Chair.png')`,
      text: 'Chair Pose',
      popupImg: 'https://i.pinimg.com/originals/fc/d7/3a/fcd73a9414aa11e1cff2052b69e9383e.gif',
      instructions:  ['Starting in Mountain pose / Tadasana.',
      'Exhale as you bend your knees and move your hips back as if you were sitting down on a chair. Draw your lower abdomen in and up to support your lower back.',
      'Send your hips back rather than your knees forward, so that you can still see your toes.',
      'Inhale as you raise your arms up around your ears and soften your shoulders.',
      'Keep reaching higher, while sitting lower for 5 to 10 breaths.',
      'To come back into in Tadasana, exhale, as you press your feet down to straighten your legs and then bring your arms down to your sides.']
 
    },
    {
      id: 8,
      img: `url('https://www.yogaclassplan.com/wp-content/uploads/2021/06/extended-puppy-pose.png')`,
      text: 'Extended Puppy Pose',
      popupImg: 'https://64.media.tumblr.com/efcfaa0693ad32f0073514e3ef5d6be5/tumblr_mij8km1N0O1rysr6eo1_400.gif',
      instructions:  ['Come on all fours like a tabletop position with your shoulders over your wrists, your hips over your knees and the top of your feet on the mat.',
      'Now, slowly walk your hands in front of you, lowering your chest to the ground. There should be a shoulder-width space between your hips and knees, lowering your forehead to the ground.',
      'Press into the palms of your hands and elevate your elbows and forearms away from the ground to activate your arms. Draw your shoulder blades together behind your back and raise your hips to the ceiling.',
      'Relax your neck and inhale deeply into your back, stretching your spine in both directions.',
      'Stay in the pose for 5-10 breaths, and gently lift your forehead and walk your palms back towards your body to come to the initial position.']
    },
    {
      id: 9,
      img: `url('https://pocketyoga.com/assets/images/full/ShoulderstandSupportedHalf.png')`,
      text: 'ShoulderStand Pose',
      popupImg: 'https://media.post.rvohealth.io/wp-content/uploads/sites/2/2021/03/400x400_Can_Yoga_Make_Your_Skin_Glow_Shoulder_Stand.gif',
      instructions: ['Lay down on your yoga mat, aligning your body with the blankets as suggested above. With legs bent and feet on the floor (as if setting up for Bridge pose), begin to walk your shoulders underneath your upper back, feeling the chest rise gently.',
      'Lift your hips off the mat coming into Bridge pose and extend your arms onto the ground, palms facing down as if your hands could touch your heels.',
      'Press firmly into the palms, using them as leverage to lift onto the balls of the feet and extend one leg up.',
      'Bend at the elbows, place your hands on your low back (creating a shelf), then extend the next leg up. Once you raise the legs, don\'t turn your head to the side to look around the room as this can injure your neck. Instead, keep your gaze upward and your neck straight.',
      'Lift up through the balls of your feet, walking your hands further up the back for more stability. Feel the chest reaching toward the chin to support opening the upper back.',
      'Move your hips toward the front of the room and your feet toward the back of the room to straighten the body. This helps you get into the correct alignment, which is the hips over the shoulders and feet over the hips. (If you don\'t use blankets or other supports, do not bring your body fully vertical).',
      'Stay in the pose for up to 10 breaths.',
      'Come out of Shoulderstand by bringing your feet back over your head to come through Plow pose, rolling out from Plow slowly.']
    },
    {
      id: 10,
      img: `url('https://www.verywellfit.com/thmb/5s04gMlB3FrowqFv1TT1UrSJzso=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Verywell-14-3566690-CrescentLunge-810-5c4b7d00c9e77c00014af99d.jpg')`,
      text: 'Crescent Pose',
      popupImg: 'https://media.istockphoto.com/id/1160627611/photo/woman-doing-hatha-yoga-asana-anjaneyasana-or-low-crescent-lunge-pose.jpg?s=612x612&w=0&k=20&c=cxzOCR5TqyDspWxgrmS8tXzrtu2swoz6qJ5D9VwYOMM=',
      instructions: ['From a low lunge, drop your back knee (the left knee, in this case) to the mat. If your knee is sensitive, you can place a blanket under your knee or double up your yoga mat for more cushioning.',
     'Bring your hands onto your right knee and your right knee directly over your right ankle.',
      'Inhale and raise your arms above your head, keeping the arms in line with your ears.',
      'To deepen into the lunge press firmly into your feet as you allow your hips to shift forward. As you do, your left thigh comes closer to the floor. To support engagement and to avoid sinking into the joints, hug your inner thighs in towards one another to create adduction.',
      'You may take the upper spine into a backbend if that feels comfortable.',
      'Exhale to release the hands down, reframe the front foot, and release the pose.',
      'Repeat on the left side.']
    }
  ];

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate opacity based on scroll position
  const opacity = Math.max(0, 1 - scrollPosition / 100); // Adjust the divisor to control the speed of the fade

  const handleTileClick = (tileId) => {
    setSelectedTile(tileId);
  };

  const handleClose = () => {
    setSelectedTile(null);
  };

  const [showExplore, setShowExplore] = useState(false);
  useEffect(() => {
    // Set showExplore to true after a short delay
    const timer = setTimeout(() => {
      setShowExplore(true);
    }, 500); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='exploremain'>
       <div>
        <video src={explorevid} autoPlay loop muted className="explorevid" style={{width:"100%",position:"absolute"}}></video>
       </div>
      <div className='exploregrid'>
        
        <div style={{ position: 'relative' }}>
        {/* YouTube video overlay */}
        <div>
          <div>
            {/* Fade-in effect for the "Explore" heading */}
            <div
              className="explore-heading"
            >
              Explore and Experience the world of Yoga
            </div>
          </div>
        </div>

        <Grid container spacing={2} className="tiles-container">
          {tiles.map((tile) => (
            <Grid item xs={3} key={tile.id} onClick={() => handleTileClick(tile.id)}>
              <div
                className="tile"
                style={{
                  backgroundImage: tile.img,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)' }} // Zoom in on hover
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }} // Reset scale on hover out
              >
                <div className="tile-caption">
                  <Typography variant="body1" className="tile-text">{tile.text}</Typography>
                </div>
              </div>
            </Grid>

          ))}


          <div>
          </div>
        </Grid>

        </div>
      </div>
          <div className='breathingmain' >
          <div className="breathing-section">
        <div className="breathing-content">
          <h1>BREATHING METHODS</h1>
          <h3>
            <span>Inhale with expansion, exhale with contraction</span> <br />
            <span>Flow gracefully with Vinyasa,</span> inhaling and exhaling through transitions. <br />
            <span>Maintain steady breath in static poses,</span> fostering strength and focus. <br />
            <span>Utilize breath as a meditative anchor,</span> enhancing awareness in every yoga practice.
          </h3>
        </div>
      </div>
          </div>
      

      {/* <div className="benefits-section">
          <video src={benefitvid} autoPlay loop muted className="benefitvid" style={{width:"50%",height:"50%"}}></video>
        

        <div className="benefits-content">
          <h1>BENEFITS OF YOGA</h1>
          <h3>
            <span>1. Improved flexibility and posture</span> <br />
            <span>2. Stress relief and relaxation</span> <br />
            <span>3. Increased strength and muscle tone</span> <br />
            <span>4. Enhanced mental clarity and focus</span>
          </h3>
        </div>
      </div> */}

      <div>
      {selectedTile !== null && ( // Conditionally render the modal if a tile is selected
  <Modal open={selectedTile !== null} className="tile-modal">
    <div className="modal-content">
      <div className="modal-text">
        <p className="headers" id='test'>{tiles[selectedTile].instructions}</p>
      </div>
      <div className="modal-gif">
        {(
          <img src={tiles[selectedTile].popupImg} />
        )}
        <h3>{tiles[selectedTile].text}</h3>
      </div>
      <CloseIcon onClick={handleClose} variant="contained" className="close-button">Close</CloseIcon>
    </div>
  </Modal>
)}
      </div>

    </div>

  );
}

export default App;
