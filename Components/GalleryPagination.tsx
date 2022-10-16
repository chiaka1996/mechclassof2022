import paginate from '../Styles/profile.module.css';

interface pic{
    cloudinaryId: string,
    imgUrl: string,
    userId: string,
    __v: number,
    _id: string
}

interface pageProps{
    products: pic[],
    totalProduct: number,
    currentPage: number,
    prev: number,
    next: number, 
    link: string,
    comradeId: string | string[] | undefined     
}

const GalleryPagination = ({products, totalProduct, currentPage, prev, next, link, comradeId}:pageProps) => {
   
    let pages = totalProduct/10
    if(pages % 1 !==0){
        pages = Math.floor(pages) + 1
    }
    let list:number[] = []

    for (let i=0; i<pages; i++){
            list.push(i+1)
        }

    let hrefPrev = prev === 0 ? currentPage:prev;
    let hrefNext = next === 0 ? currentPage:next;
    
    return( 
        <div>
             <div>
            {products.length < 1 ?  '': <div className={paginate.buttonContainer}>
            <a href={'/pictures/' + hrefPrev}>
            <button className={paginate.uncoloured}>
            prev
            </button>
            </a>
            {list.map((lists, i) => <a href={'/pictures/' + lists}  key={i}>
            <button 
            value={lists}
            className={(currentPage === lists ? paginate.coloured : paginate.uncoloured)}
            >
            {lists}
            </button>
            </a>
            )}
             <a href={'/pictures/' + hrefNext}>
            <button className={paginate.uncoloured}>
            next
            </button>
            </a>
        </div>
        } 
        </div>          
    </div>
    )
}
export default GalleryPagination;