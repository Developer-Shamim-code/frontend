import React, {useEffect,useState} from 'react'
import AOS from 'aos'
import $ from 'jquery'
import { Link ,useParams} from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel'
// Components 
import PageTransition from '../Components/PageTransition';
// CSS
import '../assets/css/product.css'
import '../assets/owl carousel/owl.carousel.min.css'
import '../assets/owl carousel/owl.theme.default.min.css'
// Icons
import ArrowIcon from '../assets/icons/arrow.png'
import axios from 'axios'
import Moment from 'react-moment';
import {  useToasts } from 'react-toast-notifications';


export default function Product({setaddCart,addCart,addCount,setaddCount,setMiniCartShow,currency}) {
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
    document.documentElement.scrollTop = 0;
  }, [])

  const {slug} = useParams();
  const [productDetails, setproductDetails] = useState(null);
  const [homeDiscountedPrice, setHomeDiscountedPrice] = useState(null);
  const [homePrice, setHomePrice] = useState(null);
  const [relatedProduct, setrelatedProduct] = useState(null);
  const [category, setcategory] = useState(null);

  useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/product/${slug}/details`)
        .then((res)=>{
            setproductDetails(res.data.data['productDetails']);
            setHomeDiscountedPrice(res.data.data['home_discounted_price']);
            setHomePrice(res.data.data['home_price']);
            setrelatedProduct(res.data.data['relatedProduct']);
            setcategory(res.data.data['category']);
        })
        .catch((error)=>{
            console.log(error);
        });
  }, [slug]);
 

  const { addToast }= useToasts();

  const [pCheck, setpCheck] = useState(0);
const addtoCard=(e)=>{
  
  const addCheck = addCart.filter((p)=>p.productid ===productDetails.id);
  
  if(addCheck.length > 0){
    setMiniCartShow(true);
    // addToast('Already added',{appearance:'error'});
  }else{
      const number=addCount+1;
      setaddCount(number);
      setaddCart([...addCart,
        {
          id:addCount,
          productid:productDetails && productDetails.id,
          name:productDetails && productDetails.name,
          price:homeDiscountedPrice && homeDiscountedPrice,
          shippingcost:productDetails && productDetails.shipping_cost,
          image:productDetails && productDetails.thumbnail !==null ? productDetails.thumbnail.file_name:'',
          updated_at:productDetails && productDetails.updated_at,
          type:'add'
        }
      ]);
      setMiniCartShow(true);
      // addToast('Successfully added',{appearance:'success'});
    }
    
    


}

var checkprice=parseInt(homePrice && homePrice !==null ?  homePrice.replace(currency,""):0);

  return (
    <div className='product_page'>
      <PageTransition />
      <div className='container'>
        <div className='header'>
          <div className='top' style={{ textAlign:"left" }}>
            <div className='title'>{productDetails !== null ? productDetails.name:''}</div>
            <div className='date'>

               {productDetails !==null ?  <Moment format="D.M.YYYY" withTitle>
                 { productDetails.date && productDetails.date }
                </Moment>:''}

            </div>
          </div>
          <div className='details'>
          <div className='section_line_1'>
            <img src={require('../assets/images/productpage-line-1.png')} alt='' />
          </div>
            <div className='image'>
              {productDetails !==null ? productDetails.photos !==null ? <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${productDetails.photos.file_name}`} alt='' />:'':''}
            </div>
            {checkprice && checkprice !==null ? checkprice > 0? 
              <div className='actions'>
                <div className='price'><del>{homePrice && homePrice}</del></div>
                <div className='price'>{homeDiscountedPrice && homeDiscountedPrice}</div>
                {/* <span>inkl.  Mwst.</span> */}
                <button className='btn_primary bg icon' onClick={addtoCard}>In den Warenkorb <img src={require('../assets/icons/arrow.png')} /></button>
              </div>
            :"":''}


          </div>
          <div style={{ textAlign:'left' }}>

                <div dangerouslySetInnerHTML={{ __html: productDetails !==null ? productDetails.description:'' }} />
          </div>
        </div>

        <section className='categories'>
          <div className='content'>
             <div className='title'>Kategorien</div>
             <div className='items'>
                <span>
                        {category !==null ? category.map((category,index)=>{
                            return(
                                <React.Fragment key={index}>
                                    {category.name}
                                    <br/>
                                </React.Fragment>

                            );
                        }):''}
                    
                    </span>
             </div>
          </div>
        </section>

        <section className='featured'>
          <div className='title' style={{ display:"block",textAlign:"left" }}>Das könnte dich auch interessieren:</div>
          <div className='slider'>
            <OwlCarousel 
              className='owl-theme'
              items={1}
              nav={true}
              navText={['<img src="'+ArrowIcon+'" />', '<img src="'+ArrowIcon+'" />']}
              dots={false}
              loop={true}
            >
                {relatedProduct !==null ? 
                relatedProduct.map((product,index)=>{
                    return(
                            <Link to={`/product/${product.slug}`}   key={index}>
                              <div className='item'>
                                  <img src={product.photos !==null ? `${process.env.REACT_APP_BASE_URL_ASSET}/${product.photos.file_name}`:''} alt='' />
                              </div>
                            </Link>

                    );
                }):''}

            </OwlCarousel>
          </div>
        </section>
      </div>
    </div>
  )
}
