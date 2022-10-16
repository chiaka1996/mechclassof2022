import log from '../Styles/Login.module.css';
import {useState, useEffect} from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import {userAuth} from "../Contexts/AllContext"


const Login = () => {

    const {loggedIn, login, createProfile} = userAuth()
    const router = useRouter()

    useEffect(() => {
        loggedIn ? router.push('/dashboard') : ''
    }, [loggedIn])

    interface localStore{
        _id: string,
        surname: string,
        lastname: string,
        bio: string,
        nickname: string,
        image: string,
        cloudinaryId: string,
        matric: string
    }

    interface loginDetails{
        matric: string,
        password: string
    }


    const [details, setDetails] = useState<loginDetails>({
       matric: "",
       password: "" 
    })
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Array<string>>([])
    const matricNo = /p\/hd\/19\/34400[0-9]{2}/i

    const onchangeDetails = (event:React.ChangeEvent<HTMLInputElement>) => {
        setError([])
        let value:string = event.target.value
        let name:string = event.target.name

        setDetails({
            ...details,
           [name]: value
        })
    }

    const clearError = () => {
        setError([])
        return
    }

const submitBtn = async (event:React.MouseEvent<HTMLButtonElement>) => {
   
    try{
        event.preventDefault()
        error.splice(0, error.length)
        setLoading(true)
        let {matric, password} = details;
        matric = matric.trim().toLowerCase()
        password = password.trim()

        if(!matric || !password){
            setLoading(false)
           setError([...error, 'please fill all fields'])
           return
        }

        if(matricNo.test(matric)){
            
            let loginData:loginDetails = {
                matric: matric.trim().toLowerCase(),
                password: password.trim()
            }
            
            let response = await fetch('/api/login',{
                method: "POST",
                body: JSON.stringify(loginData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const data = await response.json()
            if(response.status === 200){      
                const {_id , surname, lastname, nickname, bio, matric, image, cloudinaryId} = data.data
                createProfile(_id,surname,lastname,nickname,bio,matric,image,cloudinaryId)
                setLoading(false)
                login()
                router.push('/dashboard')
            }
            if(response.status === 400 || response.status === 500){
                setLoading(false)
                setError([...error, data.message])
                return 
            }
        }
        else{
            setLoading(false)
            setError([...error, 'invalid matric number']) 
            return
        }
    }
    catch(err:any){
        setLoading(false)
        setError([...error, err.message]) 
        return
    }
}

    return(
        <div className={log.loginContainer}>
        <img
        src='https://res.cloudinary.com/chiaka1996/image/upload/v1658609043/mechanical_eng_banner2_d0m51n.jpg'
        alt='background'
        className={log.img}
        />
        <div className={log.errorContainer}>
           
                { 
                  error.length > 0 ? <div className={log.errorMessage}> 
                  {error.map((err, i) =>  <div key={i}>{err}</div>)} 
                  <div 
                    className={log.closeMessage}
                    onClick={clearError}
                    >
                    <div className={log.closeLine}></div>
                    <div className={log.closeLine2}></div>
                    </div> 
                   </div>: ''
                }
           
        </div>
        <div >
        <div className={log.loginHeader}>
        <h1>MECH22</h1>
        </div>
        <div className={log.formHouse}>
        <form className={log.form}>
        <div className={log.welcome}>Welcome Comrade</div>
        <div className={log.inputContainer}>
        <div className={log.label}>Matric No</div>
        <input      
        type='text' 
        name="matric"
        value={details.matric}
        onChange={onchangeDetails}
        required
        className={log.input}
        />
        </div>

        <div className={log.inputContainer}>
        <div className={log.label}>Password</div>
        <input 
        type='password'
        name="password"
        value={details.password}
        onChange={onchangeDetails}
        className={log.input}
        required
        />
        </div>

        <button 
        className={log.submitBtn}
        onClick={submitBtn}
        >
        {!loading ? 'Sign in' : <div>
            <span className='loadingSpan'></span>
            <span className='loadingSpan'></span>
            <span className='loadingSpan'></span>
        </div> }
        </button>
        </form> 
        </div>
        </div>

        <div className={log.returnContainer}>
            <div>
                <Link href={'/'}>
                <span   className={log.returnHome}>return Home ?</span>
                </Link>
                </div>
        </div>

        </div>
    )
}

export default Login;