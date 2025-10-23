import { createContext, useContext } from "react";

interface EditorContext {
    formType: "create" | "update" | null;
    onCloseModal:()=> void, selected: Record<string, any> | null;
    refresh: number;
    onCreate:() => void;
    onChange:() => void;
    refreshList: () => void;
    setSelected:React.Dispatch<React.SetStateAction<any>>
}

export const EditorContext = createContext<EditorContext | null>(null)
export const useEditorContext = () => useContext(EditorContext)