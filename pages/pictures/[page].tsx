import {server} from '../../Config/index'
import StudentSideBar from '../../Components/StudentSideBar';
import VisitorSidebar from '../../Components/VisitorSidebar';
import {userAuth} from "../../Contexts/AllContext"
import mobile from '../../styles/mobileSideBar.module.css'
import css from '../../styles/dashboard.module.css';
import details from '../../styles/profile.module.css';
import TopNavBar from '../../Components/TopNavbar';
import spinner from '../../styles/spinner.module.css'
import { useRouter } from 'next/router'
import GalleryPagination from '../../Components/GalleryPagination';
import {useState, useEffect } from "react";

interface data{
    page: number | string | string[] | undefined,
    limit: number | string | string[] | undefined
}

interface pic{
    cloudinaryId: string,
    imgUrl: string,
    userId: string,
    __v: number,
    _id: string
  } 

const Gallery = () => {
    let [pictures, setPictures] = useState<pic[]>([])
    let [noGallery, setNoGallery] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [totalProduct, setTotalProduct] = useState<number>(0)
    const [prev, setPrev] = useState<number>(0)
    const [next, setNext] = useState<number>(0)
    const {loggedIn, mobileBar, profile} = userAuth()
    const {_id,surname} = profile
   const router = useRouter();

    const getAllPictures = async () => {
        try{  
           const {page} = router.query;
           const data:data = {
             page: page,
             limit: 10
           }

           let apiRequest = await fetch(`../api/getallphotos`,{
             method: "POST",
             body: JSON.stringify(data),
             headers: {
               "Content-type": "application/json; charset=UTF-8"
           }
         })
     
         let result = await apiRequest.json()
         if(apiRequest.status === 200){
           const {results, totalProduct, current, next, previous} = result.data;
           results.length < 1 ? setNoGallery(true) : ''
           setPictures([...results])
           setTotalProduct(totalProduct)
           setCurrentPage(current)
           setNext(next.page)
           setPrev(previous.page)
         }
     
         if(apiRequest.status === 400){
           alert(result.message)
         }
     
         }catch(error:any){
           alert(error.message)
         }

    }

    useEffect(() => {
        if(!router.isReady) return;
        getAllPictures()
    },[router.isReady])
    
    return (
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
            <TopNavBar name='Gallery' surname={surname} />
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
          <GalleryPagination
          totalProduct={totalProduct}
          currentPage={currentPage} 
          products={pictures}
          prev={prev}
          next={next} 
          link='photo'
          comradeId=''
         />
         </div>
            </div>
        </div>
        </div>
        
        </div>
)
}

export default Gallery