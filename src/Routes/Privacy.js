import React, {useEffect,useState} from 'react'
import AOS from 'aos'
// Components 
import PageTransition from '../Components/PageTransition';
// CSS
import '../assets/css/privacy-policy.css'
import axios from 'axios';

export default function PrivacyPolicy() {
 
    const [pagedetails,setPagedetails] = useState(null);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/frontend-page/${'privacy'}`)
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
    <div className='privacy_policy_page'>
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
           }}>
                {pagedetails !==null ? pagedetails.title.split("").map((title,index)=>{
                    if(titlelength >= index){
                        return title;
                    }
                }):''}
          </div>

          {pagedetails !==null ? pagedetails.title.split("").map((title,index)=>{
                    if(titlelength < index){
                        return <div className='page_title' data-aos='fade-up'>{title}</div>;
                    }
            }):''}
          </div>
        <div className='content'>
          
              <div dangerouslySetInnerHTML={{ __html: pagedetails !==null ? pagedetails.content:'' }}  />

        </div>
      </div>
    </div>
  )
}
