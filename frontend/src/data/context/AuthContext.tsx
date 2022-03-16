import { createContext, useEffect, useState } from "react";
import User from "../../model/User";
import router from 'next/router'
import firebase from "../../firebase/config";
import cookies from 'js-cookie'
import api from '../../services/user'

interface AuthContextProps {
    user?: User
    loading?: boolean
    login?: (email: string, password: string) => Promise<void>
    register?: (email: string, password: string) => Promise<void>
    loginWithGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function normalizeUser(userFirebase: firebase.User): Promise<User> {
    const token = await userFirebase.getIdToken()
    return {
        uid: userFirebase.uid,
        name: userFirebase.displayName,
        email: userFirebase.email,
        token,
        provider: userFirebase.providerData[0].providerId,
        imagemUrl: userFirebase.photoURL
    }
}

function manageCookie(logged: boolean) {
    if(logged) {
        cookies.set('user-auth', logged, {
            expires: 7
        })
    } else {
        cookies.remove('user-auth')
    }
}
 
export function AuthPovider(props) {
    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState(true)

    async function setUpSession(userFirebase: firebase.User) {
        if(userFirebase?.email) {
            const user = await normalizeUser(userFirebase)
            setUser(user)
            manageCookie(true)
            setLoading(false)
            return user.email
        }else {
            setUser(null)
            manageCookie(false)
            setLoading(false)
            return false
        }
    }

    async function loginWithGoogle() {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
            await validateToken(resp.user)
            await setUpSession(resp.user)
            router.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function login(email: string, password: string) {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithEmailAndPassword(email, password)
            await validateToken(resp.user)
            await setUpSession(resp.user)
            router.push('/')
        } catch (error) {
            await setUpSession(null)
            throw {message: "Usuário não autorizado!"}
        } finally {
            setLoading(false)
        }
    }

    async function validateToken(userFirebase: firebase.User){
        const token = await userFirebase.getIdToken()
        return await api.validateToken(token)
    }

    async function register(email: string, password: string) {
        try {
            setLoading(true)
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, password)
            await setUpSession(resp.user)
            router.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            await setUpSession(null)
            router.push('/authentication')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const isCookies = cookies.get('user-auth')

        if(!user && !isCookies) router.push('/authentication')

        if(isCookies) {
            const cancelObserver = firebase.auth().onIdTokenChanged(setUpSession)
            return () => cancelObserver()
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            loginWithGoogle,
            logout,
            login,
            register
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext