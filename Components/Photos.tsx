import css from '../Styles/Photos.module.css';

const Photos = () => {
    return(
        <div className={css.photoCover}>
            <div>
            <div style={{margin: '0 0 10% 0'}}>
            <img 
            src='https://res.cloudinary.com/chiaka/image/upload/v1665289795/DSC_6649_ox6uz4.jpg'
            alt='banner image'
            width='100%'
            height='100%'
            />
            </div>

            <div>
            <img 
            src='https://res.cloudinary.com/chiaka1996/image/upload/v1658609043/mechanical_eng_banner2_d0m51n.jpg'
            alt='banner image'
            width='100%'
            height='100%'     
            />
            </div>
            </div>

        </div>
    )
}

export default Photos;