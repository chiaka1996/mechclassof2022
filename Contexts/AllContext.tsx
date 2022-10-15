import {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import  { useRouter } from 'next/router'

interface profile{
    _id: string,
    surname: string,
    lastname: string,
    bio: string,
    nickname: string,
    matric: string,
    image: string,
    cloudinaryId: string,
    
}

type ContextType = {
    loggedIn: boolean;
    mobileBar: boolean;
    openBar: () => void;
    closeBar: () => void;
    login: () => void;
    logout: () => void;
    createProfile: (_id:string, surname:string, lastname:string, nickname:string, bio:string, matric:string, image:string, cloudinaryId:string) => void,
    profile: profile
}

type Props = {
    children: ReactNode;
};



const ContextDefaultValues: ContextType = {
    loggedIn: false,
    mobileBar: false,
    createProfile: () => {},
    openBar: () => {},
    closeBar: () => {},
    login: () => {},
    logout: () => {},
    profile: {
        _id: '',
        surname: '',
        lastname: '',
        bio: '',
        nickname: '',
        matric: '',
        image: '',
        cloudinaryId: '',
    }
}

const AuthContext = createContext<ContextType>(ContextDefaultValues);

export function userAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
    const router = useRouter()
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [mobileBar, setMobileBar] = useState<boolean>(false);
    const [profile, setProfile] = useState<profile>({
        _id: '',
        surname: '',
        lastname: '',
        bio: '',
        nickname: '',
        matric: '',
        image: '',
        cloudinaryId: ''
    })

    const login = () => {
        setLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('profile')
        setProfile({
            _id: '',
            surname: '',
            lastname: '',
            bio: '',
            nickname: '',
            matric: '',
            image: '',
            cloudinaryId: ''
        })
        setLoggedIn(false);
        router.push('/')
    };

    const openBar = () => {
        setMobileBar(true)
        console.log(true)
    }

    const closeBar = () => {
        setMobileBar(false)
    }

    const createProfile = (_id:string, surname:string, lastname:string, nickname:string, bio:string, matric:string, image:string, cloudinaryId:string)=> {
        setProfile({
            ...profile,
            _id,
            surname,
            lastname,
            bio,
            nickname,
            matric,
            image,
            cloudinaryId,
        })

        localStorage.setItem('profile', JSON.stringify({
            _id,
            surname,
            lastname,
            bio,
            nickname,
            matric,
            image,
            cloudinaryId,
        }));

    }

    const value = {
        loggedIn,
        mobileBar,
        profile,
        createProfile,
        openBar,
        closeBar,
        login,
        logout,
    };

    useEffect(() => {
        const store = JSON.parse(localStorage.getItem("profile") || 'false')

        if (store) { 
            login()
            const {_id, surname, lastname, matric, bio, image, cloudinaryId, nickname} = store
            createProfile(_id, surname, lastname, nickname, bio, matric, image, cloudinaryId)
        }
     },[loggedIn]);

    return(
        <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
    );
}