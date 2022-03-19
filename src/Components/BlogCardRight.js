
import React from 'react';
import {Link} from 'react-router-dom';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
const BlogCardRight=({mediaQuery,Blogpost})=>{
    return ( 
           <ParallaxProvider> <div className='card right'>
                <div className='details' style={{ textAlign:'right' }}>
                <div className='title'>{Blogpost !==null ? Blogpost.title:''}</div>
                <p>{Blogpost !==null ? Blogpost.short_description:''}</p>
                <div className='actions'>
                    <Link to={`/blog/${Blogpost && Blogpost.slug}`} className='btn_primary bg'>Weiterlesen</Link>
                </div>
                </div>
                {Blogpost !==null ? 
                    <>
                            {
                            mediaQuery?
                            <div className='image'>
                                <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${Blogpost.image && Blogpost.image.file_name}`} alt="image" style={{ height:"100%" }} />
                            </div>
                            :
                            <Parallax y={[-10, 10]} tagOuter="figure">
                                <div className='image'>
                                <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${Blogpost.image && Blogpost.image.file_name}`} alt="image" style={{ height:"100%" }} />
                                </div>
                            </Parallax>
                            }
                    </>:""}

            </div></ParallaxProvider>
      
    );
}

export default BlogCardRight;


const HomeBlogCardRight=({mediaQuery,post})=>{
    return(
                
            <ParallaxProvider><div className='card right'>
            <div className='details' style={{ textAlign:'right' }}>
              <div className='title'>{post !==null ? post.title:''}</div>
              <p>{post !==null ? post.short_description:''}</p>
              <div className='actions'>
                <Link to={`/blog/${post && post.slug}`}  className='btn_primary bg'>Weiterlesen</Link>
              </div>
            </div>
            {
              mediaQuery?
              <div className='image'>
              <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${post.image && post.image.file_name}`} alt="image" style={{height:"100%" }} />
              </div>
              :
                <Parallax className="image" y={[-10, 10]} tagOuter="figure">
                  <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${post.image && post.image.file_name}`} alt="image" style={{height:"100%" }} />
                </Parallax>
            }
          </div></ParallaxProvider>
          
    );
}

export {HomeBlogCardRight}