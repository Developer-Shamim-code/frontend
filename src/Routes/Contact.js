import React, { useEffect,useState } from 'react'
import AOS from 'aos'
// Components 
import PageTransition from '../Components/PageTransition';
//  CSS
import '../assets/css/contact.css'
import axios from 'axios';
import swal from 'sweetalert';
export default function Contact() {

  const [pagedetails,setPagedetails] = useState(null);
  useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/frontend-page/${'contact'}`)
      .then((res)=>{
        setPagedetails(res.data.data);
      })  
      .catch((error)=>{
        console.log(error);
      });
  },[pagedetails]);
 


  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
    document.documentElement.scrollTop = 0;
  }, [])


  const [submitdata, setSubmitdata] = useState({
    fname:'',
    lname:'',
    email:'',
    phone:'',
    message:''
  });

  const changeHandler=(e)=>{
    setSubmitdata({...submitdata,[e.target.name]:e.target.value});
  }

  const [message, setMessage] = useState(false);

  const submitHandler=(e)=>{
    e.preventDefault();
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/v2/contact-submit`,submitdata)
      .then((res)=>{
      setSubmitdata({
              fname:'',
              lname:'',
              email:'',
              phone:'',
              message:''
            });

        if(res.data.data === 'success'){
          setMessage('success');

        }else{          
          setMessage('error');
        }
      })
      .catch((error)=>{
        setMessage('error');
        console.log(error);
      });
  }
 var titlelength=pagedetails && pagedetails.title.length/2-1;
  return (
    <div className='contact_page'>
      <PageTransition />
      <div className='container'>
        <div  style={{ display:"block",textAlign:"left" }} >
          

       
 <div data-aos='fade-up' style={{ 
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
          </div><br/>
          <div className='page_title' data-aos='fade-up'>
            {pagedetails !==null ? pagedetails.title.split("").map((title,index)=>{
                      if(titlelength < index){
                          return title;
                      }
              }):''}
          </div>
          </div>
        <div className='content'> 
         
            <div  dangerouslySetInnerHTML={{ __html: pagedetails !==null ? pagedetails.content:'' }} />
         

          <form className='contact_form default' onSubmit={submitHandler}>
            <div className='inputs'>
              <div className='input_group'>
                <div className='input_container'>
                  <label htmlFor='fname'>Vorname*</label>
                  <input type='text' id='fname' name='fname' value={submitdata.fname} onChange={changeHandler} placeholder='Dein Vorname' required />
                </div>
                <div className='input_container'>
                  <label htmlFor='lname'>Nachname*</label>
                  <input type='text' id='lname' name='lname' value={submitdata.lname} onChange={changeHandler} placeholder='Dein Nachname' required />
                </div>
              </div>
              <div className='input_group'>
                <div className='input_container'>
                  <label htmlFor='email'>E-Mail*</label>
                  <input type='email' id='email' name='email' value={submitdata.email} onChange={changeHandler} placeholder='Deine E-Mail-Adresse' required />
                </div>
                <div className='input_container'>
                  <label htmlFor='phone'>Telefonnummer</label>
                  <input type='tel' id='phone' name='phone' value={submitdata.phone} onChange={changeHandler} placeholder='Deine Telefonnummer' />
                </div>
              </div>
              <div className='input_container'>
                <label htmlFor='message'>Nachricht*</label>
                <textarea id='message' name='message' value={submitdata.message} onChange={changeHandler} placeholder='Deine Nachricht' required></textarea>
              </div>
            </div>
            {message === 'success'?
              <div className='alert alert-success' role="alert" style={{ fontSize:"20px" }}>
                    Contact submited succssfully.
              </div>:message ==='error'?
              <div className='alert alert-danger' role="alert" style={{ fontSize:"20px" }}>
                  Something went wrong.
              </div>:''
            }

            <div className='actions' style={{ overFlow:"hidden" }}>
              <button type='submit' className='btn_primary bg icon'>Senden <img src={require('../assets/icons/arrow.png')} /></button>
            </div>
          </form>
            
        </div>
      </div>
    </div>
  )
}
