import React, { useState, useEffect, useRef } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom';
// Components 
import PageTransition from '../Components/PageTransition';
// CSS
import '../assets/css/archive.css'
import '../assets/css/form.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'react-moment';
import {useNavigate} from 'react-router-dom';
// Icons
import CloseIcon from '../assets/icons/arrow.png'
import ArrowIcon from '../assets/icons/arrow.svg'
import axios from 'axios';
import {useParams} from 'react-router-dom';
// import {Accordion} from 'react-bootstrap';
window.jQuery = window.$ = $;
require("jquery-nice-select");


export default function Archive() {
 
          const {category_id}=useParams();
          //product fetch
          const [filter, setFilter] = useState({category_id:category_id});
          
          const [Products, setProducts] = useState(null);
          const [category, setcategory] = useState([]);
          const [categorycount,setCategorycount] = useState(0);
          
          useEffect(() => { 
           
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/fetch-products/${filter.category_id}`,)
            .then((res)=>{
              setProducts(res.data.data['fetchproduct']);
              setcategory(res.data.data['product_category']);
              setCategorycount(res.data.data['categorycount']);
            })
            .catch((error)=>{
              console.log(error);
            });
          }, [filter]);
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
          


        ///end develop
        const selectRef = useRef()
        const [filtersShow, setFiltersShow ] = useState(false);
      
        
        if(window.matchMedia('(max-width: 400px)').matches){
          filtersShow?
            document.body.style.overflow = 'hidden'
          :
            document.body.style.overflow = 'auto'
        }


        const searchHandler=(e)=>{
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/search-products/${e.target.value}`)
            .then((res)=>{
              setProducts(res.data.data['searchproduct']);
            })
            .catch((error)=>{
              console.log(error);
            });
        }

        
        useEffect(() => {
          document.querySelectorAll('.filters .drop_btn').forEach(function(el) {
            el.addEventListener('click', function() {
              this.classList.toggle('active')
              this.nextElementSibling.classList.toggle('show')
            })
          })
      
      
          $(selectRef.current).niceSelect();
      
          document.documentElement.scrollTop = 0;
        }, [categorycount])  

        const submitHandler=(e)=>{
            e.preventDefault();
        }
 
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
              currentProducts !==null ? currentProducts.map((product,index)=>{
                  return(
                      <Link to={`/product/${product.slug}`} className='item' key={index} style={{ textAlign:"left" }}>
                        <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${product.thumbnail !==null? product.thumbnail.file_name:''}`} alt={product.name.length > 20 ? `${product.name.substring(0,20)}...`:product.name}   />
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

