import { NavLink } from 'react-router-dom'
import './panelPage.css'
import { Button } from '@mui/material'



export function PanelPage(){

    return <div className="editor-page-wrapper">
        <div className='editor-page-wrapper__content'>
            {mainOptions.map(el => {
                    return <NavLink to={el.path} key={el.id}><Button variant='contained'>{el.name}</Button></NavLink>
            })}
        </div>
    </div>
}


const mainOptions = [
    {
        id:1,
        name: "Редактировать Категории",
        path: "/editor/categories"
    },
    {
        id:2,
        name: "Редактировать Теги",
        path: "/editor/tags"
    },
    {
        id:3,
        name: "Редактировать Каталог",
        path: "/editor/catalog"
    },

]
