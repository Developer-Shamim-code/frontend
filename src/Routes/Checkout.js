import React, { useState , useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AOS from 'aos'
// Components 
import PageTransition from '../Components/PageTransition';
// CSS
import '../assets/css/checkout.css'
import Moment from 'react-moment';
import ReactStripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

export default function Checkout({addCart,setaddCart,currency,currencycode}) {
    const [stripeKey, setStripekey] = useState(null);
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/stripe-key`)
      .then((res)=>{
        setStripekey(res.data.data['stripekey']);
      })
      .catch((error)=>{
        console.log(error);
      });

      AOS.init({
        duration: 1000,
      })
    }, []);
     
    const getcartItems=addCart && addCart;
    const removeItem=(id)=>{
        const restore=addCart.filter(x=>x.id !== id);
        setaddCart(restore);
    }
    const [paymentMethod, setPaymentMethod] = useState('')
    let grandtotal=0;
    let shippingtotal=0;
    let totalprice=0;
    const [persionalInfo, setpersionalInfo] = useState({
        email:'',
        firstname:'',
        lastname:'',
        company:'',
        phone:'',
        street:'',
        postcode:'',
        city:'',
        country:'',

    });

    const navigate=useNavigate();
    //pay now
    const handleToken =(token,email,name,amount,shippingAddress)=>{
      
        const data={
           persionalinfo:persionalInfo,
           buyproduct:getcartItems,
           token:token,
           grandtotal:totalprice
       }
     
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/v2/save-stripe-token`,data)
            
            .then(response => { 
              
                if(response.data.data === 'success'){
                  setaddCart([]);
                  navigate('/archiv');
                  swal("Success", "Order has been completed.", "success");
                }
                // console.log(response.data.data);

            }).catch((error)=>{
              swal("Opps!", "Something went wrong!", "error");
                console.log(error);
            }); 
    }

    const changeHandler =(e)=>{
        setpersionalInfo({...persionalInfo,[e.target.name]:e.target.value});
    } 

    let code=currencycode !==''? currencycode:'USD';


    // Side content sticky
    useEffect(() => {
      if(!window.matchMedia('(max-width: 950px)').matches){
        window.addEventListener('scroll', handleScroll);
        document.querySelector('.checkout_page .sticky').classList.remove('remove_all');
      }
      else{
        document.querySelector('.checkout_page .sticky').classList.add('remove_all');
      }
    }, [])

    const handleScroll = () => {
      if(window.scrollY < 785){
        document.querySelector('.checkout_page .sticky').style.top = `${150 + window.scrollY}px`;
        document.querySelector('.checkout_page .sticky').classList.remove('remove_sticky');
      }
      else{
        document.querySelector('.checkout_page .sticky').classList.add('remove_sticky');
      }
    }
    
 
  return (
    <div className='checkout_page'>
      <PageTransition />
      <div className='container'>
        <div className='checkout_form'>
          <div  style={{ display:"block",textAlign:"left" }}><div className='page_title' data-aos='fade-up'>Kasse</div></div>
          <form className='default' style={{ textAlign:'left' }}>
            <div className='inputs'>
              <div className='input_container'>
                <label htmlFor='email'>Email*</label>
                <input className='w-50' type='email' name='email' onChange={changeHandler}  placeholder='Deine E-Mail-Adresse' />
              </div>
            </div>
            <div className='form_header'>
              <div className='title'>Lieferadresse</div>
            </div>
            <div className='inputs'>
              <div className='input_group'>
                <div className='input_container'>
                  <label htmlFor='first_name'>Vorname*</label>
                  <input type='text' id='first_name' name='firstname' onChange={changeHandler} placeholder='Dein Vorname' />
                </div>
                <div className='input_container'>
                  <label htmlFor='last_name'>Nachname*</label>
                  <input type='text' id='last_name' name='lastname' onChange={changeHandler}  placeholder='Dein Nachname*' />
                </div>
              </div>
              
              <div className='input_group'>
                <div className='input_container'>
                  <label htmlFor='company'>Firma (Optional)</label>
                  <input type='text' id='company' name='company' onChange={changeHandler}  placeholder='Firma' />
                </div>
                <div className='input_container'>
                  <label htmlFor='phone'>Telefonnummer (Optional)</label>
                  <input type='tel' id='phone' name='phone' onChange={changeHandler}  placeholder='Dein Telefonnummer' />
                </div>
              </div>
              <div className='input_container'>
                <label htmlFor='address'>Straße & Hausnummer*</label>
                <input type='text' id='address' name='street' onChange={changeHandler}  placeholder='Adresse' />
              </div>
              
              <div className='input_group'>
                <div className='input_container'>
                  <label htmlFor='postal_code'>Postleitzahl*</label>
                  <input type='number' id='postal_code' name='postcode' onChange={changeHandler}  placeholder='Postleitzahl' />
                </div>
                <div className='input_container'>
                  <label htmlFor='city'>Stadt*</label>
                  <input type='text' id='city' name='city' onChange={changeHandler}  placeholder='Stadt' />
                </div>
              </div>

              <div className='input_container'>
                <label htmlFor='country'>Land*</label>
                <input className='w-50' type='text' id='country'   name='country' onChange={changeHandler} placeholder='Land' />
              </div>

             
            </div>


            <div className='form_header'>
              <div className='title'>Zahlung</div>
              <p>Alle Transaktionen sind sicher und verschlüsselt.</p>
            </div>
            <div className='inputs payment_inputs'>
              <div className='input_container radio'>
                <div className='wrapper'>
                  <input type='radio' id='payment_method1' name='payment_method' value='credit_card' onChange={() => {setPaymentMethod('credit_card')}} checked />
                  <label className='checkbox' htmlFor='payment_method1' ></label>
                  <label htmlFor='payment_method1' className='d_flex'>Kreditkarte <img src={require('../assets/images/payment_cards.png')} height={25} /></label>
                </div>
                 
              </div>
            
            </div>
          </form>
        </div>
        <div className='sticky'>
        <div className='checkout_info'>
          <div className='items'>

            {getcartItems !==null ? getcartItems.map((item,index)=>{
                        
                        grandtotal+=item.price && parseFloat(item.price.replace(currency, ""));
                        shippingtotal+=item.shippingcost && parseFloat(item.shippingcost);
                       
                        totalprice+=item.price && parseFloat(item.price.replace(currency, ""));
                        totalprice+=item.shippingcost && parseFloat(item.shippingcost);
                       
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
            <div className='item'>
              <div className='subtotal'>Zwischensumme <span>{currency && currency+' '+grandtotal.toFixed(2)}</span></div>
              <div className='shipment'>Versandkosten <span>{currency && currency+' '+shippingtotal.toFixed(2)}</span></div>
            </div>
            <div className='total'><div className='title'>Gesamt <br />
             {/* <span>inkl. 20% Mwst</span> */}
            </div> <span>{currency && currency+' '+totalprice.toFixed(2)}</span></div>
                   {stripeKey !==null ? 
                   <ReactStripeCheckout
                     
                      amount={totalprice * 100} // cents
                      currency={code}
                      stripeKey={stripeKey}
                      token={handleToken} // submit callback  
    
                    >
                        <button  className='btn_primary bg icon'>Pay now</button>
                    </ReactStripeCheckout>
                    :''}
            {/* <Link to='/checkout/payment' className='btn_primary bg icon'>Bestellung aufgeben <img src={require('../assets/icons/arrow.png')} /></Link> */}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
