import React, { useState, useEffect, useRef } from 'react'
import $ from 'jquery'
import { Link, useParams } from 'react-router-dom';
// Components 
import PageTransition from '../Components/PageTransition';
// CSS
import '../assets/css/archive.css'
import '../assets/css/form.css'
import Moment from 'react-moment';
// Icons
import CloseIcon from '../assets/icons/arrow.png'
import ArrowIcon from '../assets/icons/arrow.svg'
import axios from 'axios';
window.jQuery = window.$ = $;
require("jquery-nice-select");

export default function Search() {
  const selectRef = useRef()
  const [filtersShow, setFiltersShow ] = useState(false);
  
  useEffect(() => {
    document.querySelectorAll('.filters .drop_btn').forEach(function(el) {
      el.addEventListener('click', function() {
        this.classList.toggle('active')
        this.nextElementSibling.classList.toggle('show')
      })
    })


    $(selectRef.current).niceSelect();

    document.documentElement.scrollTop = 0;
  }, [])  
  
  if(window.matchMedia('(max-width: 400px)').matches){
    filtersShow?
      document.body.style.overflow = 'hidden'
    :
      document.body.style.overflow = 'auto'
  }



  //product fetch
    
  const {slug} = useParams();
   const [Products, setProducts] = useState(null);
    useEffect(() => { 
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/search-products/${slug}`)
      .then((res)=>{
        setProducts(res.data.data['searchproduct']);
      })
      .catch((error)=>{
        console.log(error);
      });
   }, [slug]);
  //end product fetch

  //pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [productPerPage, setproductPerPage] = useState(15);

  const lastProducts=currentPage * productPerPage; 
  const firstProducts=lastProducts - productPerPage;
  const currentProducts=Products && Products.slice(firstProducts,lastProducts); 
   
  const totalPage=Math.ceil(Products && Products.length / productPerPage);

  const ChangeHandler=(e)=>{
    setproductPerPage(e.target.value);
  }
   
console.log(Products);
  return (
    <>
    
    <PageTransition />
    <div className='archive_page'>
      <div className='container'>
        <button className='btn_primary w-100 filters_toggle_btn' onClick={() => {setFiltersShow(true)}}>Filters</button>
      </div>
      <div className='container'>
      
        <div className='right' style={{ width:"100%" }}>
          <div className='header'>
            <span>{Products  && Products.length} Ergebnisse</span>
            <form>
              {/* <select ref={selectRef} name="perPage" id='perPage' onChange={ChangeHandler}>
                <option value="15">15 Ergebnisse pro Seite</option>
                <option value="25">25 Ergebnisse pro Seite</option>
                <option value="50">50 Ergebnisse pro Seite</option>
                <option value="100">100 Ergebnisse pro Seite</option>
              </select> */}
              <select   name="perPage" id='perPage' onChange={ChangeHandler}>
                <option value="15">15 Ergebnisse pro Seite</option>
                <option value="25">25 Ergebnisse pro Seite</option>
                <option value="50">50 Ergebnisse pro Seite</option>
                <option value="100">100 Ergebnisse pro Seite</option>
              </select>
            </form>
          </div>
          <div className='items_container'>
            {
              currentProducts !==null ? currentProducts && currentProducts.map((product,index)=>{
                  return(
                      <Link to={`/product/${product.slug}`} className='item' key={index} style={{ textAlign:"left" }}>
                        <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${product.thumbnail && product.thumbnail.file_name}`} alt=''   />
                        <div className='title'>{product.name.length > 20 ? `${product.name.substring(0,20)}...`:product.name}</div>
                        <span>  
                            {/* <Moment format="D MMM YYYY" withTitle>
                              {product !==null ? product.updated_at:''}
                            </Moment> */}
                             {product !==null ? product.month !==null ? product.month:'':''}/{product !==null ? product.year !==null ? product.year:'':''} | {product !==null ? product.issue !==null ? product.issue:'':''}
                        </span>
                      </Link>
                  );
                }):''
            }
        </div>

        <div className='pagination'>
          {currentPage > 1? <img src={require('../assets/icons/arrow.png')} style={{transform: 'rotate(180deg)'}} alt='' onClick={()=>setcurrentPage(currentPage-1)} />:''}
            <span>Seite {currentPage} von {totalPage !==0? totalPage:currentPage}</span>
               {currentPage < totalPage? <img src={require('../assets/icons/arrow.png')} alt='' onClick={()=>setcurrentPage(currentPage+1)} />:''}
          </div>
      </div>
    </div>
    </div>
    </>
    
  )
}
