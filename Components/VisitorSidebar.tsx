import side from '../styles/sidebar.module.css';
import Link from 'next/link';
import {userAuth} from "../Contexts/AllContext"

interface props{
    name: string
}

const VisitorSideBar = ({name}:props) => {
    const {closeBar} = userAuth()
    const space = ' '

    return(
    <div className={side.visitorContainer}>
    <div className={side.mobileSidebarCancel} onClick={closeBar}>
    <img 
    src="https://img.icons8.com/external-becris-lineal-becris/25/000000/external-cancel-mintab-for-ios-becris-lineal-becris.png"
    alt="cancel mobile sidebar"
    />    
    </div>
    
    <Link 
    href='/'
    >
    <div 
    className={name === 'home' ? side.coloredBackground:side.sidebarList}
    onClick={closeBar}
    >
    <div>
    <img 
    src="https://img.icons8.com/ios-filled/18/4E4E4E/home.png"
    alt='home icon'
    />
    </div>
    <div className={side.listspan}>Home</div>
    </div>
    </Link>
    
    <Link 
    href='/dashboard/mygallery/1'
    >
    <div 
    className={name === 'Gallery' ? side.coloredBackground:side.sidebarList}
    onClick={closeBar}
    >
    <div>
    <img 
    src="https://img.icons8.com/sf-regular-filled/22/4E4E4E/gallery.png"
    alt='gallery icon'
    />
    </div>
    <div className={side.listspan}>
    Gallery 
    </div>
    </div> 
    </Link>  
    </div>
)
}

export default VisitorSideBar;;