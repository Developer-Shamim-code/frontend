import React, {useEffect,useState} from 'react'
import AOS from 'aos'
// Components 
import PageTransition from '../Components/PageTransition';
// CSS
import '../assets/css/imprint.css'
import axios from 'axios';
export default function Imprint() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
    document.documentElement.scrollTop = 0;
  }, [])


  const [pagedetails,setPagedetails] = useState(null);
  useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/frontend-page/${'imprint'}`)
      .then((res)=>{
        setPagedetails(res.data.data);
      })  
      .catch((error)=>{
        console.log(error);
      });
  },[pagedetails]);

var titlelength=pagedetails && pagedetails.title.length/2-1;
  return (
    <div className='imprint_page'>
      <PageTransition />
      <div className='container'>
        <div data-aos='fade-up'   style={{ display:"block",textAlign:"left" }}>
          
                      <div className='page_title' data-aos='fade-up'>  {pagedetails !==null ? pagedetails.title && pagedetails.title:''} </div>;
                     
          
          </div>
        <div className='content'>
          
          <div dangerouslySetInnerHTML={{ __html: pagedetails !==null ? pagedetails.content:'' }} />
          
        </div>
      </div>
    </div>
  )
}
