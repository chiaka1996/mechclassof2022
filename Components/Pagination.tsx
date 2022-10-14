import React,{useState, useEffect} from 'react';
import details from '../Styles/profile.module.css';

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

const Pagination = ({products, totalProduct, currentPage, prev, next, link, comradeId}:pageProps) => {
   
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
            {
            link === 'photo' ? <div>{products.length < 1 ?  '': <div className={details.buttonContainer}>
            <a href={`/comrade/photos/${comradeId}?page=${hrefPrev}`}>
            <button className={details.uncoloured}>
            prev
            </button>
            </a>
            {list.map((lists, i) => <a href={`/comrade/photos/${comradeId}?page=${lists}`}  key={i}>
            <button 
            value={lists}
            className={(currentPage === lists ? details.coloured : details.uncoloured)}
            >
            {lists}
            </button>
            </a>
            )}
             <a href={`/comrade/photos/${comradeId}?page=${hrefNext}`}>
            <button className={details.uncoloured}>
            next
            </button>
            </a>
        </div>
        } </div> : <div>{products.length < 1 ?  '': <div className={details.buttonContainer}>
        <a href={'/dashboard/mygallery/' + hrefPrev}>
        <button className={details.uncoloured}>
        prev
        </button>
        </a>
        {list.map((lists, i) => <a href={'/dashboard/mygallery/' + lists}  key={i}>
        <button 
        value={lists}
        className={(currentPage === lists ? details.coloured : details.uncoloured)}
        >
        {lists}
        </button>
        </a>
        )}
         <a href={'/dashboard/mygallery/' + hrefNext}>
        <button className={details.uncoloured}>
        next
        </button>
        </a>
    </div>
    }
    </div>
     }           
    </div>
    )
}
export default Pagination;