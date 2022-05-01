import { createContext, useEffect, useState } from "react";
import Category from "../../model/Category";
import apiCategory from "../../services/categoryServices";
import useAuth from "../hook/useAuth";

interface ApiDataContextProps {
    categories?: Array<Category>,
}

const ApiDataContext = createContext<ApiDataContextProps>({})

export function ApiDataProvider(props) {
    const [categories, setCategories] = useState<Array<Category>>([])
    const {user} = useAuth()

    async function getCategories() {
        const {data} = await apiCategory.getTree()
        console.log(data)
    }

    useEffect(() => {
        if(user) {
            getCategories()
        }
    }, [user])

    return (
        <ApiDataContext.Provider value={{
            categories,
        }}>
            {props.children}
        </ApiDataContext.Provider>
    )
}

export default ApiDataContext
