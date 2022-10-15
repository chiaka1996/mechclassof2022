import Head from 'next/head'
import Link from 'next/link';
// import styles from '../styles/Home.module.css'
import {server} from '../Config/index'
// import {userAuth} from "../Contexts/AllContext"
// import { useRouter } from 'next/router'

interface homeprops {
  data: {
    _id: string,
    surname: string,
    lastname: string,
    nickname: string,
    image: string,
    phone: string,
    matric: string,
    bio: string,
    password: string
  }[]
}

interface profiler {
    _id: string | null,
    surname: string | null,
    lastname: string | null,
    nickname: string | null,
    matric: string | null,
    bio: string | null,
  
}

const Home = ({data}:homeprops) => {
  // const {loggedIn,profile} = userAuth()
  // console.log(loggedIn)
  // const {_id , surname} = profile
  // const router = useRouter()

  // const onClickComrade = (comradeId:string) => {
  //   if(loggedIn && _id === comradeId) {
  //     router.push('/dashboard')
  //   }
  //   else{
  //     router.push(`/comrade/${comradeId}`)
  //   }
  // }
  
  return (
    // <div className={styles.container}>
    <div>
      <Head>
        <title>Yabatech College of Techn ology, Mechanical Engineering set of 2022 part time website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
      mechanical engineering
      {/* {
       data.map((element,i) => <div key={i}>
          {element.surname}
        </div>
      )} */}
      </div>
    
       {/*<main className={styles.main}>
      <nav className={styles.navs}>
            <div className={styles.flexIt}>
            <div className={styles.logoName}>
              MECH22
            </div>
            <div className={styles.space}></div>
            <div>
              { surname ? <Link href='/dashboard'>
                 <div className={styles.loginName}>
                <img 
                src="https://img.icons8.com/material-rounded/24/000000/person-male.png"
                alt='person'
                />
                {surname}
                </div>
                </Link> :
              <Link href='/Login'>
              <div className={styles.Login}>Login</div>
              </Link>
}
            </div>
            </div>
          </nav>
        <div className={styles.banner}>

          <div className={styles.BannerHeading}>
            <div className={styles.bigHeader}>MECHANICAL ENGINEERING</div>
            <div className={styles.bigHeader}>CLASS OF 2022(PT)</div>
           <div className={styles.smallHeader}>NA WHO GIVE UP,</div>
           <div className={styles.smallHeader}>FUCK UP! </div>  
          
          <Link href='/pictures/1'>
           <button className={styles.gallery}>
            <span>Gallery</span>
            <img 
            src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/24/ffffff/external-arrow-arrow-line-royyan-wijaya-detailed-outline-royyan-wijaya-13.png"
            alt='white arrow'
            />
           </button>
           </Link>
           
          </div> 
          <div>
            <div className={styles.gridBannerImg}>
             <img 
            src='https://res.cloudinary.com/chiaka/image/upload/v1661193783/me3nlmqwy9izyeuq9h5l.jpg'
            alt='banner image'
            className={styles.gridImg}
            />
            <img 
            src='https://res.cloudinary.com/chiaka/image/upload/v1661193182/zl3wmovoayhpqq2dgeto.jpg'
            alt='banner image'
            className={styles.gridImg}
            />
            <img 
            src='https://res.cloudinary.com/chiaka/image/upload/v1661193316/xn37e773ch3ifmkifzvl.jpg'
            alt='banner image'
            className={styles.gridImg}
            />
            </div>
            <img 
            src='https://res.cloudinary.com/chiaka1996/image/upload/v1658609043/mechanical_eng_banner2_d0m51n.jpg'
            alt='banner image'
            className={styles.bannerImg}
            />
          </div>
        </div> 

        <section className={styles.studentSection}>
          <div className={styles.studentHeader} >COMRADES</div>
          <div className={styles.comradeGrid}>
         
          {
            data.map((element,i) => <div onClick={() => onClickComrade(element._id)} key={i}>
              <div className={styles.imageHolder}>
              <img 
              src={element.image.length > 1 ? element.image : 'https://res.cloudinary.com/chiaka/image/upload/v1664259165/person-icon-person-icon-17_o9gnwh.jpg'}
              alt='description of comrade'
              className={styles.comradePics}
              />
              <div className={styles.comradeName}>{element.surname + ' ' + element.lastname}</div>
              <div className={styles.comradeAKA}>{element.nickname}</div>
            </div>
          </div>
             )
          }
          </div>

        </section>
      </main>

      <footer className={styles.footer}>
        YABA COLLEGE OF TECHNOLOGY, MECHANICAL ENGINEERING(PT) CLASS OF 2022
      </footer> */}
    </div>
  )
}

// export async function getServerSideProps() {
//   try{
//     let response = await fetch(`${server}/api/getProfile`)
//     const data = await response.json()
    
//     return{
//       props: {data}
//     }
    
//   }
//   catch(error:any){
//     alert(error.message)
//   }
// }

export default Home
