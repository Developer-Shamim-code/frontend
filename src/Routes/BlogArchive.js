import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import luxy from 'luxy.js';
// Components 
import PageTransition from '../Components/PageTransition';
// CSS
import '../assets/css/blogs.css';
import axios from 'axios';
import BlogCardLeft from '../Components/BlogCardLeft';
import BlogCardRight from '../Components/BlogCardRight';

export default function BlogArchive() {
  const [ mediaQuery={mediaQuery} , setMediaQuery] = useState(window.matchMedia("(max-width: 900px)").matches);
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
    
    // if(window.matchMedia("(min-width: 1200px)").matches){
    //   luxy.init();
    // }
    document.documentElement.scrollTop = 0;
  }, [])




  
  const [blogcategory,setBlogcategory] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/blog-category`)
        .then((res)=>{
            setBlogcategory(res.data.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }, []);







    const [Active, setActive] = useState(null);
    useEffect(() => {
         setActive(blogcategory !==null ? blogcategory.length:0);
    }, [blogcategory]);



    
    //blogpost
    const [Blogpost, setBlogpost] = useState(null);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/blog-post/${Active}`)
        .then((res)=>{
                setBlogpost(res.data.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }, [Active]);
    //end blogpost

   const [currentPage, setcurrentPage] = useState(1);
   const [postPerPage, setpostPerPage] = useState(7);

   const lastPosts=currentPage * postPerPage; 
   const firstPosts=lastPosts - postPerPage;
   const currentPosts=Blogpost && Blogpost.slice(firstPosts,lastPosts); 
    
   const totalPage=Math.ceil(Blogpost && Blogpost.length / postPerPage);
 
  return (
    <div className='blogs_page'>
      <PageTransition />
      <ParallaxProvider>
        <div className='container'>
        <div className='page_title' style={{ display:"block",textAlign:'left' }} data-aos='fade-up'>Entdecke unseren  <span>Blog</span></div>
        <div className='content'>
          <div className='categories'>
              {blogcategory !==null ? 
              blogcategory.map((category,index)=>{
                        return(
                            <button className={Active && Active === category.id ? 'btn_primary active':'btn_primary' } key={index} onClick={()=>setActive(category.id)} >{category.category_name}</button>
                        );
 
              }):''}
          </div>
          <div className='blogs_container'>

              {currentPosts !==null ? currentPosts.map((post,index)=>{
                    let modules=index%2;
                   
                    return(
                        <div key={index}>
                            {modules === 0? <BlogCardLeft mediaQuery={mediaQuery} Blogpost={post} />:<BlogCardRight mediaQuery={mediaQuery} Blogpost={post} />}
                        </div>
                    ); 
              }):''}
        

          </div>
          
          <div className='pagination'>
          {currentPage > 1? <img src={require('../assets/icons/arrow.png')} style={{transform: 'rotate(180deg)'}} alt='' onClick={()=> {setcurrentPage(currentPage-1); window.scrollTo(0, 0)}} />:''}
            <span>Seite {currentPage} von {totalPage}</span>
               {currentPage < totalPage? <img src={require('../assets/icons/arrow.png')} alt='' onClick={()=>{setcurrentPage(currentPage+1);
               window.scrollTo(0, 0)}} />:''}
          </div>
        </div>
      </div>
      </ParallaxProvider>
    </div>
  )
}
