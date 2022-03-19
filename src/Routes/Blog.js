import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import luxy from 'luxy.js';
import Moment from 'react-moment';
// Components 
import PageTransition from '../Components/PageTransition';
// CSS
import '../assets/css/blog.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Blog() {


  //blogpost details
    const {slug}=useParams();
    const [BlogDetails, setBlogDetails] = useState(null);
    const [banner, setBanner] = useState(null);
    const [description, setDescription] = useState(null);
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/blog-post/details/${slug}`)
      .then((res)=>{
        setBlogDetails(res.data.data['blogdetails']);
        setBanner(res.data.data['banner']);
        setDescription(res.data.data['description']);
      })
      .catch((error)=>{
          console.log(error);
      });
    },[slug]);
  //end blogpost details
   
  const [mediaQuery, setMediaQuery] = useState(window.matchMedia("(max-width: 900px)").matches);
  useEffect(() => {
    
    AOS.init({
      duration: 1000,
    })
    document.documentElement.scrollTop = 0;
  }, [])

  console.log(banner);
  return(


    <div className='blog_page'>
    <PageTransition />
    <ParallaxProvider>
    <div className='container'>
      <div className='page_title' data-aos='fade-up' style={{ display:'block', textAlign:'left' }}>{BlogDetails && BlogDetails.title}</div>
      <div className='upload_date' style={{ textAlign:'left' }}>
        
          <Moment format="D MMM YYYY" withTitle>
            {BlogDetails && BlogDetails.updated_at}
        </Moment>
      </div>

      <div className='content'>
        {description && description !==null ?  description.map((descript,index)=>{
              var modulas=index%2;
              if(modulas === 0){
                
                  return(
                      <section key={index} style={{ margin:"30px 0px" }}>
                        <div className='left'> 
                          <p> 
                            <div  dangerouslySetInnerHTML={{ __html: descript !==null ? descript['banner_'+index] && descript['banner_'+index]:''}} />
                          </p>
                        </div>
                        <div className='right'>
                          {
                          mediaQuery?
                          <div className='image'>
                              {banner && banner !==null ? banner['banner_'+index] && banner['banner_'+index] !==null ?
                              <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${banner['banner_'+index]}`} />:'':''}
      
                          </div>
                          :
                          <Parallax  y={[30, -60]} tagOuter="figure">
                            <div className='image'>
                            {banner && banner !==null ? banner['banner_'+index] && banner['banner_'+index] !==null ?
                              <img src={ `${process.env.REACT_APP_BASE_URL_ASSET}/${banner['banner_'+index]}`} />:'':''}
                            </div>
                          </Parallax>
                          }
                        </div>
                      </section>
                  );
              }

              return(

                <section key={index} style={{ margin:"30px 0px" }}>
                  <div className='left'>
                  {
                  mediaQuery?
                  <div className='image'>
                    {banner && banner !==null ? banner['banner_'+index] && banner['banner_'+index] !==null ? 
                     <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${banner['banner_'+index]}`} />:'':''}
                  </div>
                  :
                  <Parallax  y={[30, -60]} tagOuter="figure">
                    <div className='image'>
                   { banner && banner !==null ? banner['banner_'+index] && banner['banner_'+index] !==null ? 
                    <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${banner['banner_'+index]}`} />:'':''}
                    </div>
                  </Parallax>
                  }
                  </div>
                  <div className='right'>
                        <p> 
                            <div  dangerouslySetInnerHTML={{ __html: descript !==null ? descript['banner_'+index] && descript['banner_'+index]:''}} />
                        </p>
                  </div>
                </section>

              );
        })
      :''}



      </div>
    </div>
    </ParallaxProvider>
  </div>
  );

}
