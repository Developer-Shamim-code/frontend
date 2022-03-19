import React, { useState, useEffect } from 'react'
import AOS from 'aos'
import luxy from 'luxy.js'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
// Components 
import PageTransition from '../Components/PageTransition';
// CSS
import '../assets/css/about.css'
import axios from 'axios';

export default function About() {

  const [pagedetails,setPagedetails] = useState(null);
  useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/frontend-page/${'about'}`)
      .then((res)=>{
        setPagedetails(res.data.data);
      })  
      .catch((error)=>{
        console.log(error);
      });
  },[pagedetails]);


  const [aboutcontent,setAboutcontent] = useState(null);
  const [leftbanner,setLeftbanner] = useState(null);
  const [sectionthreebanner,setSectionthreebanner] = useState(null);
  useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/about-page`)
      .then((res)=>{
        setAboutcontent(res.data.data['content']);
        setLeftbanner(res.data.data['leftimg']);
        setSectionthreebanner(res.data.data['sectionthreeimg']);
      })  
      .catch((error)=>{
        console.log(error);
      });
  },[pagedetails]);
  
  
  const [mediaQuery, setMediaQuery] = useState(window.matchMedia("(max-width: 900px)").matches);
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
    
    // if(window.matchMedia("(min-width: 1200px)").matches){
    //   luxy.init({
    //     wrapperSpeed: 0.04
    //   });
    // }

    document.documentElement.scrollTop = 0;
  }, [])
    var titlelength=pagedetails && pagedetails.title.length/2-1;
  return (
    <div className='about_page'>
      <PageTransition />
      <ParallaxProvider>
      <div className='container'>
        <div data-aos='fade-up' style={{ display:"block",textAlign:"left" }}>
          
       
              <div style={{ 
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

          {' '}{pagedetails !==null ? pagedetails.title.split("").map((title,index)=>{
                    if(titlelength < index){
                        return <div className='page_title'><span>{title}</span></div>;
                    }
            }):''}

          </div>



        <div className='content'>
          <section>
            <div className='left'>
              <p>
              <div dangerouslySetInnerHTML={{ __html:aboutcontent && aboutcontent !==null ? aboutcontent.right_banner_content:''}} />
              </p>
              <img className='section_line_1 section_line' src={require('../assets/images/aboutpage-line-1.png')} alt='section_line_1' />
            </div>
            <div className='right'>
              <img className='section_line_2 section_line' src={require('../assets/images/aboutpage-line-2.png')} />
              
              {
                mediaQuery?
                <div className='image'>
                <img  src={aboutcontent !==null ? aboutcontent.rightimg !==null ? `${process.env.REACT_APP_BASE_URL_ASSET}/${aboutcontent.rightimg.file_name && aboutcontent.rightimg.file_name}`:'':''} />
                </div>
                :
                <Parallax className="image" y={[-0, -10]} tagOuter="figure">
                  <img   src={aboutcontent !==null ? aboutcontent.rightimg !==null ? `${process.env.REACT_APP_BASE_URL_ASSET}/${aboutcontent.rightimg.file_name}`:'':''} />
                </Parallax>
              }
            </div>
          </section>

          <section>
            <div className='left'>
              {
                mediaQuery?
                <div className='image'>
                  {leftbanner && leftbanner !==null ? leftbanner.length > 0 ? 
                    leftbanner.map((banner,index)=>{
                        return <img key={index} src={banner.file_name !==null ? `${process.env.REACT_APP_BASE_URL_ASSET}/${banner.file_name}`:''} />
                    }):''
                  :''}
                 
                  {/* <img src={require('../assets/images/about-image-3.png')} /> */}
                </div>
                :
                <Parallax y={[10, -10]} tagOuter="figure">
                  <div className='image' style={{marginTop: '100px'}}>
                      {leftbanner && leftbanner !==null ? leftbanner.length > 0 ? 
                        leftbanner.map((banner,index)=>{
                            return <img key={index} src={banner.file_name !==null ? `${process.env.REACT_APP_BASE_URL_ASSET}/${banner.file_name}`:''} />
                        }):''
                      :''}
                  </div>
                </Parallax>
              }
            </div>
            <div className='right'>
              <p>
              <div dangerouslySetInnerHTML={{ __html:aboutcontent && aboutcontent !==null ? aboutcontent.left_banner_content:''}} /> 
              </p>
              <img className='section_line_3 section_line' src={require('../assets/images/aboutpage-line-3.png')} />
            </div>
          </section>

          <section>
            <div className='left'>
              <p>
              <div dangerouslySetInnerHTML={{ __html:aboutcontent && aboutcontent !==null ? aboutcontent.section_three_content:''}} />
              </p>
              <img className='section_line_4 section_line' src={require('../assets/images/aboutpage-line-4.png')} />
            </div>
            <div className='right'>
              {
                mediaQuery?
                <div className='image'>
                   {sectionthreebanner && sectionthreebanner !==null ? sectionthreebanner.length > 0 ? 
                        sectionthreebanner.map((banner,index)=>{
                            return <img key={index} src={banner.file_name !==null ? `${process.env.REACT_APP_BASE_URL_ASSET}/${banner.file_name}`:''} />
                        }):''
                      :''}
 
                </div>
                :
                <Parallax y={[10, -10]} tagOuter="figure">
                  <div className='image'>
                      {sectionthreebanner && sectionthreebanner !==null ? sectionthreebanner.length > 0 ? 
                          sectionthreebanner.map((banner,index)=>{
                              return <img key={index} src={banner.file_name !==null ? `${process.env.REACT_APP_BASE_URL_ASSET}/${banner.file_name}`:''} />
                          }):''
                        :''} 
                  </div>
                </Parallax>
              }
            </div>
          </section>
        </div>



        {/* <div className='content'>
           <div dangerouslySetInnerHTML={{ __html: pagedetails !==null ? pagedetails.content:'' }}  />
        </div> */}
      </div>
      </ParallaxProvider>
    </div>
  )
}
