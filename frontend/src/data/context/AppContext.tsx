import { createContext, useEffect, useState } from "react";

interface AppContextProps {
    theme: string,
    changeTheme: () => void
}

const AppContext = createContext<AppContextProps>({
    theme: null,
    changeTheme: null
})

export function AppProvider(props) {
    const [theme, setTheme] = useState<string>('')

    function changeTheme() {
        const newTheme = theme === 'dark' ? '' : 'dark'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
        const themeLocal = localStorage.getItem('theme')
        setTheme(themeLocal)
    }, [])

    return (
        <AppContext.Provider value={{
            theme,
            changeTheme
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext
export const AppConsumer = AppContext.Consumer