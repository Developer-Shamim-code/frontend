import React ,{useEffect, useState} from 'react';
import  { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../assets/css/form.css';
import luxy from 'luxy.js'

// Routes
import Home from "../Routes/Home";
import Archive from "../Routes/Archive";
import CategoryArchive from "../Routes/CategoryArchive";
import Product from "../Routes/Product";
import Checkout from "../Routes/Checkout";
// import OrderConfirm from "./routes/OrderConfirm";
import Imprint from "../Routes/Imprint";
import BlogArchive from "../Routes/BlogArchive";
import Blog from "../Routes/Blog";
import Search from "../Routes/Search";
import About from "../Routes/About";
import Contact from "../Routes/Contact";
import Privacy from "../Routes/Privacy";
import Payment from "../Routes/Payment";
import Shipping from "../Routes/Shipping";
import Terms from "../Routes/Terms"; 
import Notfound from '../Routes/404';

//config
import axios from 'axios';
import Preloader from './Preloader';
  
import { ToastProvider } from 'react-toast-notifications';

axios.defaults.headers.post['Content-Type'] = 'application/json'; 
 


const Master=()=>{
 
  const [logo,setLogo] = useState(null); 
  const [appname,setAppname] = useState(null);
  const [sitename,setSitename] = useState(null);
  const [logoblack,setLogdark] = useState(null);
  useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/business-logo`)
      .then((res)=>{
        setLogo(res.data.data['logo']); 
        setAppname(res.data.data['app_name']);
        setSitename(res.data.data['site_name']);
        setLogdark(res.data.data['log_dark']);
      })  
      .catch((error)=>{
        console.log(error);
      });
    },[]);
     
    useEffect(() => {
      document.title=sitename !==null ?  sitename && sitename.value:''; 
    }, [sitename]);


 
    
    const [showPreloader, setShowPreloader] = useState(true);
    const [mediaQuery, setMediaQuery] = useState(window.matchMedia("(min-width: 900px)").matches);
    
    useEffect(() => {
         
      if(window.matchMedia("(min-width: 1200px)").matches){
        luxy.init({
          wrapperSpeed: 0.056
        });
      }
    }, [])
  
    const preloaderInterval = setInterval(() => {
      if(window.showPreloader === false){
        clearInterval(preloaderInterval);
        setTimeout(() =>{
        //   document.querySelector('#preloader').classList.add('hide');
        }, 2000)
        setTimeout(() =>{
          setShowPreloader(false);
        }, 2500)
      }
    }, 100)

const [addCart, setaddCart] = useState([]);
    
//site currency
  const [currency, setcurrency] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/fetch-currency`)
    .then((res)=>{
      setcurrency(res.data.data['currency']);
    })
    .catch((error)=>{
      console.log(error);
    });
  }, []);
  const [addCount, setaddCount] = useState(0);
  const [miniCartShow, setMiniCartShow] = useState(false);


    const [categoryid, setcategoryid] = useState('default');
    return (
        <>
             
             {
                showPreloader ? 
                <Preloader /> :
                <></>

              }

              <head>
                <link rel="icon" href={logo !== null ? logo.image && `%PUBLIC_URL%/${process.env.REACT_APP_BASE_URL_ASSET}/${logo.image.file_name}`:null} />
                <link rel="apple-touch-icon"  href={logo !== null ? logo.image && `%PUBLIC_URL%/${process.env.REACT_APP_BASE_URL_ASSET}/${logo.image.file_name}`:null} />
              </head>

              <ToastProvider placement='top-right'> 
              <div className="app">
                    <div className='bgFixed'></div>
                    <Router>
                      <Navbar 
                          header_logo={logoblack !== null ? logoblack.image && `${process.env.REACT_APP_BASE_URL_ASSET}/${logoblack.image.file_name}`:null} 
                          header_logoblack={logo !== null ? logo.image && `${process.env.REACT_APP_BASE_URL_ASSET}/${logo.image.file_name}`:null} 
                          addCart={addCart} 
                          setaddCart={setaddCart}
                          currency={currency && currency.currency !==null ? currency.currency.symbol:''}
                          currencycode={currency && currency.currency !==null ? currency.currency.code:''}
                          miniCartShow={miniCartShow}
                          setMiniCartShow={setMiniCartShow}
                      />
                        <div className={mediaQuery ? "page_body luxy" : "page_body"} id='luxy'>
                          

                            <Routes>
                                <Route exact path="/" element={<Home categoryid={categoryid} setcategoryid={setcategoryid}  />} />
                                <Route exact path="/archiv" element={<Archive categoryid={categoryid} setcategoryid={setcategoryid} />} />
                                <Route exact path="/archiv/:category_id" element={<CategoryArchive  />} />
                        
                                <Route exact path="/product/:slug"  element={<Product setaddCart={setaddCart}  currency={currency && currency.currency !==null ? currency.currency.symbol:'$'}  setMiniCartShow={setMiniCartShow} addCart={addCart} addCount={addCount} setaddCount={setaddCount} />} />
                                <Route exact path="/product/search/:slug" element={<Search  />} />
                                <Route  exact
                                    path="/checkout"
                                    element={<Checkout 
                                      addCart={addCart} 
                                      setaddCart={setaddCart} 
                                      currency={currency && currency.currency !==null ? currency.currency.symbol:'$'} 
                                      currencycode={currency && currency.currency !==null ? currency.currency.code:''}
                                    />} 
                                />
                                {/* <Route path="/order-confirm" element={<OrderConfirm />} /> */}
                                <Route exact path="/imprint" element={<Imprint />} />
                                <Route exact path="/blogs" element={<BlogArchive />} />
                                <Route exact path="/blog/:slug" element={<Blog />} />
                                <Route exact path="/about" element={<About />} />
                                <Route exact path="/contact" element={<Contact />} />
                                <Route exact path="/privacy" element={<Privacy />} />
                                <Route exact path="/payment" element={<Payment />} />
                                <Route exact path="/shipping" element={<Shipping />} />
                                <Route exact path="/terms" element={<Terms />} />
                                <Route path='*' element={<Notfound />} />
                            </Routes>
                        </div>
                    <Footer 
                        footer_logo={logo !== null ?  logo.image && `${process.env.REACT_APP_BASE_URL_ASSET}/${logo.image.file_name}`:null} 
                        website_name={appname !==null ?  appname && appname.value:null}
                        site_name={sitename !==null ?  sitename && sitename.value:null}
                     />
                    </Router>
                </div>
                </ToastProvider> 
        </>
    );
}
export default Master;