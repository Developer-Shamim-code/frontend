import React, { useState, useEffect, useRef ,useMemo} from 'react'
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


export default function Archive({categoryid,setcategoryid}) {
 
           

          const [dateLoader, setdateLoader] = useState(false);
          //product fetch
          const [filter, setFilter] = useState({category_id:'default'});
          
          const [Products, setProducts] = useState(null);
          const [titleProducts, settitleProducts] = useState([]);
          const [category, setcategory] = useState([]);
          const [categorycount,setCategorycount] = useState(0);
          const [Featuredcategory, setFeaturedcategory] = useState([]);

          const [filterReload, setfilterReload] = useState(false);
          const [titileLoader, settitileLoader] = useState(false);
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

        
        const submitHandler=(e)=>{
            e.preventDefault();
        }

        const [filterMain, setfilterMain] = useState([]);
        
        const [productload, setproductload] = useState(false);
        useEffect(() => {
        
          axios.post(`${process.env.REACT_APP_BASE_URL}/api/v2/filter-products`,filterMain)
          .then((res)=>{
              if(filterMain.length > 0){
                setproductload(true);
              }
              if(productload === true){
                setProducts(res.data.data); 
               

             
              }
          })
          .catch((error)=>{
            console.log(error);
          });
        }, [filterMain,productload,filterReload]);
 
        const [selectReset, setselectReset] = useState(false);
        const [titileFilter, settitileFilter] = useState([]);
     
        useEffect(() => { 
           
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/fetch-products/${filter.category_id}`)
          .then((res)=>{
            if(productload === false && titileLoader === false && dateLoader ===false && categoryid==='default'){
              setProducts(res.data.data['fetchproduct']);
            }
           
           
            setcategory(res.data.data['product_category']);
            setCategorycount(res.data.data['categorycount']);
            setFeaturedcategory(res.data.data['featured_category']);
          })
          .catch((error)=>{
            console.log(error);
          });
        }, [Featuredcategory,productload,filter,titileFilter,titleProducts,titileLoader,dateLoader,categoryid]);
      //end product fetch
 


        useEffect(() => { 
            if(categoryid !== 'default'){
              axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/fetch-products/${categoryid}`,)
              .then((res)=>{
                setProducts(res.data.data['fetchproduct']); 
              })
              .catch((error)=>{
                console.log(error);
              });
            }

        }, [categoryid]);
      //end product fetch



            //title filtering start
            
            const [Requestdata, setRequestdata] = useState({search:''});
            const [titleProduct, settitleProduct] = useState([]);

            useEffect(() => {
                axios.post(`${process.env.REACT_APP_BASE_URL}/api/v2/title-products`,Requestdata)
                .then((res)=>{
                    settitleProduct(res.data.data);
                })
                .catch((error)=>{
                    console.log(error);
                });
            }, [Requestdata,titileFilter]);

          const titleSearchHandler=(e)=>{
            console.log(e.target.value);
            setRequestdata({...Requestdata,search:e.target.value});
          }

            
      

            const titlefilterHandler=(id,title,issue)=>{
                settitileLoader(true);
                var check=titileFilter.filter(x=>x.id ===id);
                if(check.length > 0){
                    var noting='noting';
                }else{
                  settitileFilter([...titileFilter,{id:id,title:title,issue:issue}]);
                }
            }

            const [output, setoutput] = useState([]);
            const [outputfilter, setoutputfilter] = useState([]);
            useEffect(() => {
                axios.post(`${process.env.REACT_APP_BASE_URL}/api/v2/filter-output`,titileFilter)
                .then((res)=>{
                    setoutput(res.data.data);;
                })
                .catch((error)=>{
                    console.log(error);
                });
            }, [titileFilter]);

            const filtercount=Featuredcategory.length+titleProduct.length+output.length;

            const outputissueHandler=(issue)=>{
                  const outputcheck =outputfilter.filter(x=>x.issue === issue);
                  if(outputcheck.length > 0){
                      const notings='nothing';
                  }else{
                      setoutputfilter([...outputfilter,{issue:issue}]);
                  }
            }



      const passtitledata= {product:output.length > 0? output:null,issue:outputfilter.length > 0? outputfilter:null};

      useEffect(() => {
          axios.post(`${process.env.REACT_APP_BASE_URL}/api/v2/title-filter-products`,passtitledata)
          .then((res)=>{
              settitleProducts(res.data.data);
              if(titileLoader === true){
                  setProducts(res.data.data);
              }
          })
          .catch((error)=>{
              console.log(error);
            });
        }, [passtitledata,titileLoader]);
         

  //year month and week filtering
  const date=new Date();
  let year=date.getFullYear();
  let years=[];
  for (let index = 1970;  year >= index; year--) {
    years.push(year); 
  } 
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  const weeks=['st','nd','rd','th'];

  const [yearFilters, setyearFilter] = useState([]);
  const [monthFilters, setmonthFilter] = useState([]);
  const [weekFilters, setweekFilter] = useState([]);

  const yearFilter=(year)=>{
      const check=yearFilters.filter(x=>x === year);
      if(check.length > 0){
        const n='nothing';
      }else{
        setyearFilter([...yearFilters,year]);
      }
  }


  const monthFilter=(month)=>{
      const check=monthFilters.filter(x=>x === month);
      if(check.length > 0){
        const n='nothing';
      }else{
        setmonthFilter([...monthFilters,month]);
      }
  }

  const weekFilter=(week)=>{
    const check=weekFilters.filter(x=>x === week);
      if(check.length > 0){
        const n='nothing';
      }else{
        setweekFilter([...weekFilters,week]);
      }
  }

  let datewisedata={year:yearFilters.length > 0? yearFilters:null,month:monthFilters.length > 0? monthFilters:null,week:weekFilters.length > 0? weekFilters:null}
  useEffect(() => {
   
    if(yearFilters.length > 0){
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/v2/date-filtering-products`,datewisedata)
        .then((res)=>{
            setdateLoader(true);
            if(dateLoader === true){
                setProducts(res.data.data);
            }
          
        })
        .catch((error)=>{
            console.log(error);
          });
    }


  }, [datewisedata,yearFilters.length,dateLoader]);
 
         

  const dataReset=()=>{

    
      setyearFilter([]);
      setmonthFilter([]);
      setweekFilter([]);


      setdateLoader(false);

      setfilterMain([]);
      setselectReset(true);
      setproductload(false);
      
  }





   //modal
   useEffect(() => {
     document.querySelectorAll('.filters .drop_btn').forEach(function(el) {
       el.addEventListener('click', function() {
         this.classList.toggle('active')
         this.nextElementSibling.classList.toggle('show')
       })
     })
 
     $(selectRef.current).niceSelect();
 
     document.documentElement.scrollTop = 0;
   }, [titleProduct.length])
   //end modal


   // console.log(Products,categoryid);

  return (
    <>
    
    <PageTransition />
    <div className='archive_page'>
      <div className='container'>
        <button className='btn_primary w-100 filters_toggle_btn' onClick={() => {setFiltersShow(true)}}>Filters</button>
      </div>
      <div className='container'>
        <div className={filtersShow? 'left show' : 'left'}>
          <div className='filters'>
            <div className='close_btn' onClick={() => {setFiltersShow(false)}}><img src={CloseIcon} /></div>
            <div className='default'>
              <div className='inputs'>
                <form  className="default" onSubmit={submitHandler}>
                  <div className='input_container'> 
                    <input type='text' name='search' onChange={searchHandler} placeholder='Suchbegriff eingeben ...' />
                  </div>
                </form>
                 <form  className='default'>
                  <div className='input_container'>
                    <div className='filters_container'>

                <div className="titlefilter">

                    <div className='filter title'>
                      <div className='select'>
                        <div className='btn drop_btn'>Titel <span><span className='notify'>{titileFilter.length}</span><img src={ArrowIcon} /></span></div>
                        <div className='options'>
                          <div className='input'>
                            <input type='text' placeholder='Persönlichkeiten suchen ...' name='titlesearch' onChange={titleSearchHandler} />
                          </div>
                          <div className='items' style={titleProduct && titleProduct.length > 6? {overflowY:'scroll',height:'200px'} :{}}>
                            {titleProduct && titleProduct.map((ptitle,index)=>{
                                return(
                                        <button key={index} type="button" onClick={()=>titlefilterHandler(ptitle.id,ptitle.name,ptitle.issue)} >{`${ptitle.name.substring(0,25)}`}</button> 
                                      );
                            })}
                          </div>
                          <div className='actions'> 
                                <button type='button' className='btn_primary w-100 an' onClick={()=>{settitileLoader(false);settitileFilter([]);setoutputfilter([]);}} style={{background: '#2B2A2A', color: 'white', cursor: 'pointer',marginBottom:"5px"}}>Filter zurücksetzen</button>
                            </div>
                        </div>
                      </div>
                     {output && output.length > 0? <>
                      <span className='line' style={{ marginLeft:"20px",borderLeft:"2px solid black",height:"60px" }}></span>
                        <div className='sub_select'>
                          <div className='btn drop_btn'>Ausgabe  <span><span className='notify'>{outputfilter.length}</span><img src={ArrowIcon} /></span></div>
                          <div className='options'>
                           
                            <div className='items' style={output && output.length > 6? {overflowY:'scroll',height:'200px'} :{}}>
                              {output.map((issue,index)=>{
                                if(issue.issue !==null){
                                    return  <button key={index} type="button" onClick={()=>outputissueHandler(issue.issue)} >{issue.issue}</button> ;
                                }
                              })}
                            </div>
                            <div className='actions'> 
                                <button type='button' className='btn_primary w-100 an' onClick={()=>setoutputfilter([])} style={{background: '#2B2A2A', color: 'white', cursor: 'pointer',marginBottom:"5px"}}>Filter zurücksetzen</button>
                            </div>

                          </div>
                        </div></>:''
                      }

                    </div>

                </div>

                <div className="featuredfilter">


                        {Featuredcategory && Featuredcategory.length > 0 ? Featuredcategory.map((category,index)=>{
                            return(
                                  <div className='filter featured' key={index}>
                                    <div className='select'> 
                                            <Children 
                                                    category_id={category.id} 
                                                    filterMain={filterMain} 
                                                    setfilterMain={setfilterMain} 
                                                    category={category} 
                                                    setFilter={setFilter}  
                                                    selectReset={selectReset} 
                                                    setselectReset={setselectReset} 
                                                    filterReload={filterReload} 
                                                    setfilterReload={setfilterReload} 
                                                    setproductload={setproductload} 
                                                    selectRef={selectRef}
                                            /> 
                                    </div>
                                  </div>
                                );
                        }):''}

                </div>

                          <YearFilter  
                             setyearFilter={setyearFilter}
                             setmonthFilter={setmonthFilter}
                             setweekFilter={setweekFilter}
                             setdateLoader={setdateLoader}
                             years={years}
                             months={months}
                             weeks={weeks}
                             yearFilter={yearFilter}
                             monthFilter={monthFilter}
                             weekFilter={weekFilter}
                             selectRef={selectRef}
                             yearFilters={yearFilters}
                             monthFilters={monthFilters}
                             weekFilters={weekFilters}

                          />
                     </div>
                  </div>


                  </form>
              
              </div>

              <div className='actions'> 
                <button type='button' onClick={dataReset} className='btn_primary w-100 an' style={{background: '#2B2A2A', color: 'white', cursor: 'pointer'}}>Filter zurücksetzen</button>
              </div>
            </div>
          </div>
        </div>
        <div className='right'>
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
                        <img src={`${process.env.REACT_APP_BASE_URL_ASSET}/${product.thumbnail !==null? product.thumbnail.file_name:''}`} alt={product.name.length > 20 ? `${product.name.substring(0,20)}...`:product.name}  />
                        <div className='title'>{product.name.length > 20 ? `${product.name.substring(0,20)}...`:product.name}</div>
                        <span>  
                            {/* <Moment format="D/M/YYYY" withTitle>
                              {product !==null ? product.updated_at:''}
                            </Moment>  */}
                             {product !==null ? product.month !==null ? product.month:'':''}/{product !==null ? product.year !==null ? product.year:'':''} | {product !==null ? product.issue !==null ? product.issue:'':''}
                        </span>
                      </Link>
                  );
                }):''
            }
        </div>

        <div className='pagination'>
          {currentPage > 1? <img src={require('../assets/icons/arrow.png')} style={{transform: 'rotate(180deg)'}} alt='' onClick={()=> {setcurrentPage(currentPage-1); window.scrollTo(0, 0)}} />:''}
            <span>Seite {currentPage} von {totalPage !==0? totalPage:currentPage}</span>
               {currentPage < totalPage? <img src={require('../assets/icons/arrow.png')} alt='' onClick={()=>{setcurrentPage(currentPage+1); window.scrollTo(0, 0)}} />:''}
          </div>
      </div>
    </div>
    </div>
    </>
    
  )
}


const Children =({
    category_id,
    filterMain,
    setfilterMain,
    category,
    setFilter,
    selectReset,
    setselectReset,
    filterReload,
    setfilterReload,
    setproductload,
    selectRef
})=>{
    const [childrens, setchildren] = useState([]);
    const [searchCategory, setsearchCategory] = useState('default');
    const [limit, setlimit] = useState(6);
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/fetch-children-category/${category_id}/${searchCategory}/${limit}`)
        .then((res)=>{
          setchildren(res.data.data['children']);  
        })
        .catch((error)=>{
                console.log(error);
        });
    }, [category_id,searchCategory,limit]);
 
 
 
    if(searchCategory ===''){
      setsearchCategory('default2');
    }

    const searchHandle=(e)=>{ 
        setsearchCategory(e.target.value);
        
    }



    const [filterStore, setfilterStore] = useState([]);
      useEffect(() => {
     
             filterStore.filter(x=>setfilterMain([...filterMain,x]));
      }, [filterStore]);

 
      
    const handleFilter=(child_id,name)=>{
        const check=filterStore.filter(x=>x.child_id === child_id);
      
        if(check.length > 0){

        }else{
            setfilterStore([...filterStore,{category_id:category_id,child_id:child_id,name:name}]);
        }
    }
  
    useEffect(() => {
      if(selectReset === true){
        setfilterStore([]);
        setselectReset(false);
      }
    }, [selectReset]);


    //reset filter wise
     const [resetData, setresetData] = useState([]);
     useEffect(() => {
          setfilterMain(resetData);
     }, [resetData]);
 

     
    const resetHandle=()=>{
      const data=filterMain.filter(x=>x.category_id !==category_id);
      setresetData(data);
      if(data.length > 0){

      }else{
        setproductload(false);
      }
      setfilterReload(true);
      setfilterStore([]);
    }


    
              useEffect(() => {
                document.querySelectorAll('.drop_btn').forEach(function(el) {
                  el.addEventListener('click', function() {
                    this.classList.toggle('active')
                    this.nextElementSibling.classList.toggle('show')
                  })
                })
            
            
                $(selectRef.current).niceSelect();
            
                document.documentElement.scrollTop = 0;
          
                }, [childrens.length]);  
    return (
          <>
             <div className='btn drop_btn'  >{category.name} <span><span className='notify'>{filterStore.length}</span><img src={ArrowIcon} /></span></div>
              <div className='options'>
                  <div className='input'>
                    <input type='text' placeholder='Persönlichkeiten suchen ...' name='searchcategory' onChange={searchHandle} />
                  </div>
                  <div className='items' style={childrens && childrens.length > 6? {overflowY:'scroll',height:'200px'} :{}}> 
                      {childrens && childrens.map((child,index)=>{
                          return ( 
                            <button key={index} type="button" onClick={()=>handleFilter(child.id,child.name)} >{child.name && child.name}</button> 
                          );
                      })}
                  </div>
                  <div className='actions'>
                  
                    <button type='button' className='btn_primary w-100 an' onClick={resetHandle} style={{background: '#2B2A2A', color: 'white', cursor: 'pointer',marginBottom:"5px"}}>Filter zurücksetzen</button>
                  </div>
              </div>

          </>
    )
}



const YearFilter=({
  setyearFilter,
  setmonthFilter,
  setweekFilter,
  setdateLoader,
  years,
  months,
  weeks,
  yearFilter,
  monthFilter,
  weekFilter,
  selectRef,
  yearFilters,
  monthFilters,
  weekFilters
})=>{


  
  useEffect(() => {
    document.querySelectorAll('.drop_btn').forEach(function(el) {
      el.addEventListener('click', function() {
        this.classList.toggle('active')
        this.nextElementSibling.classList.toggle('show')
      })
    })


    $(selectRef.current).niceSelect();

    document.documentElement.scrollTop = 0;

    }, [years.length]);  


  return (


          <div className="yearfilter">

                <div className='filter years'>
                    <div className='select'>
                      <div className='btn drop_btn'>Jahr <span><span className='notify'>{yearFilters.length}</span> <img src={ArrowIcon} /></span></div>
                      <div className='options'>
                        
                        <div className='items'  style={years.length >6? {overflowY:'scroll',height:'200px'} :{}}>
                        {
                          years.map((year,index)=>{
                              return (
                                    <button key={index} type="button" onClick={()=>yearFilter(year)}>{year && year}</button> 
                              );
                          })
                        }
                          
                        </div>
                        <div className='actions'> 
                          <button type='button' onClick={()=>{setyearFilter([]);setmonthFilter([]);setweekFilter([]);setdateLoader(false);}} className='btn_primary w-100 an' style={{background: '#2B2A2A', color: 'white', cursor: 'pointer'}}>Filter zurücksetzen</button>
                        </div>
                      </div>
                    </div>
                      <span className='line' style={{ marginLeft:"20px",borderLeft:"2px solid black",height:"60px" }} ></span>
                      <div className='sub_select'>
                        <div className='btn drop_btn'>Monat  <span><span className='notify'>{monthFilters.length}</span> <img src={ArrowIcon} /></span></div>
                        <div className='options'>
                          {/* <div className='input'>
                            <input type='text' placeholder='Persönlichkeiten suchen ...' />
                          </div> */}
                          <div className='items' style={months.length >6? {overflowY:'scroll',height:'200px'} :{}} >
                            {months && months.map((month,index)=>{
                              return(
                                  <button key={index} type="button" onClick={()=>monthFilter(index+1)}>{month}</button> 
                              );
                            })}
                          </div>
                          <div className='actions'> 
                          <button type='button' onClick={()=>{setmonthFilter([]);setweekFilter([]);}} className='btn_primary w-100 an' style={{background: '#2B2A2A', color: 'white', cursor: 'pointer'}}>Filter zurücksetzen</button>
                        </div>
                        </div>
                      </div>
                      <span className='line sublines' style={{ marginLeft:"20px",borderLeft:"2px solid black" }} ></span>
                      <div className='sub_select'>
                        <div className='btn drop_btn'>Woche  <span><span className='notify'>{weekFilters.length}</span> <img src={ArrowIcon} /></span></div>
                        <div className='options'> 
                          <div className='items'>
                            {weeks && weeks.map((week,index)=>{
                              return (
                                    <button key={index} type="button" onClick={()=>weekFilter(index+1)}>{index+1}{week} week</button> 

                              );
                            })}
                          </div>
                          <div className='actions'> 
                            <button type='button' onClick={()=>setweekFilter([])} className='btn_primary w-100 an' style={{background: '#2B2A2A', color: 'white', cursor: 'pointer'}}>Filter zurücksetzen</button>
                          </div>
                        </div>
                      </div>
                </div>
            </div>

  );
}