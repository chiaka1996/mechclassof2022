import css from '../../../../Styles/dashboard.module.css';
import details from '../../../../Styles/profile.module.css';
import mobile from '../../../../styles/mobileSideBar.module.css'
import StudentSideBar from '../../../../Components/StudentSideBar';
import TopNavBar from '../../../../Components/TopNavbar';
import {useState, useEffect } from "react";
import {server} from '../../../../Config/index'
import { useRouter} from 'next/router'
import {userAuth} from "../../../../Contexts/AllContext"



const ViewPhoto = () => {
    const router = useRouter()

    const {mobileBar, profile} = userAuth()
    const {_id,surname} = profile
    let [message, setMessage] = useState<string>('')
    let [errMsg, setErrmsg] = useState<string>('')
    const [imageUrl, setImageUrl] = useState<string>('')
    let [loading, setLoading] = useState<boolean>(false)
  
const getPhoto = async () => {
    try{  
    const {cloudinaryId} = router.query;
   
    const apiRequest = await fetch(`../../../api/getsinglephoto/?cloudinaryId=${cloudinaryId}`)
    let result = await apiRequest.json();
    const {userId, imgUrl} = result.photo
    if(apiRequest.status === 200 && userId === _id ){
        return setImageUrl(imgUrl)
    }
    else{
        router.back()
    }
    }
    catch(error:any){
       router.back()
    }
}

const deletePhoto = async() => {
    try{
        setLoading(true)
        const{cloudinaryId} = router.query;
        const apiRequest = await fetch(`../../../api/deletephoto/?cloudinaryId=${cloudinaryId}`)
        let result = await apiRequest.json();
       
        if(apiRequest.status === 200  ){
            setLoading(false)
           router.back()
        }
        else{
            setLoading(false)
            alert(result.message)
        }

    }
    catch(error:any){
        setLoading(false)
        alert(error.message)
    }
} 


  const closeMsg = () => {
    // setMessage('')
    // setErrmsg('')
}

useEffect(()=>{
    if(!router.isReady) return;
    getPhoto();
   
}, [router.isReady]);


   
    return(
        <div>
            <div className={css.cover}>
            <div>
                <div className={css.sidebar}>
                    <StudentSideBar name='' />
                </div>
                <div className={mobileBar ? mobile.mobileSidebar : mobile.closeMobileBar}>
                <StudentSideBar  name=''/> 
                </div>
            </div>

            <div className={css.mainBody}>
            <div>
            <TopNavBar name='Gallery' surname={surname} />
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

            <div className={details.viewPhotoBody}>
            <div className={details.backwardDiv}>
                <img 
                src="https://img.icons8.com/external-outline-stroke-bomsymbols-/25/000000/external-arrow-digital-design-outline-set-2-outline-stroke-bomsymbols--2.png"
                alt='backward arrow'
                onClick={() => router.back()}
                />
                <div style={{width: '40%', textAlign: 'right'}}>
                {!loading ?  <img 
                src="https://img.icons8.com/sf-ultralight-filled/25/FF0000/filled-trash.png"
                alt="delete bin"
                onClick={deletePhoto}
                />: <div>
                <span className='loadingSpan' style={{backgroundColor: 'red'}}></span>
                <span className='loadingSpan' style={{backgroundColor: 'red'}}></span>
                <span className='loadingSpan' style={{backgroundColor: 'red'}}></span>
                </div> }
                </div>
                </div>
               <div className={details.imageDiv}>
              <img 
              src={imageUrl}
              className={details.viewphotoImage}
                />
            </div>
            </div>
        </div>
        </div>       
        </div>
    )
}

export default ViewPhoto