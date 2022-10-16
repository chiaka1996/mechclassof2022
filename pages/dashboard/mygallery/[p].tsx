import dashboardcss from '../../../Styles/dashboard.module.css';
import profiledetails from '../../../Styles/profile.module.css';
import mobilecss from '../../../styles/mobileSideBar.module.css'
import StudentSideBar from '../../../Components/StudentSideBar';
import spinner from '../../../Styles/spinner.module.css'
import TopNavBar from '../../../Components/TopNavbar';
import {useState, useEffect } from "react";
import {server} from '../../../Config/index'
import { useRouter } from 'next/router'
import Pagination from '../../../Components/Pagination';
import {userAuth} from "../../../Contexts/AllContext"
let FormData = require('form-data');
import Link from 'next/link';

interface data{
  _id: string,
  page: string | string[] | undefined,
  limit: number
}

interface pic{
  cloudinaryId: string,
  imgUrl: string,
  userId: string,
  __v: number,
  _id: string
}

const MyGallery = () => {
    let [loading, setLoading] = useState<boolean>(false)
    let [noGallery, setNoGallery] = useState<boolean>(false)
    let [message, setMessage] = useState<string>('')
    let [errMsg, setErrmsg] = useState<string>('')
    let [img, setImg] = useState<any>('')
    let [pictures, setPictures] = useState<pic[]>([])
    let [pages, setPage] = useState<string | string[] | undefined>('')
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [totalProduct, setTotalProduct] = useState<number>(0)
    const [prev, setPrev] = useState<number>(0)
    const [next, setNext] = useState<number>(0)
    const router = useRouter()
    const {mobileBar, profile} = userAuth()
    const {_id,surname} = profile
  
  // fetch all available pictures
  const fetchAllgallery = async () => {
    try{  
       const {p} = router.query
      const data:data = {
        _id,
        page: p,
        limit: 10
      }
      let response = await fetch('../../api/usergallery',{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })

    let result = await response.json()
    console.log(result)
    if(response.status === 200){
      const {results, totalProduct, current, next, previous} = result.data;
      results.length < 1 ? setNoGallery(true) : ''
      setPictures([...results])
      setTotalProduct(totalProduct)
      setCurrentPage(current)
      setNext(next.page)
      setPrev(previous.page)
    }

    if(response.status === 400){
      setErrmsg(result.message)
    }

    }catch(error:any){
      setErrmsg(error.message)
    }
}

useEffect(()=>{
    if(!router.isReady) return;
    fetchAllgallery()
}, [router.isReady, message, errMsg]);


     const handleFile = (e:any) => {
      let image = e.target.files[0];
      setImg(image)
      setMessage('')
      setErrmsg('')
    
  }

  const closeMsg = () => {
    setMessage('')
    setErrmsg('')
}

    const submitBtn = async () => {
      try{
        setLoading(true)
        setMessage('')
        setErrmsg('')
        setImg('')
        
        if(!img){
          setLoading(false)
          setMessage('')
          setErrmsg('please add Image')
          return false;
        }

        if (!img.name.match(/\.(jpg|jpeg|png|gif)$/)) {
          setLoading(false)
          setMessage('')
          setErrmsg('please selet a valid image');
          return false;
        }

        let formdata = new FormData();
        formdata.append('image', img)
        formdata.append('_id', _id)

        let response = await fetch(`${server}/api/upload`,{
          method: "POST",
          body: formdata,
      })
      let result = await response.json()
      if(response.status === 200){
        setLoading(false)
        setMessage(result.message)
      }

      if(response.status === 400){
        setLoading(false)
        setErrmsg(result.message)
      }

      if(response.status === 500){
        setLoading(false)
        setErrmsg('Network error')
      }

    }
    catch(error:any){
      setLoading(false)
      setErrmsg(error.message)
    }
    }
    return(
        <div>
            <div className={dashboardcss.cover}>
            <div>
                <div className={dashboardcss.sidebar}>
                    <StudentSideBar name='Gallery' />
                </div>
                <div className={mobileBar ? mobilecss.mobileSidebar : mobilecss.closeMobileBar}>
                <StudentSideBar  name='Gallery'/> 
                </div>
            </div>

            <div className={dashboardcss.mainBody}>
            <div>
            <TopNavBar name='Gallery' surname={surname} />
            </div>

            {/* error message */}
            <div className={profiledetails.msgContainer}>
             <div className={errMsg !== '' ? profiledetails.errMsg : profiledetails.emptyMsg}>
            <span>{errMsg}</span>
            <button 
            style={{color: 'white'}}
            className={errMsg !== '' ? profiledetails.closeTag : profiledetails.tag}
            onClick = {closeMsg}
            >
             &#10006;
             </button>
            </div>
            </div>

            {/* success message */}
            <div className={profiledetails.msgContainer}>
             <div className={message !== '' ? profiledetails.successMsg : profiledetails.emptyMsg}>
            <span>{message}</span>
            <button 
            style={{color: 'white'}}
            className={message !== '' ? profiledetails.closeTag : profiledetails.tag}
            onClick = {closeMsg}
            >
             &#10006;
             </button>
            </div>
            </div>

            <div className={profiledetails.galleryBody}>
            <div>
            <input type='file'
            name='picture'
            onChange={handleFile}
            />
            <button 
            className={profiledetails.photoBtn}
            onClick={submitBtn}
            >
            {!loading ? 'Add Photo' : <div>
            <span className='loadingSpan'></span>
            <span className='loadingSpan'></span>
            <span className='loadingSpan'></span>
            </div> }
            </button>
            </div>

            {
                pictures.length>0 ?   <div className={profiledetails.photoGrid}>
                {pictures.map((pics:any, i) =>  <Link
                key={i}
                href={`/dashboard/mygallery/viewphoto/${pics.cloudinaryId}`}
                >
                <div className={profiledetails.photoHolder}>
                <img 
                  src={pics.imgUrl}
                  alt='description of comrade'
                  className={profiledetails.comradePics}
                  />
                </div>
                </Link>)}        
            </div>: <div className={spinner.spinnerContainer}>
              { noGallery ? <div className={spinner.emptyGallery}> Your Gallery is empty</div> : 
              <div className={spinner.spinner}>
            </div> }  
            </div>
          }
          <div className={profiledetails.pagination}>
          <Pagination
          totalProduct={totalProduct}
          currentPage={currentPage} 
          products={pictures}
          prev={prev}
          next={next} 
          link='gallery'
          comradeId=""
         />
         </div>
            </div>
        </div>
        </div>       
        </div>
    )
}

export default MyGallery