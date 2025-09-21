import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { EditorHeader } from "../../components/editor-header/EditorHeader";
import { EditorForm, type Edit } from "../../components/editor-form/EditorForm";
import "./editorPage.css"
import { Modal } from "@mui/material";
import { EventEmitter } from "../../components/lib/EventEmitter";


type Events = "OnRowDbClick" | "OnCreate" | "OnDelete" | "OnChange" | "OnRefresh"

export const EditorEmitter = new EventEmitter<Events>()

export function EditorPage(){
    const [selected, setSelected] = useState<Record<string, any> | null>(null)
    const [refresh, setRefresh] = useState(1)
    const [formType, setFormType] = useState<"create" | "update" | null>(null)

    EditorEmitter.useEvent("OnRowDbClick", onChange)
    EditorEmitter.useEvent("OnCreate", onCreate)
    EditorEmitter.useEvent("OnDelete", () => console.log("DELETING"))
    EditorEmitter.useEvent("OnChange", onChange)
    EditorEmitter.useEvent("OnRefresh", refreshList)



    function onCreate () {
        setFormType("create")
    }

    function onChange () {
        setFormType("update")
    }

    function onCloseModal () {
        setFormType(null)
    }

    function refreshList () {
        setRefresh(prev => prev +1)
        setSelected(null)
    }

    return (
        <EditorContext.Provider value={{selected, formType, refresh,onCloseModal, setSelected, refreshList, onCreate, onChange}}>
            <div className="EditorPage">
                <EditorHeader isRowSelected={Boolean(selected)}/>
                <Outlet/>
             </div>
        </EditorContext.Provider>
    )
    
}


export function FormModal(props:Edit){
    const contextData = useEditorContext()


    if(!contextData) return;

    return <Modal onClose={contextData.onCloseModal} open={Boolean(contextData.formType)}>
        <div className="form-modal">
            <EditorForm {...props} type={contextData.formType} selected={contextData.selected} onCancel={contextData.onCloseModal}/>
        </div>

    </Modal>
}





interface EditorContext {
    formType: "create" | "update" | null;
    onCloseModal:()=> void, selected: Record<string, any> | null;
    refresh: number;
    onCreate:() => void;
    onChange:() => void;
    refreshList: () => void;
    setSelected:React.Dispatch<React.SetStateAction<any>>
}



const EditorContext = createContext<EditorContext | null>(null)



export const useEditorContext = () => useContext(EditorContext)