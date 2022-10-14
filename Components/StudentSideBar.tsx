import css from '../Styles/sidebar.module.css';
import Link from 'next/link';
import {userAuth} from "../Contexts/AllContext"
import  { useRouter } from 'next/router'


interface props{
    name: string
}

const StudentSideBar = ({name}:props) => {
    const router = useRouter()
    const {closeBar, profile, logout} = userAuth()
    const {_id , surname, lastname, nickname, matric, image} = profile
    const space = ' '

    return(
    <div className={css.sidebarContainer}>  
    <div className={css.mobileSidebarCancel} onClick={closeBar}>
    <img 
    src="https://img.icons8.com/external-becris-lineal-becris/25/000000/external-cancel-mintab-for-ios-becris-lineal-becris.png"
    alt="cancel mobile sidebar"
    />    
    </div>
    <div className={css.profilePicsContainer}>   
    <div style={{padding: '0 0 0 10%'}}>
    <img
    src={image.length > 1 ? image : 'https://res.cloudinary.com/chiaka/image/upload/v1664259165/person-icon-person-icon-17_o9gnwh.jpg'}
    alt='profile pics'
    width="70px"
    height='70px'
    />
    </div> 
    <div className={css.profilePicsName}>
    <span>{surname}{space}{lastname}</span><br/>
    <span>{matric.toUpperCase()}</span><br/>
    <span>{nickname}</span>
    </div>
    </div>
    <Link 
    href='/'
    >
    <div 
    className={name === 'home' ? css.coloredBackground:css.sidebarList}
    onClick={closeBar}
    >
    <div>
    <img 
    src="https://img.icons8.com/ios-filled/18/4E4E4E/home.png"
    alt='home icon'
    />
    </div>
    <div className={css.listspan}>Home</div>
    </div>
    </Link>
    <Link 
    href='/dashboard'
    >
    <div 
    className={name === 'dashboard' ? css.coloredBackground:css.sidebarList}
    onClick={closeBar}
    >
    <div>
    <img 
    src="https://img.icons8.com/material-rounded/24/000000/dashboard-layout.png"
    alt='dashboard icon'
    />
    </div>
    <div className={css.listspan}>Dashboard</div>
    </div>
    </Link>
    <Link 
    href='/dashboard/profile'
    >
    <div 
    className={name === 'profile' ? css.coloredBackground:css.sidebarList}
    onClick={closeBar}
    >
     <div>
     <img 
     src="https://img.icons8.com/ios-glyphs/18/4E4E4E/person-male.png"
     alt='user'
     />
     </div>
     <div className={css.listspan}>Profile</div>
    </div>
    </Link>
   
    <Link 
    href='/dashboard/changepassword'
    >
    <div 
    className={name === 'changePassword' ? css.coloredBackground:css.sidebarList}
    onClick={closeBar}
    >
    <div>
    <img 
    src="https://img.icons8.com/ios-filled/18/4E4E4E/password.png"
    alt="password icon"
    />
    </div>
     <div className={css.listspan}>Change Password</div>
    </div>
    </Link>

    <Link 
    href='/dashboard/mygallery/1'
    >
    <div 
    className={name === 'Gallery' ? css.coloredBackground:css.sidebarList}
    onClick={closeBar}
    >
    <div>
    <img 
    src="https://img.icons8.com/sf-regular-filled/22/4E4E4E/gallery.png"
    alt='gallery icon'
    />
    </div>
    <div className={css.listspan}>
    Gallery 
    </div>
    </div> 
    </Link>  

    <div 
    className={css.logout}
    onClick={logout}
    >
    <div>
    <img 
    src="https://img.icons8.com/external-inkubators-basic-outline-inkubators/18/ffffff/external-log-out-user-interface-inkubators-basic-outline-inkubators.png"
    alt='logout icon'
    />
     <span>Log out</span>
    </div>
    </div> 
    </div>
)
}

export default StudentSideBar;