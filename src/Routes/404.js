import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Components
import PageTransition from '../Components/PageTransition';
import ArrowIcon from '../Components/ArrrowIcon';
// CSS
import '../assets/css/404.css'

export default function NotFound() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className='not_found_page'>
      <PageTransition />
      
      <div className='container'>
        <div className='card'>
          <h2>404</h2>
          <p>Seite nicht gefunden</p>
          <Link to='/' className='btn_primary bg icon'>zur Starseite <ArrowIcon /></Link>
        </div>
      </div>
    </div>
  )
}
