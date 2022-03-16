import useAppData from '../../data/hook/useAppData'
import ButtonTheme from './ButtonTheme'
import Title from './Title' 
import UserAvatar from './UserAvatar'

interface TopbarProps {
    title: string,
    subtitle: string,
}

export default function Topbar(props: TopbarProps) {
    const {theme, changeTheme} = useAppData()
    
    return (
        <div className={`flex`}>
            <Title title={props.title} subtitle={props.subtitle}></Title>
            <div className={`flex flex-grow justify-end items-center`}>
                <ButtonTheme theme={theme} changeTheme={changeTheme}></ButtonTheme>
                <UserAvatar className={`ml-3`}></UserAvatar>
            </div>
        </div>
    )
}