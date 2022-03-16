/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { WarningIcon } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Authentication() {

    const {loginWithGoogle, login, register} = useAuth()

    const [mode, setMode] = useState<'login' | 'register'>('login')
    const [error, setError] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function showError(msg: string, time:number = 5) {
        setError(msg)
        setTimeout(() => setError(null), time * 1000)
    }

    async function submit() {
        try {
            if(mode === 'login') {
                await login(email, password)
            } else {
                await register(email, password)
            }
        } catch (error) {
            showError(error?.message ?? 'Ocorreu um erro desconhecido')
        }
    }

    return (
        <div className={`
            flex h-screen items-center justify-center
        `}>
            <div className="hidden md:block md:w-1/2">
                <img 
                    src="https://cdn.pixabay.com/photo/2016/02/16/16/57/login-1203603_960_720.png" 
                    alt="Imagem da Tela de autenticação" 
                    className="h-screen w-full object-cover"
                />
            </div>
            <div className={`md:w-1/2 w-full m-10`}>
                <h1 className={`
                    text-3xl font-bold mb-5
                `}>
                    {mode === 'login' ? 'Entre com a sua conta' : 'Cadastre-se na plataforma'}
                </h1>

                {error ? (
                    <div className={`
                        bg-red-400 text-white py-3 px-5 my-2
                        border border-red-800 rounded-lg
                        flex items-center
                    `}>
                        {WarningIcon}
                        <span className="ml-3">{error}</span>
                    </div>
                ) : false}

                <AuthInput
                    label="Email"
                    value={email}
                    type={'email'}
                    changeValue={setEmail}
                    required
                />
                <AuthInput
                    label="Senha"
                    type={'password'}
                    value={password}
                    changeValue={setPassword}
                    required
                />
                <button onClick={submit} className={`
                    w-full bg-indigo-500 hover:bg-indigo-400 text-white
                    rounded-lg px-4 py-3 mt-6
                `}>
                    {mode === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className="my-6 border-gray-300 w-full"/>

                <button onClick={loginWithGoogle} className={`
                    w-full bg-red-500 hover:bg-red-400 text-white
                    rounded-lg px-4 py-3 mb-10
                `}>
                    <span>Entrar com o Google</span>
                </button>

                {mode === 'login' ? (
                    <p className="text-center">
                        <a onClick={() => setMode('register')} className={`
                        text-blue-500 hover:text-blue-700 font-semibold
                        cursor-pointer`}>
                            Criar uma conta gratuitamente?
                        </a>
                    </p>
                ): (
                    <p className="text-center">
                        <a onClick={() => setMode('login')} className={`
                        text-blue-500 hover:text-blue-700 font-semibold
                        cursor-pointer`}>
                            Entre com suas credenciais?
                        </a>
                    </p>
                )}
            </div>
        </div>
    )
}