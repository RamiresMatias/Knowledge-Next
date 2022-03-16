import Link from "next/link";

interface SidebarItemsProps {
    url?: string
    text: string
    icon: any
    className?: string
    onClick?: (evento: any) => void
}

export default function SidebarItems(props: SidebarItemsProps) {

    function renderizarConteudo() {
        return (
            <a className={`
                flex flex-col justify-center items-center
                w-20 h-20 
                dark:text-gray-200
                text-gray-700 ${props.className}`
            }>
                {props.icon}
                <span className={`
                    text-xs font-light
                `}>
                    {props.text}
                </span>
            </a>
        )
    }

    return (
        <li onClick={props.onClick} 
        className={`
            hover:bg-gray-400
            dark:hover:bg-gray-700 
            cursor-pointer
        `}>
            {props.url ? (
                <Link href={props.url}>
                    {renderizarConteudo()}
                </Link>
            ) : (
                renderizarConteudo()
            )}     
        </li>
    )
}