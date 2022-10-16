import StudentSideBar from '../../Components/StudentSideBar';
import passwordMobile from '../../styles/mobileSideBar.module.css'
import TopNavBar from '../../Components/TopNavbar';
import passworddetails from '../../styles/profile.module.css';
import {useState, useEffect } from "react";
import passwordcss from '../../styles/dashboard.module.css';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {server} from '../../Config/index'
import {userAuth} from "../../Contexts/AllContext"

interface change{
    _id: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}

const ChangePassword = () => {
    const {mobileBar, closeBar, profile} = userAuth()
    const {_id, surname } = profile
    let [loading, setLoading] = useState<boolean>(false)
    let [message, setMessage] = useState<string>('')
    let [errMsg, setErrmsg] = useState<string>('')
    const [visible, setVisible] = useState({
        oldPassword: true,
        newPassword: true,
        confirmPassword: true
    });

    const [data, setData] = useState<change>({
        _id,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const onclickIcon = (name:string, value:boolean) => {
        setVisible({
            ...visible,
            [name] : value
        })
    }

    const setDetails = (e:React.ChangeEvent<HTMLInputElement>) => {
        let values = e.target.value;
        let names = e.target.name;
        setData({
            ...data,
            [names] : values
        });
    }

    const closeMsg = () => {
        setMessage('')
    }

    const closeErrMsg = () => {
        setErrmsg('')
    }

    const submitBtn = async () => {
        try{
        setErrmsg('')
        setMessage('')
        setLoading(true);
        const {_id, oldPassword, confirmPassword, newPassword} = data;
        if(!oldPassword || !confirmPassword || !newPassword){
            setLoading(false)
            return setErrmsg('please fill all fields')
        }
        if(oldPassword.length < 3 || confirmPassword.length < 3 || newPassword.length < 3){
        setLoading(false);
        return setErrmsg('password should be 3 or more characters.')
        }

        if(newPassword !== confirmPassword){
        setLoading(false);
        return setErrmsg('confirm password should be the same as new password')
        }
        
        const postData = {
            _id,
            oldPassword,
            newPassword
        }
        let response = await fetch(`${server}/api/changepassword`,{
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        let result = await response.json()
        
        if(result){
            setLoading(false);
            setMessage(result.message)
        }

        if(result.status === 400){
            setLoading(false)
            setErrmsg(result.message)
        }

    }
    catch(error:any){
        setLoading(false);
        setErrmsg(error.msg)
    }
    }
    return (
        <div className={ passwordcss.cover}>
            <div>
                <div className={ passwordcss.sidebar}>
                    <StudentSideBar name='changePassword' />
                </div>

                <div className={mobileBar ? passwordMobile.mobileSidebar : passwordMobile.closeMobileBar}>
                <StudentSideBar  name='changePassword'/> 
                </div>
            </div>

            <div className={ passwordcss.mainBody}>
            <div>
            <TopNavBar name='Change Password' surname={surname}/>
            </div>

             {/* success message */}
             <div className={passworddetails.msgContainer}>
             <div className={message !== '' ? passworddetails.successMsg : passworddetails.emptyMsg}>
            <span>{message}</span>
            <span 
            style={{color: 'white'}}
            className={message !== '' ? passworddetails.closeTag : passworddetails.tag}
            onClick = {closeMsg}
            >
             &#10006;
             </span>
            </div>
            </div>

            {/* error message */}
            <div className={passworddetails.msgContainer}>
             <div className={errMsg !== '' ? passworddetails.errMsg : passworddetails.emptyMsg}>
            <span>{errMsg}</span>
            <span 
            style={{color: 'white'}}
            className={errMsg !== '' ? passworddetails.closeTag : passworddetails.tag}
            onClick = {closeErrMsg}
            >
             &#10006;
             </span>
            </div>
            </div>

            <div className={passworddetails.subBody}>
                <div>
            <div className={passworddetails.inputContainer}>
            {visible.oldPassword ? 
            <FontAwesomeIcon 
            className={passworddetails.eye}  
            icon={faEye}
            onClick={ () => onclickIcon('oldPassword',false)}
            /> :
            <FontAwesomeIcon 
            className={passworddetails.eye} 
            name="oldPassword"
            icon={faEyeSlash}
            onClick={ () => onclickIcon('oldPassword',true)}
             />
            }
            <input      
            type={visible.oldPassword ? 'password' : 'text'}
            name="oldPassword"
            value={data.oldPassword}
            onChange={setDetails}
            required
            />
            <label className={passworddetails.label}>Old Password</label>
            </div>

            <div className={passworddetails.inputContainer}>
            {visible.newPassword ? 
            <FontAwesomeIcon 
            className={passworddetails.eye}  
            icon={faEye}
            onClick={ () => onclickIcon('newPassword',false)}
            /> :
            <FontAwesomeIcon 
            className={passworddetails.eye} 
            icon={faEyeSlash}
            onClick={ () => onclickIcon('newPassword',true)}
            />
            }
            <input      
             type={visible.newPassword ? 'password' : 'text'}
            name="newPassword"
            value={data.newPassword}
            onChange={setDetails}
            required
            />
            <label className={passworddetails.label}>New Password</label>
            </div>

            <div className={passworddetails.inputContainer}>
            {visible.confirmPassword ? 
            <FontAwesomeIcon 
            className={passworddetails.eye}  
            icon={faEye}
            onClick={ () => onclickIcon('confirmPassword',false)}
            /> :
            <FontAwesomeIcon 
            className={passworddetails.eye} 
            icon={faEyeSlash}
            onClick={ () => onclickIcon('confirmPassword',true)}
            />
            }
            <input      
              type={visible.confirmPassword ? 'password' : 'text'}
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={setDetails}
            required
            />
            <label className={passworddetails.label}>Confirm Password</label>
            </div>

            <button 
            className={passworddetails.button}
            onClick ={submitBtn}
            >
            {!loading ? 'Update Profile' : <div>
            <span className='loadingSpan'></span>
            <span className='loadingSpan'></span>
            <span className='loadingSpan'></span>
            </div> }
            </button>
            </div>
            <div></div>

            </div>
        </div>
        </div>
    )
}

export default ChangePassword;