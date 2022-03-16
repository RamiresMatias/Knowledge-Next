import Image from 'next/image'
import loadingGif from '../../../public/images/loading.gif'
import useAuth from '../../data/hook/useAuth'
import { ReactElement } from 'react'
import Head  from 'next/head'

interface ForceAuthenticationProps {
    children?: ReactElement
}

export default function ForceAuthentication(props: ForceAuthenticationProps) {

    const { user, loading} = useAuth()

    function renderContent() {
        return (
            <>
                <Head >
                 <script dangerouslySetInnerHTML={{
                     __html: `
                        if(!document.cookie?.includes('user-auth')){
                            window.location.href = '/authentication'
                        }
                     `
                 }}/>
                </Head>
                {props.children}
            </>
        )
    }

    function renderLoading() {
        return (
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loadingGif}></Image>
            </div>
        )
    }

    if(!loading && user?.email) {
        return renderContent()
    } else if(loading) {
        return renderLoading()
    } else {
        return null
    }
}