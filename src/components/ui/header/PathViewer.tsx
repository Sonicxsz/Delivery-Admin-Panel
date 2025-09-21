import {  useLocation } from 'react-router-dom'
import './PathViewer.css'

export function PathViewer(){
 const location = useLocation();
    const paths = location.pathname.split('/').filter((el) => el !== "")

    return (
        <div className='path-wrapper'>
           <h1 >
                {renderPath(paths.at(-1) || "")}
           </h1>
        </div>
    )
}



const titles:Record<string, string> = {
    auth: "Вход в админку",
    panel: "Панель управления",
    categories:"Редактирование категорий",
    tags:"Редактирование тегов",
    catalog:"Редактирование каталога",


}


function getPath(path: string) {
    return titles[path] ?? path
}

function renderPath(path: string): React.ReactNode {
    return getPath(path)
}