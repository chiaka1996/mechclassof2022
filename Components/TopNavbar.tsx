import top from '../Styles/topNavbar.module.css';
import {userAuth} from "../Contexts/AllContext"

interface props{
    name: string | string[] | undefined,
    surname: string | string[] | undefined
}

const TopNavbar = ({name, surname}:props) => {
    const {openBar, mobileBar} = userAuth()
    console.log(mobileBar)
return(
    <div className={top.topbarContainer}>
         <img 
            src="https://img.icons8.com/external-color-for-better-life-royyan-wijaya/28/000000/external-breakfast-food-colorlife-1-color-for-better-life-royyan-wijaya-2.png"
            alt="menu bar"
            className={top.topNavImage}
            onClick={() => openBar()}
            />
            
       <div className={top.topHeader}>
        {name}
       </div>
       <div>
       <img 
       src="https://img.icons8.com/material-outlined/24/000000/person-male.png"
       alt='bio name'
       />
        <span>{surname}</span>
       </div>
    </div>
)
}

export default TopNavbar;