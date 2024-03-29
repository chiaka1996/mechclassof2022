import profilecss from '../../styles/dashboard.module.css';
import profilemobile from '../../styles/mobileSideBar.module.css'
import profiledetails from '../../styles/profile.module.css';
import StudentSideBar from '../../Components/StudentSideBar';
import TopNavBar from '../../Components/TopNavbar';
import {useState, useEffect, useRef} from "react";
import {userAuth} from "../../Contexts/AllContext"
import Modal from 'react-bootstrap/Modal';
let FormData = require('form-data');

interface user{
    _id: string,
    surname: string,
    lastname: string,
    bio: string,
    nickname: string,
    matric: string,
    image: string,
    cloudinaryId: string
}

interface detail{
    _id: string,
    nickname: string,
    bio: string,
}

const Profile = () => {
    const {mobileBar,createProfile, profile} = userAuth()
    const {_id , surname, lastname, nickname, bio, matric, image, cloudinaryId} = profile
    let [loading, setLoading] = useState<boolean>(false)
    let [modalLoading, setModalLoading] = useState<boolean>(false)
    let [message, setMessage] = useState<string>('')
    let [errMsg, setErrmsg] = useState<string>('')
    const [show, setShow] = useState<boolean>(false);
    const [images, setImages] = useState<File | null>()
    const [preview, setPreview] = useState<string>()
    const ref = useRef<HTMLInputElement>(null)
    const [user, setUser] = useState<user>({
        _id: '',
        surname: '',
        lastname: '',
        matric: '',
        nickname: '',
        image: '',
        bio: '',
        cloudinaryId: ''
    })

    useEffect(() => {
        setUser({
            _id: _id,
            surname: surname,
            lastname: lastname,
            matric: matric,
            cloudinaryId: cloudinaryId,    
            nickname: nickname,
            image: image,
            bio: bio,
        })
    },[message, profile])

    const modalShow = () => {
        setShow(true);
        
    }

    const modalHide = () => {
        (document.getElementById('inputReset') as HTMLFormElement).reset();
        setShow(false);
    }

    const uploadProfilePics = async () => {
        setModalLoading(true)
        setMessage('')
        setErrmsg('')

        try{
            if(!images){
                setModalLoading(false)
                setMessage('')
                modalHide()
                setErrmsg('please add Image')
                return false;
    
            }

            if(!images.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                setModalLoading(false)
                setMessage('')
                modalHide()
                setErrmsg('please selet a valid image');
                return false;
              }
            
              let formdata = new FormData();
              formdata.append('image', images)
              formdata.append('_id', user._id)

              let response = await fetch('../api/profileupload',{
                method: "POST",
                body: formdata,
            })
            let result = await response.json()
            if(response.status === 200){
                console.log(result)
              setModalLoading(false)
              modalHide()
              setMessage(result.message)
              createProfile(user._id , user.surname, user.lastname, user.nickname, user.bio, user.matric, result.image, result.cloudinaryId)
            }
      
            if(response.status === 400){
              setModalLoading(false)
              modalHide()
              setErrmsg(result.message)
            }

        }
        catch(error:any){
            modalHide()
            setErrmsg(error.message)
          
        }   
    }

    useEffect(() => {
        if(images){
            const reader = new FileReader();
             reader.readAsDataURL(images)
            reader.onloadend = ()=> {
                setPreview(reader.result as string)
                modalShow()
            }
           
        } 
    }, [images])

    const handleFile = (e:any) => {
        let file = e.target.files[0];
        console.log(file)
       
        if(file && file.type.substr(0,5) === "image"){        
            setImages(file)
            modalShow()
        }
    }

    const onChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        setMessage('')
        setErrmsg('')
        let value:string = event.target.value
        let name:string = event.target.name
        setUser({
            ...user,
           [name]: value
        })
    }


    const closeMsg = () => {
        setMessage('')
    }

    const closeErrMsg = () => {
        setErrmsg('')
    }

    const submitBtn = async () => {
        try{
            setLoading(true)
            setMessage('')
            setErrmsg('')
            let details:detail = {
                _id: user._id,
                nickname: user.nickname,
                bio: user.bio,
            }

            const data ={
                senderId: user._id,
                senderPics: user.image,
                senderNickname: user.nickname
            }
    
            // update all comments
            const update = await fetch('../api/updatecomment', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
    
                let updateResult = await update.json()
    
                if(update.status === 200){
                    let response = await fetch('../api/updateuser',{
                        method: "PUT",
                        body: JSON.stringify(details),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    let result = await response.json()
                
                    if(response.status === 200){
                        setLoading(false)
                        let data:detail = result.user;
                        createProfile(user._id , user.surname, user.lastname, data.nickname, data.bio, user.matric, user.image, user.cloudinaryId)
                        setMessage(result.message)
                    }
        
                    if(response.status === 400){
                        setLoading(false)
                        setErrmsg(result.message)
                    }
                   
                }
                else{
                    setLoading(false)
                    alert('something is wrong')
                    console.log(updateResult)
                }
         }
        catch(error:any){
            setLoading(false)
            setErrmsg(error.message)
        }
    }
   
    return(
        <div className={profilecss.cover}>
            <div>
                <div className={profilecss.sidebar}>
                    <StudentSideBar name='profile' />
                </div>

                <div className={mobileBar ? profilemobile.mobileSidebar : profilemobile.closeMobileBar}>
                <StudentSideBar  name='profile'/> 
                </div>
            </div>

            <div className={profilecss.mainBody}>
            <div>
            <TopNavBar name='Profile' surname={surname} />
            </div>

            {/* success message */}
            <div className={profiledetails.msgContainer}>
             <div className={message !== '' ? profiledetails.successMsg : profiledetails.emptyMsg}>
            <span>{message}</span>
            <span 
            style={{color: 'white'}}
            className={message !== '' ? profiledetails.closeTag : profiledetails.tag}
            onClick = {closeMsg}
            >
             &#10006;
             </span>
            </div>
            </div>

            {/* error message */}
            <div className={profiledetails.msgContainer}>
             <div className={errMsg !== '' ? profiledetails.errMsg : profiledetails.emptyMsg}>
            <span>{errMsg}</span>
            <span 
            style={{color: 'white'}}
            className={errMsg !== '' ? profiledetails.closeTag : profiledetails.tag}
            onClick = {closeErrMsg}
            >
             &#10006;
             </span>
            </div>
            </div>

            <div className={profiledetails.allWrapper}>
                <div className={profiledetails.wrapper}>
                    <img 
                    src={user.image.length > 0 ? user.image : 'https://res.cloudinary.com/chiaka/image/upload/v1664259165/person-icon-person-icon-17_o9gnwh.jpg'} 
                    alt="profile picture"
                    className={profiledetails.profilePicture}
                    />
                    <form id='inputReset'>
                    <input 
                    type="file" 
                    ref={ref}
                    className={profiledetails.myFile}     
                    onInput = {handleFile}
                    accept='images/*'
                    />
                    </form>
                   
                </div>
            <div className={profiledetails.profileSubBody}>
            <div>
            <div className={profiledetails.inputContainer}>
            <input      
            type='text' 
            name="surname"
            value={surname}
            required
            />
            <label className={profiledetails.label}>Surname</label>
            </div>

            <div className={profiledetails.inputContainer}>
            <input      
            type='text' 
            name="lastname"
            value={lastname}
            required
            />
            <label className={profiledetails.label}>Lastname</label>
            </div>

            <div className={profiledetails.inputContainer}>
            <input      
            type='text' 
            name="matric"
            value={matric}
            required
            />
            <label className={profiledetails.label}>Matric no</label>
            </div>
            </div>

            <div>
            <div className={profiledetails.inputContainer}>
            <input      
            type='text' 
            name="nickname"
            value={user.nickname}
            onChange={onChangeInput}
            required
            />
            <label className={profiledetails.label}>Nickname</label>
            </div>

            <div className={profiledetails.inputContainer}>
            <input      
            type='text' 
            name="bio"
            value={user.bio}
            onChange={onChangeInput}
            required
            />
            <label className={profiledetails.label}>Bio</label>
            </div>

            <button 
            className={profiledetails.button}
            onClick ={submitBtn}
            >
            {!loading ? 'Update Profile' : <div>
            <span className='loadingSpan'></span>
            <span className='loadingSpan'></span>
            <span className='loadingSpan'></span>
            </div> }
            </button>
            </div>
            </div>
        </div>
        </div>

        <Modal show={show}  onHide={modalHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Profile Picture</Modal.Title>
        </Modal.Header>
       <div className={profiledetails.profileModalContainer}>
        <img 
        src={preview}
        alt="profile picture"
        className={profiledetails.profileModalImage}
        />
       </div>
        <Modal.Footer>
          <button 
          className={profiledetails.button}
          onClick={uploadProfilePics}
          >
            {
             modalLoading ? 'Uploading...' : 'Upload'
            }
          </button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default Profile;