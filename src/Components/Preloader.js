import React, { useEffect, useRef, useState } from 'react'
import lottie from 'lottie-web'
// CSS
import '../assets/css/preloader.css'
import axios from 'axios';
export default function Preloader() {

 
  
  const container = useRef(null)

  useEffect(() => {
    var anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: require('../assets/lottie/lottie.json')
    })

    anim.addEventListener("enterFrame", function (animation) {
      if (animation.currentTime > (anim.totalFrames - 1)) {
         anim.pause();
      }
    });
  }, [])

  
  return (
    <div className="preloader" id="preloader">
      <div className="lottie_container" ref={container}></div>
    </div>
  );
}
