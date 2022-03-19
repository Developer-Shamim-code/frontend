import React, { useEffect, useState } from 'react'
import $, {jQuery} from 'jquery'
import { Link, NavLink ,useNavigate} from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import 'jquery.marquee'
import 'jquery.easing'
// Components
import PageTransition from '../Components/PageTransition'
// CSS
import '../assets/css/home.css'
import '../assets/owl carousel/owl.carousel.min.css'
import '../assets/owl carousel/owl.theme.default.min.css'
// Icons
import ArrowIcon from '../assets/icons/arrow.png'
import StarIcon from '../assets/icons/star.png'
// Images
import Decade1 from '../assets/images/decades/1.svg'
import Decade2 from '../assets/images/decades/2.svg'
import Decade3 from '../assets/images/decades/3.svg'
import Decade4 from '../assets/images/decades/4.svg'
import Decade5 from '../assets/images/decades/5.svg'
import Decade6 from '../assets/images/decades/6.svg'
import Decade7 from '../assets/images/decades/7.svg'
import Decade8 from '../assets/images/decades/8.svg'
import Decade9 from '../assets/images/decades/9.svg'
import FeaturedCollection from '../assets/images/featured-collection.png'
import { HomeBlogCardLeft } from '../Components/BlogCardLeft';
import { HomeBlogCardRight } from '../Components/BlogCardRight';
import axios from 'axios';
import Moment from 'react-moment';

export default function Home({setcategoryid}) {
  
  //homepage  develop section

  //section data fetch
  const [section1, setSection1] = useState(null);   
  const [section2, setSection2] = useState(null);   
  const [section3, setSection3] = useState(null);   
  const [section4, setSection4] = useState(null);   
  const [section5, setSection5] = useState(null);   

  //section content
  const [section1Content, setSection1Content] = useState(null);   
  const [section2Content, setSection2Content] = useState(null);    
  const [section3Content, setSection3Content] = useState(null);    
  const [section4Content, setSection4Content] = useState(null);   
  const [section5Content, setSection5Content] = useState(null);   
  
  
  const [slidertitle, setSlidertitle] = useState(null);   
  const [sliders, setSliders] = useState(null);   

  //end section data fetch

  // const [titleanddes, setTitleanddes] = useState(null);
  // const [productimage, setProductimage] = useState([]);
  // const [featuredproduct, setFeaturedproduct] = useState([]);
  // const [Category, setCategory] = useState([]);
  const [marquee, setMarquee] = useState([]);
  const [marqueespeed, setMarqueeSpeed] = useState(null);
  // let speed=14000;
  const [speed, setSpeed] = useState(17000);

  useEffect(() => {
    //viewport check & display animation
    $.fn.isInViewport = function() {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      return elementBottom > viewportTop && elementTop < viewportBottom;
    };
          
    let elements = $('.cateogires');
    $(window).on('resize scroll', function() {
      $(elements).each(function(index, current) {
          let element = $(current);
          if (element.length > 0) {
              if (element.isInViewport()) {
                  element.addClass('enable');
              } else {
                  element.removeClass('enable');
              }
          }
      });
    });
  }, [])
  
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/fetch-homepage-content`)
      .then((res)=>{  

        //set section value

        setSection1(res.data.data['section_1']); 
        setSection2(res.data.data['section_2']);
        setSection3(res.data.data['section_3']);
        setSection4(res.data.data['section_4']);
        setSection5(res.data.data['section_5']);

        
        setSection1Content(res.data.data['section_1_content']); 
        setSection2Content(res.data.data['section_2_content']); 
        setSection3Content(res.data.data['section_3_content']); 
        setSection4Content(res.data.data['section_4_content']);
        setSection5Content(res.data.data['section_5_content']);


        setSlidertitle(res.data.data['slidertitle']);
        setSliders(res.data.data['sliders']);

        //end set section value

        // setTitleanddes(res.data.data['titleanddes']);
        // setProductimage(res.data.data['productimage']);
        // setFeaturedproduct(res.data.data['featuredproduct']);
        // setCategory(res.data.data['category']);
        setMarquee(res.data.data['marquee']);
        setMarqueeSpeed(res.data.data['marqueespeed']);
      })
      .catch((error)=>{
        console.log(error);
      });
    }, []);
  //end homepage  develop section

 

  //blogs develop section

    const [BlogPost, setBlogPost] = useState([]);

    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/blog-post/${'homeblog'}`)
      .then((res)=>{
        setBlogPost(res.data.data);
      })
      .catch((error)=>{
        console.log(error);
      });
    }, []);
  //end blogs develop section
  



  const [offsetY, setOffsetY] = useState(0);
  const [mediaQuery, setMediaQuery] = useState(window.matchMedia("(max-width: 900px)").matches);
  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  }
  
  useEffect(() => {
    setSpeed(marqueespeed!==null ? marqueespeed.speed:speed);
  
    window.addEventListener('scroll', handleScroll);

    // $(function(e){
			$('#marquee').marquee({
				allowCss3Support:true,
				css3easing:'linear',
        startVisible: true,
				easing:'linear',
				duration: speed,
				duplicated:true,
				startVisible:true,
        gap: 0
			});  
      
		// });

    return () => window.removeEventListener('scroll', handleScroll)
  }, [marquee,speed]); 
const section1Lastword=section1Content && section1Content.title.split(" ").length-2;
const section3title=section3Content && section3Content.section_name.length/2-1;

const slidetitle=slidertitle && slidertitle.title.length/2-1;


const navigate=useNavigate();

const categoryHandle=(categoryid)=>{
      setcategoryid(categoryid);
      navigate('/archiv', { replace: true })
}
  return (
    <>
  
    <PageTransition />
    <div className='home_page'>
      <ParallaxProvider>
      <div className='container'>
        <header style={{ textAlign:'left' }}>
          <h1 className='hero_text'>
              {section1Content && section1Content.title.split(" ").map((title,index)=>{
                  if(index < 1){
                    
                    return <span key={index}>{title}</span> ;
                  }
                  if(index >= section1Lastword){
                    return  <span key={index}>{' '+title}</span> ;

                  }
                   return <React.Fragment key={index}>{index === 1? <>{' '+title}<br/></>:' '+title}</React.Fragment>;
              })}
          </h1>
          
          <div className='wrapper'>
            <div className='details'>
              <p> 
                  <div dangerouslySetInnerHTML={{ __html:section1Content && section1Content !==null ?  section1Content.description:''}} />
                    {/* {section1Content && section1Content !==null ?  section1Content.description:''} */}
                </p>  
              <div className='actions'>
                <Link to={section1Content && section1Content.label_link !==null ? section1Content.label_link && section1Content.label_link:''} className='btn_primary icon bg'>Direkt zum Archiv <img src={ArrowIcon} /></Link>
                <Link to={section1Content && section1Content.label_link2 !==null ? section1Content.label_link2 && section1Content.label_link2:''} className='btn_primary uber_uns'>{section1Content && section1Content.label2 !==null ?  section1Content.label2:''}</Link>
              </div>
              <div className='section_line section_line_1'>
                <img src={require("../assets/images/homepage-line-1.png")} alt="section_line" />
              </div>
            </div>
  
            <div className='images'>
              <div className='images_container'>
                {section1 && section1.length > 0 ? section1.map((banner,index)=>{
                  return(
                          <div className='card' key={index}>
                            <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${banner.file_name && banner.file_name}`} alt="image" />
                          </div>
                  );
                }):''}
                
              </div>
            </div>
          </div>
        </header>
      </div>
      
      <div id='marquee' className='big_text overflow'>
        {marquee && marquee.length > 0 ? marquee.map((value,index)=>{
          
            return <React.Fragment key={index}> {value.title && value.title}<img src={StarIcon} alt="" /></React.Fragment>
        }):''}
          </div>



      <div className='container'>
        <div className='section_line section_line_2'>
          <img src={require("../assets/images/homepage-line-2.png")} alt="section_line" />
        </div>
        {section2Content && section2Content !== null ?  
              <section className='featured_magazine'  >
                <div className='section_line section_line_3'>
                  <img src={require("../assets/images/homepage-line-3.png")} alt="section_line" />
                </div>
                <div className='wrapper' style={{ textAlign:'left' }}>
                  <div className='image'>
                    {section2 && section2.length > 0 ? section2.map((banner,index)=>{
                      return(
                         <React.Fragment key={index}><img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${banner && banner.file_name}`} alt="image" /></React.Fragment> 
                      );
                    }):''}
                    <div className='bg' style={{width: offsetY / 3, height: offsetY / 3}}>
                      <div style={{width: offsetY / 3.25, height: offsetY / 3.25}}></div>
                    </div>
                  </div>
                  <div className='details'>
                    <div className='name'>{section2Content && section2Content.title !==null ? section2Content.title:''}</div>
                    <div className='date'>
                        <Moment format="D.M.YYYY" withTitle>
                        {section2Content && section2Content.date !==null ? section2Content.date:Date.now()}
                        </Moment>
                    </div>
                    <div className='subheading'>
                      <p><div dangerouslySetInnerHTML={{ __html:section2Content && section2Content !==null ?  section2Content.description:''}} /></p>
                    </div>
                    <div className='actions'>
                      <Link  to={{pathname:section2Content && section2Content.label_link !==null ? section2Content.label_link && section2Content.label_link:''}} className='btn_primary bg icon'>
                          {section2Content !==null ? section2Content.label && section2Content.label:''} 
                          <img src={require("../assets/icons/arrow.png")} />
                        </Link>
                    </div>
                  </div>
                </div>
              </section> 
         :''}

        <section className='topics'>
          <div className='section_title'> 
          {section3Content !==null ? section3Content.section_name.split("").map((sec_title,index)=>{
              if(index <=section3title){
                  return <React.Fragment key={index}>{sec_title}</React.Fragment>;
              }  
          }):''} 
             {section3Content !==null ? <>
                 {section3Content.section_name !==null? 
                 <span>{section3Content.section_name.split("").map((sec_title,index)=>{
                    if(index >=section3title){
                      return <React.Fragment key={index}>{sec_title}</React.Fragment>
                    }
                }
          )}</span>:''}</>:''} 
          
          </div>
          <div className='wrapper'>
            <div className='section_line section_line_4'>
              <img src={require("../assets/images/homepage-line-4.png")} alt="section_line" />
            </div>
            <div className='topics_container'>

              {section3 && section3.length > 0 ? 
                <>
                  <div className='topic' style={{cursor:'pointer',willChange: 'transform', marginLeft: `-${offsetY / 27}px`, transform: `rotateZ(-${offsetY/ 200}deg)`}} >
                    <button type="button" onClick={()=>categoryHandle(section3[0].id)} style={{ height:"100%",border:"none" }}>
                    <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${section3[0].image && section3[0].image !==null? section3[0].image.file_name:''}`} alt="image" />
                    <div className='name' style={{ cursor:'pointer' }}>{section3[0].name && section3[0].name}</div></button>
                  </div> 

                  <div className='topic' style={{cursor:'pointer',willChange: 'transform', marginLeft: `${offsetY / 30}px`, transform: `rotateZ(${offsetY/ 300}deg) `}}>
                    <button type="button" onClick={()=>categoryHandle(section3[1].id)} style={{ height:"100%",border:"none" }} >
                    <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${section3[1].image && section3[1].image!==null ?  section3[1].image.file_name:''}`} alt="image" />
                    <div className='name' style={{ cursor:'pointer' }}>{section3[1].name && section3[1].name}</div> </button>
                  </div>
                  
                  <div className='topic' style={{cursor:'pointer',willChange: 'transform', marginLeft: `-${offsetY / 35}px`, transform: `rotateZ(-${offsetY/ 400}deg)`}} >
                    <button type="button" onClick={()=>categoryHandle(section3[2].id)} style={{ height:"100%",border:"none" }}>
                    <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${section3[2].image && section3[2].image !==null? section3[2].image.file_name:''}`} alt="image" />
                    <div className='name' style={{ cursor:'pointer' }}>{section3[2].name && section3[2].name}</div></button>
                  </div> 

                  <div className='topic' style={{cursor:'pointer',willChange: 'transform', marginLeft: `${offsetY / 40}px`, transform: `rotateZ(${offsetY/ 400}deg) `}}>
                    <button type="button" onClick={()=>categoryHandle(section3[3].id)} style={{ height:"100%",border:"none" }} >
                    <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${section3[3].image && section3[3].image!==null ?  section3[3].image.file_name:''}`} alt="image" />
                    <div className='name' style={{ cursor:'pointer' }}>{section3[3].name && section3[3].name}</div> </button>
                  </div>
                  
                  <div className='topic' style={{cursor:'pointer',willChange: 'transform', marginLeft: `-${offsetY / 45}px`, transform: `rotateZ(-${offsetY/ 400}deg)`}} >
                    <button type="button" onClick={()=>categoryHandle(section3[4].id)} style={{ height:"100%",border:"none" }}>
                    <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${section3[4].image && section3[4].image !==null? section3[4].image.file_name:''}`} alt="image" />
                    <div className='name' style={{ cursor:'pointer' }}>{section3[4].name && section3[4].name}</div></button>
                  </div> 

                  <div className='topic' style={{cursor:'pointer',willChange: 'transform', marginLeft: `${offsetY / 50}px`, transform: `rotateZ(${offsetY/ 400}deg) `}}>
                    <button type="button" onClick={()=>categoryHandle(section3[5].id)} style={{ height:"100%",border:"none" }} >
                    <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${section3[5].image && section3[5].image!==null ?  section3[5].image.file_name:''}`} alt="image" />
                    <div className='name' style={{ cursor:'pointer' }}>{section3[5].name && section3[5].name}</div> </button>
                  </div>
                </>
            :
              ''}

            </div>
 

            
            <div className='section_line section_line_7' style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
              <img src={require("../assets/images/homepage-line-7.png")} alt="section_line" />
            </div>
          </div>
          <div className='actions'>
            <Link to='/archiv' className='btn_primary w-100 bg_animate an'>Alle Themen durchstöbern <span className='bg'></span></Link>
          </div>
        </section>

        <section className='text_highlight'>
          <div className='section_line section_line_8'>
            <img src={require("../assets/images/homepage-line-8.png")} alt="section_line" />
          </div>
          <div className='section_title'>{
          slidertitle && slidertitle !==null ? 
              slidertitle.title && slidertitle.title.split("").map((title,index)=>{
                if(index <= slidetitle){
                  return title;
                } 
              }):''
          }

          {
            slidertitle && slidertitle !==null ? <span>
              {slidertitle.title && slidertitle.title.split("").map((title,index)=>{
                if(index >= slidetitle){
                  return title;
                } 
              })}</span>:''
     
          }
          </div>
        </section>

        <section className='slider'>
          <div className='circle' style={{transfrom: `scale(0.${offsetY})`}}>
            <div className='bg'>
              <OwlCarousel
                className='owl-theme'
                items={1}
                autoPlay={true}
                autoplayHoverPause={true}
                autoplaySpeed={1000}
                dots={false}
                nav={true}
                loop={true}
                navText={['<img src="'+ArrowIcon+'" />', '<img src="'+ArrowIcon+'" />']}
              >
                {sliders && sliders.length > 0 ?  sliders.map((slider,index)=>{
                    return(
                        <Link to={slider && slider.link !==null ? slider.link && slider.link:''} key={index}>
                        <div className='item'>
                          <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${slider.image && slider.image !==null ? slider.image.file_name:''}`} />
                        </div></Link>
                    );
                }):''}

              </OwlCarousel>
            </div>
          </div>
          <div className='section_line section_line_9'>
            <img src={require("../assets/images/homepage-line-9.png")} alt="section_line" />
          </div>
        </section>

        <section className='featured_collection'>
          <div className='wrapper'>
            <div className='details' style={{ textAlign:'left' }}>
              <div className='title'>{section5Content !==null ? section5Content.title:''}</div>
              <p><div  dangerouslySetInnerHTML={{ __html:section5Content && section5Content !==null ?  section5Content.description:''}}  /></p>
            <Link to={section5Content && section5Content.label_link !==null ? section5Content.label_link && section5Content.label_link:''} className='btn_primary bg icon'>{section5Content !==null ?  section5Content.label:''}<img src={require('../assets/icons/arrow.png')} /></Link>
              <div className='section_line section_line_10'>
                <img src={require("../assets/images/homepage-line-10.png")} alt="section_line" />
              </div>
            </div>
            {section5 && section5.length > 0? section5.map((image,index)=>{
              return(
                      <React.Fragment key={index}>
                                  {
                      
                                    mediaQuery?
                                    <div className='image'>
                                      <img src={image !==null ? `${process.env.REACT_APP_BASE_URL_ASSET}/${image.file_name}`:''} alt="image" />
                                    </div>
                                    :
                                      <Parallax className="image" y={[-10, 10]} tagOuter="figure">
                                        <img src={image !==null ? `${process.env.REACT_APP_BASE_URL_ASSET}/${image.file_name}`:''} alt="image" />
                                      </Parallax>
                                  }

                      </React.Fragment>
              );
            }):''}
          </div>
        </section>
        
        <section className='blogs'>
          <div className='section_title'><span>BLOG</span></div>
          <div className='wrapper'>
            {BlogPost && BlogPost.length > 0? BlogPost.map((post,index)=>{
              const module=index%2;
              if(module === 0){
                  return  <React.Fragment key={index}><HomeBlogCardLeft mediaQuery={mediaQuery} post={post}  /></React.Fragment>;
              }
             return <React.Fragment key={index}><HomeBlogCardRight mediaQuery={mediaQuery}  post={post} /></React.Fragment>;

            }):''}

          </div>
          <div className='section_actions'>
            <Link to='/blogs' className='btn_primary bg icon'>Entdecke alle Blogposts <img src={require('../assets/icons/arrow.png')} /></Link>
          </div>
        </section>

        
      </div>
      </ParallaxProvider>
    </div>
    </>
  )
}
