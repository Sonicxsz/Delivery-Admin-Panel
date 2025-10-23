import {  useState } from "react";
import { Outlet } from "react-router-dom";
import { EditorHeader } from "../../components/editor-header/EditorHeader";
import { EventEmitter } from "../../components/lib/EventEmitter";
import { CategoryService } from "../../services/CategoryService";
import { CatalogService } from "../../services/CatalogService";
import { EditorContext } from "./useEditorContext";

import "./editorPage.css"


type Events = "OnRowDbClick" | "OnCreate" | "OnDelete" | "OnChange" | "OnRefresh"

export const EditorEmitter = new EventEmitter<Events>()


const categoryService = CategoryService.getInstance()
const catalogService = CatalogService.getInstance()

export function EditorPage(){
    const [selected, setSelected] = useState<Record<string, any> | null>(null)
    const [refresh, setRefresh] = useState(1)
    const [formType, setFormType] = useState<"create" | "update" | null>(null)

    EditorEmitter.useEvent("OnRowDbClick", onChange)
    EditorEmitter.useEvent("OnChange", onChange)
    EditorEmitter.useEvent("OnCreate", onCreate)
    EditorEmitter.useEvent("OnRefresh", refreshList)


    EditorEmitter.useEvent("OnDelete", onDelete)


   
   async function onDelete(selected:Record<string, any>){
        if(selected.editorName === "EditCatalog")  {
            await catalogService.deleteCatalogItem(selected.id)
        }
        if(selected.editorName === "EditCategory")   {
            await categoryService.deleteCategory(selected.id)
        }
        
       refreshList()
    }



    function onCloseModal () {
        setFormType(null)
    }

    function refreshList () {
        setRefresh(prev => prev +1)
        setSelected(null)
    }

    function onCreate () {
        setFormType("create")
    }

    function onChange () {
        setFormType("update")
    }

    return (
        <EditorContext.Provider value={{selected, formType, refresh,onCloseModal, setSelected, refreshList, onCreate, onChange}}>
            <div className="EditorPage">
                <EditorHeader selected={selected}/>
                <Outlet/>
             </div>
        </EditorContext.Provider>
    )
    
}








