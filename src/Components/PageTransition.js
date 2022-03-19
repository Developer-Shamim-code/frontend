import React, { useEffect, useState } from 'react'
import $ from 'jquery'
// CSS
import '../assets/css/page-transition.css'

export default function PageTransition() {
  const [pageTransition, setPageTransition] = useState(true);

  useEffect(() => {
    $('.main_nav').css('opacity', 0);
    setTimeout(() => {
      setPageTransition(true)
    }, 200)
    setTimeout(() => {
      setPageTransition(false)
      $('.main_nav').css('opacity', 1);
    }, 500)
    setTimeout(() => {
      setPageTransition('hide')
    }, 1000)
  }, [])
  return (
    <div className={pageTransition === 'hide'? '' : pageTransition? 'page_transition active' : 'page_transition'}></div>
  )
}
