import css from '../Styles/sidebar.module.css';
import Link from 'next/link';
import {userAuth} from "../Contexts/AllContext"

interface props{
    name: string
}

const VisitorSideBar = ({name}:props) => {
    const {closeBar} = userAuth()
    const space = ' '

    return(
    <div className={css.visitorContainer}>
    
    <div className={css.mobileSidebarCancel} onClick={closeBar}>
    <img 
    src="https://img.icons8.com/external-becris-lineal-becris/25/000000/external-cancel-mintab-for-ios-becris-lineal-becris.png"
    alt="cancel mobile sidebar"
    />    
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
    </div>
)
}

export default VisitorSideBar;;