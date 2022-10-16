import indexcss from '../../Styles/dashboard.module.css';
import indexmobile from '../../styles/mobileSideBar.module.css'
import StudentSideBar from '../../Components/StudentSideBar';
import TopNavBar from '../../Components/TopNavbar';
import Comments from '../../Components/Comments';
import Photos from '../../Components/Photos';
import Link from 'next/link';
import {userAuth} from "../../Contexts/AllContext"
import {useState, useEffect} from "react";

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


const Dashboard = () => {
    const {loggedIn,mobileBar, profile} = userAuth()
    const {_id , surname, lastname, nickname, bio, matric, image, cloudinaryId} = profile
    const [comments, setComents] = useState<commentItems[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    let [errMsg, setErrmsg] = useState<string>('')

    const space = ' '

    // get all comments
    const getcomments =  async () =>{
        try{
        const apiRequest = await fetch(`../api/getallcomments?userId=${_id}`)
        const response = await apiRequest.json()
        let {request} = response
        if(apiRequest.status === 200){
            setComents(()=>[...request])
        }
    }catch(error:any){
        alert(error.message)
    }
    }

    useEffect(() => {
        getcomments()
    },[])
    return(
        <div className={indexcss.cover}>
            <div>
                <div className={indexcss.sidebar}>
                    <StudentSideBar  name='dashboard'/>
                </div>
                
                 <div className={mobileBar ? indexmobile.mobileSidebar : indexmobile.closeMobileBar}>
                <StudentSideBar  name='dashboard'/> 
                </div>
            </div>

            {!mobileBar ? <div className={indexcss.mainBody}>
            <div>
            <TopNavBar name='Dashboard' surname={surname}/>
            </div>
            <div className={indexcss.subBody}>
            <div className={indexcss.commentGrid}>
               
            <div className={indexcss.wallpaper}>
                <div className={indexcss.imgContainer}>
                <img
               src={image.length > 0 ? image : 'https://res.cloudinary.com/chiaka/image/upload/v1664259165/person-icon-person-icon-17_o9gnwh.jpg'}
                alt='profile pics'
                width="100px"
                height='100px'
                />
                </div>
            </div>
            <div className={indexcss.editProfile}>
            <Link href='/dashboard/profile'>
                <button>Edit Profile</button>
            </Link>
            </div>
            <div className={indexcss.profilePicsName}>
            <span>{surname}{space}{lastname}</span><br/>
            <span className={indexcss.nickname}>{matric.toUpperCase()}</span><br/>
            <span className={indexcss.nickname}>{nickname}</span>
            </div>

            <div className={indexcss.bio}>
            {bio}
            </div>

            <div className={indexcss.commentHeader}>
            {comments.length} comment{comments.length > 1 ? 's':''}
            </div>
            <div>
             {/* <Comments /> */}
              {/* list of comments */}
            {comments.length > 0 ? <div> {comments.map((comment, i) => <div key={i} className={indexcss.commentHouse}>
                <div className={indexcss.commentImg}>
                <img
                src={comment.senderPics.length > 1 ? comment.senderPics : 'https://res.cloudinary.com/chiaka/image/upload/v1664259165/person-icon-person-icon-17_o9gnwh.jpg'}
                alt='profile pics'
                width="45px"
                height='45px'
                />
               
                <div className={indexcss.commentFlex}>
                <div className={indexcss.commentHead}>
                <div>{comment.senderSurname + " " + comment.senderLastname} </div>
                </div>
                <div className={indexcss.commentNickname}>{comment.senderNickname}</div>
                <div className={indexcss.comment}>{comment.comment}</div>
                </div>  
                </div>          
             </div>
             ) 
            }</div> : <div> 
           <Comments />
            </div>}       
            </div>
            </div>
            <div className={indexcss.photoGrid}>
               <Photos/>
            </div>
            </div>
            </div> : ''}

        </div>
    )
}

export default Dashboard;