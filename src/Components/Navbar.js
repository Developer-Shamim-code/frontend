import React, { useEffect, useState } from "react"
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Branding from "../assets/Branding"
import AOS from "aos"
import $ from 'jquery'

// CSS,
import '../assets/css/navbar.css'
import '../assets/css/mini-cart.css'
// Icons
import SearchIcon from '../assets/icons/search.svg'
import CartIcon from '../assets/icons/cart.svg'
import { animate } from "luxy.js"
import Moment from "react-moment";

export default function Navbar({header_logo,addCart,setaddCart,currency,miniCartShow,setMiniCartShow,header_logoblack}) {
 
  const [navLinks, setNavlinks] = useState([{name: 'ARCHIV', path: '/archiv'}, {name: 'ÜBER UNS', path: '/about'}, {name: 'BLOG', path: '/blogs'}, {name: 'KONTAKT', path: '/contact'}]);
  const [menubarShow, setMenubarShow] = useState(false);

  const [searchFormShow, setSearchFormShow] = useState(false);

  useEffect(() => {
    var container = document.querySelector('.search_form');
    document.addEventListener('click', function( event ) {
      if (container !== event.target && !container.contains(event.target)) {
        setSearchFormShow(false);
      }
    });
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 1000
    })

    setTimeout(() => {
      document.querySelector('.main_nav').classList.add('show')
    }, 1000)

    var lastScrolledTop = 0;
    
    setInterval(() => {
      if(window.scrollY === 0){
        document.querySelector('.main_nav').classList.add('show')
      }
    })
    
    setTimeout(() => {
      $(window).scroll(function(){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if(scrollTop > lastScrolledTop){
          setTimeout(() => {
            $(".main_nav").removeClass("show");
          }, 800)
        }
        else{
          setTimeout(() => {
            $(".main_nav").addClass("show");
          }, 100)
        }
        lastScrolledTop = scrollTop;
      });
    }, 1000);
  }, [])

  if(window.matchMedia('(max-width: 900px)').matches){
    miniCartShow?
      document.body.style.overflow = 'hidden'
    :
      document.body.style.overflow = 'auto'
  }

  function handleLinkClick(){
    setMenubarShow(false);
    setMiniCartShow(false);

    if(menubarShow === true){
      animateBurger()
    }
  }

  function animateBurger() {
    $(".menu-parent").toggleClass('state1');
    setTimeout(function(){
      $(".menu-parent").toggleClass('state2');
    }, 300);
    setTimeout(function(){
      $(".menu-parent").toggleClass('state3');
    }, 600);
  }
  const navigate=useNavigate();
const submitHandler=(e)=>{
  e.preventDefault();
  navigate(`/product/search/${e.target['search'].value}`);
   
}

const getcartItems = addCart && addCart;
  let totalprice=0;
  // console.log(addCart.filter(item=>item.id !== addCart.payload && addCart.payload ));
  const removeItem=(id)=>{
    const restore=addCart.filter(x=>x.id !== id);
    setaddCart(restore);
  }
    
  return (
    <>
    
    <nav className="main_nav">
      <div className="nav_container">
        <div className="container">
          <Link to='/' className="branding" onClick={() => {handleLinkClick()}}>

            {/* {header_logo !==null ? <img src={header_logo}  />:<img src='' width="200px" height="65px" alt="logo" />
              } */}
               {
              menubarShow?
              header_logoblack !==null ? <img src={header_logoblack}  />:<img src='' width="200px" height="65px" alt="logo" />
              :
              header_logo !==null ? <img src={header_logo}  />:<img src='' width="200px" height="65px" alt="logo" />
            }
          </Link>
          <div className="nav_links">
            <ul className={menubarShow? "links navigations show" : searchFormShow? "links navigations" : "links navigations margin"}>
              {
                navLinks.map((link, index) => {
                  return (
                    <li key={index} onClick={handleLinkClick}>
                      <NavLink to={link.path} >{link.name}</NavLink>
                    </li>
                  )
                })
              }
            </ul>
            <ul className="links">
              <li className="icon" onClick={handleLinkClick}>
                <a>
                  <form className={searchFormShow? "search_form show" : "search_form"} onSubmit={submitHandler}>
                    <input type="text" placeholder="Suchbegriff eingeben" name="search" />
                    <img src={SearchIcon} onClick={() => {setSearchFormShow(!searchFormShow)}} />
                  </form>
                </a>
              </li>
              <li className="icon"><a onClick={() => {setMiniCartShow(true)}}>
                <img src={CartIcon} />
                {getcartItems && getcartItems !==null ? getcartItems.length >0? <span className="count">{ getcartItems.length}</span>:'':''
                }
                
              </a></li>
               
              <li className="icon menu_icon" onClick={() => {setMenubarShow(!menubarShow); animateBurger()}}>
                <div className="menu-parent">
                  <div className="menu-bar top" />
                  <div className="menu-bar center" />
                  <div className="menu-bar bottom" />
                  <div className="menu-bar cross1" />
                  <div className="menu-bar cross2" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    
    
    <div className={miniCartShow? 'mini_cart show' : 'mini_cart'}>
      <div className='header'>
        <div className='title' style={{ fontSize:"30px" }}>Dein Warenkorb</div>
        <div className='close_btn' onClick={() => {setMiniCartShow(false)}}><img src={require('../assets/icons/cross.png')} /></div>
      </div>
      <div className='products_container'>
       

              {getcartItems !==null ? getcartItems.map((item,index)=>{
 
                        totalprice+=item.price && parseFloat(item.price.replace(currency, ""));
                        return(
                              <div className='item' key={index}>
                                <div className='image'><img src={item.image && item.image !==null ? `${process.env.REACT_APP_BASE_URL_ASSET}/${item.image}`:''} /></div>
                                <div className='details'>
                                  <div className='top'>
                                    <div className='title'>{item.name && item.length > 20 ? `${item.name.substring(0,20)}...`:item.name.substring(0,20)}</div>
                                    <div className='date'>
                                      {item !==null ?  
                                      <Moment format="D MMM YYYY" withTitle>
                                            { item.updated_at }
                                      </Moment>:''}
                                      </div>
                                  </div>
                                  <div className='bottom'>
                                    <div className='price'>{item.price && item.price}</div>
                                    <button type="button" onClick={()=>removeItem(item && item.id)} className='remove_btn' style={{ border:"none",background:"unset" }} >Enfernen</button>
                                  </div>
                                </div>
                              </div>

                        );
                

              }):''}

      </div>
      <div className='actions'>
        <div className='subtotal'>
          <span className='title'>Summe</span>
          <span className='price'>{currency && currency+' '+totalprice.toFixed(2)}</span>
        </div>
        <Link to='/checkout' onClick={() => {setMiniCartShow(false)}} className='btn_primary bg icon'>Zur Kasse <img src={require('../assets/icons/arrow.png')} /></Link>
      </div>
    </div>
    </>
  )
}
