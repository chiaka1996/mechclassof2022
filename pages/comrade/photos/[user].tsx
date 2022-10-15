import css from '../../../Styles/dashboard.module.css';
import details from '../../../Styles/profile.module.css';
import mobile from '../../../styles/mobileSideBar.module.css'
import StudentSideBar from '../../../Components/StudentSideBar';
import VisitorSidebar from '../../../Components/VisitorSidebar';
import spinner from '../../../Styles/spinner.module.css'
import TopNavBar from '../../../Components/TopNavbar';
import {useState, useEffect } from "react";
import {server} from '../../../Config/index'
import { useRouter } from 'next/router'
import Pagination from '../../../Components/Pagination';
import {userAuth} from "../../../Contexts/AllContext"

interface data{
  _id: string | string[] | undefined,
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

interface comrade{
  surname: string | string[] | undefined,
  matric: string | string[] | undefined,
  _id: string | string[] | undefined
}

const Photos = () => {
    let [noGallery, setNoGallery] = useState<boolean>(false)
    let [message, setMessage] = useState<string>('')
    let [errMsg, setErrmsg] = useState<string>('')
    let [pictures, setPictures] = useState<pic[]>([])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [totalProduct, setTotalProduct] = useState<number>(0)
    const [prev, setPrev] = useState<number>(0)
    const [next, setNext] = useState<number>(0)
    const router = useRouter()
    const [comrade, setComrade] = useState<comrade>({
      surname: '',
      matric: '',
      _id: ''
    })
    const {loggedIn, mobileBar} = userAuth()
  
  
  // fetch all available user pictures
  const fetchAllgallery = async () => {
    try{  
       const {user,page} = router.query;
      const data:data = {
        _id: user,
        page: page,
        limit: 10
      }
      let response = await fetch(`${server}/api/usergallery`,{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })

    let result = await response.json()
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

//get profile details of comrade
const getProfileDetails = async () =>{
  try{
  const {user} = router.query;
  const apiRequest = await fetch(`../../api/getoneuser?id=${user}`)
  const response = await apiRequest.json()
  let {_id,surname,matric} = response.request
  if(apiRequest.status === 200){
      setComrade({
          surname,
          matric,
          _id
      })
  }
}
catch(error:any){
  setErrmsg('Network error')
}
}

useEffect(()=>{
    if(!router.isReady) return;
    getProfileDetails()
    fetchAllgallery()
}, [router.isReady]);

  const closeMsg = () => {
    setMessage('')
    setErrmsg('')
}


    return(
        <div>
            <div className={css.cover}>
            <div>
            <div className={css.sidebar}>
                {loggedIn ? <StudentSideBar name=''/> : <VisitorSidebar  name=''/>}
                </div>
                <div className={mobileBar ? mobile.mobileSidebar : mobile.closeMobileBar}>
                {loggedIn ? <StudentSideBar name=''/> : <VisitorSidebar  name=''/>}
                </div>
            </div>

            <div className={css.mainBody}>
            <div>
            <TopNavBar name={comrade.matric} surname={comrade.surname} />
            </div>

             {/* success message */}
             <div className={details.msgContainer}>
             <div className={message !== '' ? details.successMsg : details.emptyMsg}>
            <span>{message}</span>
            <button 
            style={{color: 'white'}}
            className={message !== '' ? details.closeTag : details.tag}
            onClick = {closeMsg}
            >
             &#10006;
             </button>
            </div>
            </div>

            {/* error message */}
            <div className={details.msgContainer}>
             <div className={errMsg !== '' ? details.errMsg : details.emptyMsg}>
            <span>{errMsg}</span>
            <button 
            style={{color: 'white'}}
            className={errMsg !== '' ? details.closeTag : details.tag}
            onClick = {closeMsg}
            >
             &#10006;
             </button>
            </div>
            </div>

            <div className={details.galleryBody}>
            {
                pictures.length>0 ?   <div className={details.photoGrid}>
                {pictures.map((pics:any, i) =>  <a
                key={i}
                href={pics.imgUrl}
                >
                <div className={details.photoHolder}>
                <img 
                  src={pics.imgUrl}
                  alt='description of comrade'
                  className={details.comradePics}
                  />
                </div>
                </a>)}        
            </div>: <div className={spinner.spinnerContainer}>
              { noGallery ? <div className={spinner.emptyGallery}> Gallery is empty</div> : 
              <div className={spinner.spinner}>
            </div> }  
            </div>
          }
          <div className={details.pagination}>
          <Pagination
          totalProduct={totalProduct}
          currentPage={currentPage} 
          products={pictures}
          prev={prev}
          next={next} 
          link='photo'
          comradeId={comrade._id}
         />
         </div>
            </div>
        </div>
        </div>
        
        </div>
)
}

export default Photos;