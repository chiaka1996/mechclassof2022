import css from '../Styles/Comments.module.css';

const Comment = () => {
    return(
        <div className={css.commentCover}>
            {/* <div className={css.commentHeader}>Comments</div> */}
            <div className={css.emptyComment}>
            <div className={css.commentImage}>
            <img 
            src="https://img.icons8.com/officel/110/000000/surprised.png"
            alt='empty comment'
            className={css.Image}
            />
            </div>
            <div>COMRADE!!!<br/>
            Your Comment Section is empty<br/>
            Reach Out to your fellow comrades<br/>
            to write beutiful things about you
            </div>
            </div>

        </div>
    )
}

export default Comment;