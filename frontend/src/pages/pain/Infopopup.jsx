import React from 'react'
import { BsInfoCircle } from "react-icons/bs";
import { poseInstructions } from "../../utils/data";
import { useState } from 'react';

const Infopopup = ({currentpose}) => {
    const [instructions, setinstructions] = useState(poseInstructions);
   const myFunction = () => {
     var popup = document.getElementById("myPopup");
     popup.classList.toggle("show");
   };

   return (
     <div className="popup" onClick={myFunction}>
       <BsInfoCircle />
       <span className="popuptext" id="myPopup">
        {instructions[currentpose]}
       </span>
     </div>
   );
}

export default Infopopup
