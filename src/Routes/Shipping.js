import React, {useEffect,useState} from 'react'
import AOS from 'aos'
//  import {Backendurl} from '../Components/Backendurl';
// Components 
import PageTransition from './../Components/PageTransition';
// CSS
import '../assets/css/about-shipping.css'
import axios from 'axios';

 


export default function Shipping() {
  const [pagedetails,setPagedetails] = useState(null);
  useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/frontend-page/${'shipping'}`)
      .then((res)=>{
        setPagedetails(res.data.data);
      })  
      .catch((error)=>{
        console.log(error);
      });
  },[pagedetails]);
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
    document.documentElement.scrollTop = 0;
  }, [])
  var titlelength=pagedetails && pagedetails.title.length/2-1;
  return (
    <div className='about_shipping_page'>
      <PageTransition />
      <div className='container'>
        <div   style={{ display:"block",textAlign:"left" }}>

          <div data-aos='fade-up' style={{ 
                fontFamily: "Curricular Std",
                fontSize: "70px",
                lineHeight: "89px",
                position: "relative",
                display: "inline-block",
                zIndex: "10 !important"
           }} className="page_title">
                { pagedetails && pagedetails.title!==null? pagedetails.title:'' }
          </div>

        
        
        </div>
        <div className='content'>
        <div dangerouslySetInnerHTML={{ __html: pagedetails !==null ? pagedetails.content:'' }} /> 

        </div>
      </div>
    </div>
  )
}