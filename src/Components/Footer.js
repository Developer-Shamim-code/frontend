
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// CSS
import '../assets/css/footer.css'
// Images
import BrandingWhite from '../assets/images/branding-white.svg'
import FooterBranding from '../assets/images/footer-branding.svg'

export default function Footer({footer_logo,website_name,site_name}) {
  const [footerLogo, setFooterLogo] = useState(1)

  useEffect(() => {
    if(window.matchMedia("(max-width: 780px)").matches){
      setFooterLogo(2)
    }
    else{
      setFooterLogo(1)
    }
  }, [])
   
  return (
    <footer>
      <div className="container d_flex">
        <div className='branding'>
          {/* <img src={footerLogo === 1? FooterBranding : BrandingWhite} alt="logo" /> */}
          {footer_logo !==null ? <img src={footer_logo} />:<img src='' alt='logo' />}
        </div>
        <div className='links_container'>
          <ul className='links'>
            <div className='title'>Information</div>
            <li><Link to='/shipping'>Versand</Link></li>
            <li><Link to='/payment'>Zahlung</Link></li>
          </ul>
          <ul className='links'>
            <div className='title'>Rechtliches</div>
            <li><Link to='/imprint'>Impressum</Link></li>
            <li><Link to='/terms'>AGB’s</Link></li>
            <li><Link to='/privacy'>Datenschutz</Link></li>
          </ul>
          <ul className='links'>
            <div className='title'>Inhalt</div>
            <li><Link to='/archiv'>Archiv</Link></li>
            <li><Link to='/about'>Über uns</Link></li>
            <li><Link to='/blogs'>Blog</Link></li>
            <li><Link to='/contact'>Kontakt</Link></li>
          </ul>
        </div>
      </div>
      <div className='container copyright'>
        <div className='copyright_text'>© 2022 {site_name}</div>
        <div className='credit'>Website by <a href={website_name}>{website_name}</a></div>
      </div>
    </footer>
  )
}
