import css from '../../Styles/dashboard.module.css';
import details from '../../Styles/profile.module.css';
import spinner from '../../Styles/spinner.module.css'
import write from '../../Styles/Comments.module.css';
import load from '../../Styles/loading.module.css'
import StudentSideBar from '../../Components/StudentSideBar';
import VisitorSidebar from '../../Components/VisitorSidebar';
import mobile from '../../styles/mobileSideBar.module.css'
import TopNavBar from '../../Components/TopNavbar';
import Photos from '../../Components/Photos';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useState, useEffect } from "react";
import { useRouter } from 'next/router'
import {userAuth} from "../../Contexts/AllContext"
import comment from '../../Model/Comments';
import Link from 'next/link';
// import DeleteComment from '../api/deletecomment';



interface storage{
    _id:  string,
    surname:  string,
    lastname:  string,
    nickname:  string,
    bio:  string,
    matric:  string,
    image:  string,
    cloudinaryId:  string,
}

interface comment{
    userId: string | string[] | undefined,
    senderId: string,
    senderSurname: string,
    senderLastname: string,
    senderNickname: string,
    comment: string,
    senderPics: string
}

interface commentItems{
    userId: string | string[] | undefined,
    senderId: string,
    senderSurname: string,
    senderLastname: string,
    comment: string,
    senderNickname: string,
    senderPics: string,
    __v: number,
    _id: string
}

const Studentprofile = () => {
    const space = ' '
    const router = useRouter();
    const {loggedIn, mobileBar, profile} = userAuth()
    const {_id , surname, lastname, nickname, bio, matric, image, cloudinaryId} = profile
    const [show, setShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    let [message, setMessage] = useState<string>('')
    let [errMsg, setErrmsg] = useState<string>('')
    const [photoId, setPhotoId] = useState<string | string[] | undefined>('')
    const [comrade, setComrade] = useState<storage>({
        _id: '',
        surname: '',
        lastname: '',
        nickname: '',
        bio: '',
        matric: '',
        cloudinaryId: '',
        image: ''
    })

    const [comments, setComents] = useState<commentItems[]>([])

    const [commentDetails, setCommentDetails] = useState<comment>({
        userId: '',
        senderId: '',
        senderSurname: '',
        senderLastname: '',
        comment: '',
        senderNickname: '',
        senderPics: ''
    })

    // close alert message
    const closeMsg = () => {
        setMessage('')
        setErrmsg('')
    }
    

    //delete comment
    const commentDelete = async (deleteId: string | undefined) => {
        try{
        setLoading(true)
        const deleteRequest = await fetch(`../api/deletecomment?_id=${deleteId}`)
        let result = await deleteRequest.json()
        if(deleteRequest.status === 200){
            setLoading(false)
            setMessage(result.message)
        }
        else{
           setErrmsg(result.message)
            setLoading(false)
        }
    }
    catch(error:any){
        setLoading(false)
        setErrmsg(error.message)
    }
    }

    // get all comments
    const getcomments =  async () =>{
        try{
        const {id} = router.query;
        const apiRequest = await fetch(`../api/getallcomments?userId=${id}`)
        const response = await apiRequest.json()
        let {request} = response
        if(apiRequest.status === 200){
            setComents(()=>[...request])
        }
    }catch(error:any){
        setErrmsg(error.message)
    }
    }

    //get profile details of comrade
    const getProfileDetails = async () =>{
        try{
        const {id} = router.query;
        const apiRequest = await fetch(`../api/getoneuser?id=${id}`)
        const response = await apiRequest.json()
        let {_id, surname, lastname, nickname, bio, matric, image, cloudinaryId} = response.request
        if(apiRequest.status === 200){
            setComrade({
                _id,
                surname,
                lastname,
                image,
                cloudinaryId,
                nickname,
                bio,
                matric
            })

        }
    }
    catch(error:any){
        setErrmsg('Network error')
    }
    }

    useEffect(() => {
        if(!router.isReady) return;    
        const {id} = router.query;

        getProfileDetails()
        getcomments()
        setPhotoId(id)

        if(loggedIn){
        setCommentDetails({
            userId: id,
            senderId: _id,
            senderSurname: surname,
            senderLastname: lastname,
            senderNickname: nickname,
            comment: '',
            senderPics: image
        })
    }    
        
    },[router.isReady,message,errMsg])

    const onChangeComment = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = e.target.value
        setCommentDetails({
            ...commentDetails,
            comment: value
        })
    }

    const handleShow = () => setShow(true);

    const handleHide = () => setShow(false);

    const handleClose = async() =>{
        try{
            setLoading(true)
            if(!commentDetails.comment){
                setLoading(false)
                setShow(false);
                setErrmsg('comment cannot be empty')
                return
            }
                
            let response = await fetch(`../api/addcomments`,{
                method: "POST",
                body: JSON.stringify(commentDetails),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
    
            let result = await response.json()
            if(response.status === 200){
                setMessage(result.message)
                setLoading(false)
                setShow(false)        
            }  
            else{
                setErrmsg(result.message)
                setLoading(false)
                setShow(false) 
            }      
        }
        catch(error:any){
            setLoading(false)
            setErrmsg(error.message)
        }
    }
    return(
        <div>
         { comrade._id.length > 0 ? <div className={css.cover}>
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
            <TopNavBar name={comrade.matric} surname={comrade.surname}/>
            </div>
            {/* error message */}
            <div className={details.msgContainer}>
             <div className={errMsg !== '' ? details.errMsg : details.emptyMsg}>
            <span>{errMsg}</span>
            <span   
            className={errMsg !== '' ? details.closeTag : details.tag}
            >
            <img 
            src="https://img.icons8.com/external-others-inmotus-design/30/FFFFFF/external-Cancel-round-icons-others-inmotus-design-9.png"
            alt='cancel'
            onClick = {closeMsg}
            />
             </span>
            </div>
            </div>

             {/* success message */}
             <div className={details.msgContainer}>
             <div className={message !== '' ? details.successMsg : details.emptyMsg}>
            <span>{message}</span>
            <span 
            className={message !== '' ? details.closeTag : details.tag}
            >
             <img 
            src="https://img.icons8.com/external-others-inmotus-design/30/FFFFFF/external-Cancel-round-icons-others-inmotus-design-9.png"
            alt='cancel'
            onClick = {closeMsg}
            />
             </span>
            </div>
            </div> 

            <div className={css.subBody}>
            <div className={css.commentGrid}>
            <div className={css.wallpaper}>
                <div className={css.imgContainer}>
                <img
                src={comrade.image.length > 1 ? comrade.image : 'https://res.cloudinary.com/chiaka/image/upload/v1664259165/person-icon-person-icon-17_o9gnwh.jpg'}
                alt='profile pics'
                width="100px"
                height='100px'
                />
                </div>
            </div>
            <div className={css.editProfile}>
                <Link href={`/comrade/photos/${photoId}?page=1`}>
                <button className={css.photoBtn}>Photos</button>
                </Link>
                {loggedIn ? <button 
                className={css.addCommentBtn}
                onClick={handleShow}
                >
                Add comment
                </button> : ''}
            </div>
            <div className={css.profilePicsName}>
            <span>{comrade.surname}{space}{comrade.lastname}</span><br/>
            <span className={css.nickname}>{comrade.nickname}</span>
            </div>

            <div className={css.bio}>
            {comrade.bio}
            </div>

            <div className={css.commentHeader}>
            {comments.length} comment{comments.length > 1 ? 's':''}
            </div>
            {/* list of comments */}
            {comments.length > 0 ? <div> {comments.map((comment, i) => <div key={i} className={css.commentHouse}>
                <div className={css.commentImg}>
                <img
                src={comment.senderPics.length > 1 ? comment.senderPics : 'https://res.cloudinary.com/chiaka/image/upload/v1664259165/person-icon-person-icon-17_o9gnwh.jpg'}
                alt='profile pics'
                width="45px"
                height='45px'
                />
               
                <div className={css.commentFlex}>
                <div className={css.commentHead}>
                <div>{comment.senderSurname + " " + comment.senderLastname} </div>
                {loggedIn && _id === comment.senderId ? <div  onClick={ () => commentDelete(comment._id)}>
                {!loading ? <img src="https://img.icons8.com/ios-glyphs/16/ff0000/filled-trash.png"
                alt="delete bin"
                style={{cursor: 'pointer'}}
            /> : <div className={css.loadingContainer} >
                <span className={load.loadingSpan} style={{backgroundColor: 'red'}}></span>
                <span className={load.loadingSpan} style={{backgroundColor: 'red'}}></span>
                <span className={load.loadingSpan} style={{backgroundColor: 'red'}}></span>
            </div> }
                </div> : <span></span> }

                </div>
                <div className={css.commentNickname}>{comment.senderNickname}</div>
                <div className={css.comment}>{comment.comment}</div>
                </div>  
                </div>          
             </div>
             ) 
            }</div> : <div> 
            <div className={write.commentCover}>
            <div className={write.emptyComment}>
            <div className={write.commentImage}>
            <img 
            src="https://img.icons8.com/officel/110/000000/surprised.png"
            alt='empty comment'
            className={write.Image}
            />
            </div>
            <div>COMRADE!!!<br/>
            Comment section is empty<br/>
            Write something beautifull About<br/>
            {comrade.surname + " " + comrade.lastname} 
           
            </div>
            </div>
            </div>
            </div>}       
            <div>
            
            </div>
            
            </div>
            <div className={css.photoGrid}>
               <Photos />
            </div>
            </div>
            </div>  

        <Modal show={show} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <textarea 
        placeholder="write comment" 
        className={css.commentInput}
        value = {commentDetails.comment}
        onChange={onChangeComment}
        >
        </textarea>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {
             loading ? 'Saving...' : 'Save'
            }
          </Button>
        </Modal.Footer>
      </Modal>
        </div>     : <div>
           <div className={spinner.spinner}>
          </div>
           </div>
        }
        </div>
       
    )
}

export default Studentprofile;
